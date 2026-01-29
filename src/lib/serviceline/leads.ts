/**
 * Lead Management Functions
 * All lead-related API calls and utility functions
 */

import { Lead, LeadFilters, PaginatedResponse, BulkAction, ExportOptions } from '@/types/serviceline';
import api from './api';

/**
 * Fetch leads with pagination and filtering
 */
export async function getLeads(
  page: number = 1,
  pageSize: number = 20,
  filters?: LeadFilters,
  sortBy?: string,
  sortOrder?: 'asc' | 'desc'
): Promise<PaginatedResponse<Lead>> {
  const params: Record<string, any> = {
    page,
    pageSize,
    sortBy,
    sortOrder,
  };

  // Add filters to params
  if (filters) {
    if (filters.status) params.status = filters.status.join(',');
    if (filters.industries) params.industries = filters.industries.join(',');
    if (filters.locations) params.locations = filters.locations.join(',');
    if (filters.scoreRange) {
      params.minScore = filters.scoreRange[0];
      params.maxScore = filters.scoreRange[1];
    }
    if (filters.dateRange) {
      params.startDate = filters.dateRange.start.toISOString();
      params.endDate = filters.dateRange.end.toISOString();
    }
    if (filters.sources) params.sources = filters.sources.join(',');
    if (filters.tags) params.tags = filters.tags.join(',');
    if (filters.searchQuery) params.q = filters.searchQuery;
  }

  return api.get<PaginatedResponse<Lead>>('/leads', params);
}

/**
 * Get a single lead by ID
 */
export async function getLead(id: string): Promise<Lead> {
  return api.get<Lead>(`/leads/${id}`);
}

/**
 * Create a new lead
 */
export async function createLead(leadData: Partial<Lead>): Promise<Lead> {
  return api.post<Lead>('/leads', leadData);
}

/**
 * Update an existing lead
 */
export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
  return api.patch<Lead>(`/leads/${id}`, updates);
}

/**
 * Delete a lead
 */
export async function deleteLead(id: string): Promise<void> {
  return api.delete<void>(`/leads/${id}`);
}

/**
 * Bulk delete leads
 */
export async function deleteLeads(ids: string[]): Promise<{ deleted: number }> {
  return api.post<{ deleted: number }>('/leads/bulk-delete', { ids });
}

/**
 * Perform bulk action on leads
 */
export async function bulkAction(action: BulkAction): Promise<{ affected: number }> {
  return api.post<{ affected: number }>('/leads/bulk-action', action);
}

/**
 * Calculate lead score (if not done server-side)
 */
export function calculateLeadScore(lead: Partial<Lead>): number {
  const weights = {
    engagement: 0.35,
    demographic: 0.25,
    behavioral: 0.25,
    fit: 0.15,
  };

  if (!lead.scoreBreakdown) return 0;

  const score =
    (lead.scoreBreakdown.engagement || 0) * weights.engagement +
    (lead.scoreBreakdown.demographic || 0) * weights.demographic +
    (lead.scoreBreakdown.behavioral || 0) * weights.behavioral +
    (lead.scoreBreakdown.fit || 0) * weights.fit;

  return Math.round(score);
}

/**
 * Get lead statistics
 */
export async function getLeadStats(): Promise<{
  total: number;
  byStatus: Record<string, number>;
  byIndustry: Record<string, number>;
  averageScore: number;
  newThisMonth: number;
  conversionRate: number;
}> {
  return api.get('/leads/stats');
}

/**
 * Search leads
 */
export async function searchLeads(query: string, limit: number = 10): Promise<Lead[]> {
  const response = await api.get<PaginatedResponse<Lead>>('/leads/search', {
    q: query,
    limit,
  });
  return response.items;
}

/**
 * Get recent leads
 */
export async function getRecentLeads(limit: number = 10): Promise<Lead[]> {
  const response = await api.get<PaginatedResponse<Lead>>('/leads', {
    page: 1,
    pageSize: limit,
    sortBy: 'dateAdded',
    sortOrder: 'desc',
  });
  return response.items;
}

/**
 * Get high-score leads
 */
export async function getHighScoreLeads(
  minScore: number = 80,
  limit: number = 20
): Promise<Lead[]> {
  const response = await api.get<PaginatedResponse<Lead>>('/leads', {
    page: 1,
    pageSize: limit,
    minScore,
    sortBy: 'score',
    sortOrder: 'desc',
  });
  return response.items;
}

