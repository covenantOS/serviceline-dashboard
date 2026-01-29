/**
 * ServiceLine API Client
 * Handles all API communication with proper error handling, retries, and type safety
 */

import { APIResponse } from '@/types/serviceline';

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVICELINE_API_URL || 'https://api.serviceline.com/v1';
const API_KEY = process.env.NEXT_PUBLIC_SERVICELINE_API_KEY || '';

// API Configuration
const API_CONFIG = {
  timeout: 30000, // 30 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
};

/**
 * Custom API Error class
 */
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generic API request handler with retry logic
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<APIResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    'X-Client-Version': '1.0.0',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    signal: AbortSignal.timeout(API_CONFIG.timeout),
  };

  try {
    const response = await fetch(url, config);
    
    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Retry on server errors (500-599) or rate limiting (429)
      if ((response.status >= 500 || response.status === 429) && retryCount < API_CONFIG.retries) {
        await sleep(API_CONFIG.retryDelay * (retryCount + 1));
        return apiRequest<T>(endpoint, options, retryCount + 1);
      }
      
      throw new APIError(
        errorData.message || 'Request failed',
        response.status,
        errorData.code,
        errorData.details
      );
    }

    const data: APIResponse<T> = await response.json();
    return data;
    
  } catch (error) {
    // Network errors or timeout
    if (error instanceof APIError) {
      throw error;
    }
    
    // Retry on network errors
    if (retryCount < API_CONFIG.retries) {
      await sleep(API_CONFIG.retryDelay * (retryCount + 1));
      return apiRequest<T>(endpoint, options, retryCount + 1);
    }
    
    throw new APIError(
      error instanceof Error ? error.message : 'Network error',
      undefined,
      'NETWORK_ERROR'
    );
  }
}

/**
 * GET request
 */
export async function get<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  const queryString = params 
    ? '?' + new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>)
      ).toString()
    : '';
  
  const response = await apiRequest<T>(`${endpoint}${queryString}`, {
    method: 'GET',
  });
  
  if (!response.success || !response.data) {
    throw new APIError(
      response.error?.message || 'Request failed',
      undefined,
      response.error?.code
    );
  }
  
  return response.data;
}

/**
 * POST request
 */
export async function post<T>(
  endpoint: string,
  data?: any
): Promise<T> {
  const response = await apiRequest<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
  
  if (!response.success || !response.data) {
    throw new APIError(
      response.error?.message || 'Request failed',
      undefined,
      response.error?.code
    );
  }
  
  return response.data;
}

/**
 * PUT request
 */
export async function put<T>(
  endpoint: string,
  data?: any
): Promise<T> {
  const response = await apiRequest<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
  
  if (!response.success || !response.data) {
    throw new APIError(
      response.error?.message || 'Request failed',
      undefined,
      response.error?.code
    );
  }
  
  return response.data;
}

/**
 * PATCH request
 */
export async function patch<T>(
  endpoint: string,
  data?: any
): Promise<T> {
  const response = await apiRequest<T>(endpoint, {
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
  
  if (!response.success || !response.data) {
    throw new APIError(
      response.error?.message || 'Request failed',
      undefined,
      response.error?.code
    );
  }
  
  return response.data;
}

/**
 * DELETE request
 */
export async function del<T>(endpoint: string): Promise<T> {
  const response = await apiRequest<T>(endpoint, {
    method: 'DELETE',
  });
  
  if (!response.success) {
    throw new APIError(
      response.error?.message || 'Request failed',
      undefined,
      response.error?.code
    );
  }
  
  return response.data as T;
}

/**
 * Upload file
 */
export async function upload<T>(
  endpoint: string,
  file: File,
  additionalData?: Record<string, any>
): Promise<T> {
  const formData = new FormData();
  formData.append('file', file);
  
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
  }
  
  const response = await apiRequest<T>(endpoint, {
    method: 'POST',
    body: formData,
    headers: {
      // Don't set Content-Type, let browser set it with boundary
      'Authorization': `Bearer ${API_KEY}`,
    },
  });
  
  if (!response.success || !response.data) {
    throw new APIError(
      response.error?.message || 'Upload failed',
      undefined,
      response.error?.code
    );
  }
  
  return response.data;
}

/**
 * Health check
 */
export async function healthCheck(): Promise<boolean> {
  try {
    await get('/health');
    return true;
  } catch {
    return false;
  }
}

/**
 * Get API connection status
 */
export async function getConnectionStatus() {
  try {
    const isHealthy = await healthCheck();
    return {
      connected: isHealthy,
      apiUrl: API_BASE_URL,
      hasApiKey: !!API_KEY,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      connected: false,
      apiUrl: API_BASE_URL,
      hasApiKey: !!API_KEY,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Export API client methods
export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
  upload,
  healthCheck,
  getConnectionStatus,
};

export default api;
