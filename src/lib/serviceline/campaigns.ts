/**
 * Campaign Management Functions
 * All campaign-related API calls and email template management
 */

import { Campaign, EmailTemplate, PaginatedResponse } from '@/types/serviceline';
import api from './api';

/**
 * Fetch campaigns with pagination
 */
export async function getCampaigns(
  page: number = 1,
  pageSize: number = 20,
  status?: string[]
): Promise<PaginatedResponse<Campaign>> {
  const params: Record<string, any> = {
    page,
    pageSize,
  };

  if (status && status.length > 0) {
    params.status = status.join(',');
  }

  return api.get<PaginatedResponse<Campaign>>('/campaigns', params);
}

/**
 * Get a single campaign by ID
 */
export async function getCampaign(id: string): Promise<Campaign> {
  return api.get<Campaign>(`/campaigns/${id}`);
}

/**
 * Create a new campaign
 */
export async function createCampaign(campaignData: Partial<Campaign>): Promise<Campaign> {
  return api.post<Campaign>('/campaigns', campaignData);
}

/**
 * Update an existing campaign
 */
export async function updateCampaign(
  id: string,
  updates: Partial<Campaign>
): Promise<Campaign> {
  return api.patch<Campaign>(`/campaigns/${id}`, updates);
}

/**
 * Delete a campaign
 */
export async function deleteCampaign(id: string): Promise<void> {
  return api.delete<void>(`/campaigns/${id}`);
}

/**
 * Launch a campaign
 */
export async function launchCampaign(id: string): Promise<Campaign> {
  return api.post<Campaign>(`/campaigns/${id}/launch`);
}

/**
 * Pause a campaign
 */
export async function pauseCampaign(id: string): Promise<Campaign> {
  return api.post<Campaign>(`/campaigns/${id}/pause`);
}

/**
 * Resume a paused campaign
 */
export async function resumeCampaign(id: string): Promise<Campaign> {
  return api.post<Campaign>(`/campaigns/${id}/resume`);
}

/**
 * Complete a campaign
 */
export async function completeCampaign(id: string): Promise<Campaign> {
  return api.post<Campaign>(`/campaigns/${id}/complete`);
}

/**
 * Get campaign performance metrics
 */
export async function getCampaignPerformance(id: string) {
  return api.get(`/campaigns/${id}/performance`);
}

/**
 * Get campaign analytics over time
 */
export async function getCampaignAnalytics(
  id: string,
  period: 'daily' | 'weekly' | 'monthly' = 'daily'
) {
  return api.get(`/campaigns/${id}/analytics`, { period });
}

/**
 * Get active campaigns count
 */
export async function getActiveCampaignsCount(): Promise<number> {
  const response = await api.get<{ count: number }>('/campaigns/active/count');
  return response.count;
}

/**
 * Duplicate a campaign
 */
export async function duplicateCampaign(id: string, newName: string): Promise<Campaign> {
  return api.post<Campaign>(`/campaigns/${id}/duplicate`, { name: newName });
}

/**
 * Get campaign target count (before launching)
 */
export async function getCampaignTargetCount(targeting: Campaign['targeting']): Promise<number> {
  const response = await api.post<{ count: number }>('/campaigns/target-count', targeting);
  return response.count;
}

// ==================== Email Templates ====================

/**
 * Fetch email templates
 */
export async function getEmailTemplates(
  category?: EmailTemplate['category']
): Promise<EmailTemplate[]> {
  const params = category ? { category } : {};
  return api.get<EmailTemplate[]>('/email-templates', params);
}

/**
 * Get a single email template
 */
export async function getEmailTemplate(id: string): Promise<EmailTemplate> {
  return api.get<EmailTemplate>(`/email-templates/${id}`);
}

/**
 * Create a new email template
 */
export async function createEmailTemplate(
  templateData: Partial<EmailTemplate>
): Promise<EmailTemplate> {
  return api.post<EmailTemplate>('/email-templates', templateData);
}

/**
 * Update an email template
 */
export async function updateEmailTemplate(
  id: string,
  updates: Partial<EmailTemplate>
): Promise<EmailTemplate> {
  return api.patch<EmailTemplate>(`/email-templates/${id}`, updates);
}

/**
 * Delete an email template
 */
export async function deleteEmailTemplate(id: string): Promise<void> {
  return api.delete<void>(`/email-templates/${id}`);
}

/**
 * Preview email template with sample data
 */
export async function previewEmailTemplate(
  templateId: string,
  sampleData: Record<string, any>
): Promise<{ subject: string; body: string }> {
  return api.post(`/email-templates/${templateId}/preview`, sampleData);
}