/**
 * Import leads from file
 */
export async function importLeads(file: File): Promise<{
  imported: number;
  failed: number;
  errors?: Array<{ row: number; message: string }>;
}> {
  return api.upload('/leads/import', file);
}

/**
 * Export leads to file
 */
export async function exportLeads(options: ExportOptions): Promise<Blob> {
  const params: Record<string, any> = {
    format: options.format,
    fields: options.fields.join(','),
    includeScoreBreakdown: options.includeScoreBreakdown,
  };

  // Add filters
  if (options.filters) {
    if (options.filters.status) params.status = options.filters.status.join(',');
    if (options.filters.industries) params.industries = options.filters.industries.join(',');
    if (options.filters.scoreRange) {
      params.minScore = options.filters.scoreRange[0];
      params.maxScore = options.filters.scoreRange[1];
    }
  }

  const queryString = new URLSearchParams(params).toString();
  const url = `${process.env.NEXT_PUBLIC_SERVICELINE_API_URL}/leads/export?${queryString}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SERVICELINE_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Export failed');
  }

  return response.blob();
}

/**
 * Enrich lead data (get additional information)
 */
export async function enrichLead(id: string): Promise<Lead> {
  return api.post<Lead>(`/leads/${id}/enrich`);
}

/**
 * Add tags to lead
 */
export async function addLeadTags(id: string, tags: string[]): Promise<Lead> {
  return api.post<Lead>(`/leads/${id}/tags`, { tags });
}

/**
 * Remove tags from lead
 */
export async function removeLeadTags(id: string, tags: string[]): Promise<Lead> {
  return api.delete<Lead>(`/leads/${id}/tags`, { tags });
}

/**
 * Add note to lead
 */
export async function addLeadNote(
  id: string,
  note: string,
  userId: string
): Promise<{ success: boolean }> {
  return api.post(`/leads/${id}/notes`, { note, userId });
}

/**
 * Get lead activity history
 */
export async function getLeadActivity(id: string): Promise<Array<{
  type: string;
  description: string;
  timestamp: Date;
  userId?: string;
}>> {
  return api.get(`/leads/${id}/activity`);
}

/**
 * Assign lead to user
 */
export async function assignLead(leadId: string, userId: string): Promise<Lead> {
  return api.patch<Lead>(`/leads/${leadId}`, { assignedTo: userId });
}

/**
 * Unassign lead
 */
export async function unassignLead(leadId: string): Promise<Lead> {
  return api.patch<Lead>(`/leads/${leadId}`, { assignedTo: null });
}

/**
 * Validate lead data
 */
export function validateLeadData(lead: Partial<Lead>): {
  valid: boolean;
  errors: Array<{ field: string; message: string }>;
} {
  const errors: Array<{ field: string; message: string }> = [];

  // Required fields
  if (!lead.name?.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  if (!lead.email?.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }
  if (!lead.company?.trim()) {
    errors.push({ field: 'company', message: 'Company is required' });
  }
  if (!lead.industry) {
    errors.push({ field: 'industry', message: 'Industry is required' });
  }

  // Optional validations
  if (lead.phone && !/^[\d\s\-\+\(\)]+$/.test(lead.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone format' });
  }
  if (lead.score !== undefined && (lead.score < 0 || lead.score > 100)) {
    errors.push({ field: 'score', message: 'Score must be between 0 and 100' });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Format lead for display
 */
export function formatLead(lead: Lead) {
  return {
    ...lead,
    displayName: `${lead.name} (${lead.company})`,
    scoreLabel: getScoreLabel(lead.score),
    statusLabel: formatStatus(lead.status),
    formattedDate: new Date(lead.dateAdded).toLocaleDateString(),
  };
}

/**
 * Get score label/category
 */
export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Hot';
  if (score >= 60) return 'Warm';
  if (score >= 40) return 'Cool';
  return 'Cold';
}

/**
 * Get score color for UI
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-red-600';
  if (score >= 60) return 'text-orange-500';
  if (score >= 40) return 'text-yellow-500';
  return 'text-blue-500';
}

/**
 * Format status for display
 */
function formatStatus(status: string): string {
  return status
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