/**
 * Extract variables from email template
 */
export function extractTemplateVariables(content: string): string[] {
  const regex = /\{\{(\w+)\}\}/g;
  const variables = new Set<string>();
  let match;

  while ((match = regex.exec(content)) !== null) {
    variables.add(match[1]);
  }

  return Array.from(variables);
}

/**
 * Render email template with data
 */
export function renderTemplate(template: string, data: Record<string, any>): string {
  let rendered = template;

  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    rendered = rendered.replace(regex, String(value));
  });

  return rendered;
}

/**
 * Validate email template
 */
export function validateEmailTemplate(template: Partial<EmailTemplate>): {
  valid: boolean;
  errors: Array<{ field: string; message: string }>;
} {
  const errors: Array<{ field: string; message: string }> = [];

  if (!template.name?.trim()) {
    errors.push({ field: 'name', message: 'Template name is required' });
  }
  if (!template.subject?.trim()) {
    errors.push({ field: 'subject', message: 'Subject is required' });
  }
  if (!template.body?.trim()) {
    errors.push({ field: 'body', message: 'Email body is required' });
  }
  if (!template.category) {
    errors.push({ field: 'category', message: 'Category is required' });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate campaign data
 */
export function validateCampaign(campaign: Partial<Campaign>): {
  valid: boolean;
  errors: Array<{ field: string; message: string }>;
} {
  const errors: Array<{ field: string; message: string }> = [];

  if (!campaign.name?.trim()) {
    errors.push({ field: 'name', message: 'Campaign name is required' });
  }
  if (!campaign.emailTemplateId) {
    errors.push({ field: 'emailTemplateId', message: 'Email template is required' });
  }
  if (!campaign.targeting) {
    errors.push({ field: 'targeting', message: 'Campaign targeting is required' });
  } else {
    if (
      !campaign.targeting.industries?.length &&
      !campaign.targeting.locations?.length &&
      !campaign.targeting.scoreRange
    ) {
      errors.push({
        field: 'targeting',
        message: 'At least one targeting criterion is required',
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate campaign budget estimate
 */
export function estimateCampaignCost(targetCount: number, costPerLead: number = 0.5): number {
  return targetCount * costPerLead;
}

/**
 * Format campaign performance for display
 */
export function formatCampaignPerformance(campaign: Campaign) {
  const { performance } = campaign;

  return {
    ...performance,
    openRateFormatted: `${performance.openRate.toFixed(1)}%`,
    clickRateFormatted: `${performance.clickRate.toFixed(1)}%`,
    conversionRateFormatted: `${performance.conversionRate.toFixed(1)}%`,
    replyRateFormatted: `${performance.replyRate.toFixed(1)}%`,
  };
}

/**
 * Get campaign status badge color
 */
export function getCampaignStatusColor(status: Campaign['status']): string {
  const colors: Record<Campaign['status'], string> = {
    draft: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-purple-100 text-purple-800',
    archived: 'bg-gray-100 text-gray-500',
  };

  return colors[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Calculate campaign ROI
 */
export function calculateCampaignROI(
  revenue: number,
  cost: number
): {
  roi: number;
  roiPercentage: string;
  profitable: boolean;
} {
  const roi = cost > 0 ? ((revenue - cost) / cost) * 100 : 0;

  return {
    roi,
    roiPercentage: `${roi.toFixed(1)}%`,
    profitable: roi > 0,
  };
}

/**
 * Get campaign timeline events
 */
export async function getCampaignTimeline(campaignId: string) {
  return api.get(`/campaigns/${campaignId}/timeline`);
}

/**
 * Export campaign results
 */
export async function exportCampaignResults(
  campaignId: string,
  format: 'csv' | 'xlsx' | 'pdf'
): Promise<Blob> {
  const url = `${process.env.NEXT_PUBLIC_SERVICELINE_API_URL}/campaigns/${campaignId}/export?format=${format}`;

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
 * Schedule campaign send
 */
export async function scheduleCampaign(
  campaignId: string,
  schedule: Campaign['schedule']
): Promise<Campaign> {
  return api.post<Campaign>(`/campaigns/${campaignId}/schedule`, schedule);
}

/**
 * Test campaign email (send to test addresses)
 */
export async function sendTestEmail(
  campaignId: string,
  testEmails: string[]
): Promise<{ sent: number }> {
  return api.post(`/campaigns/${campaignId}/test`, { emails: testEmails });
}
