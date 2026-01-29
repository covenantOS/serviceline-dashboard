/**
 * ServiceLine Dashboard TypeScript Interfaces
 * Defines all data structures for leads, campaigns, and analytics
 */

// ==================== Lead Interfaces ====================

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

export interface LeadScoreBreakdown {
  engagement: number;      // 0-100: Email opens, clicks, responses
  demographic: number;     // 0-100: Company size, industry fit, location
  behavioral: number;      // 0-100: Website visits, content downloads
  fit: number;            // 0-100: Overall fit score
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle?: string;
  industry: string;
  location: string;
  country: string;
  companySize?: string;
  revenue?: string;
  score: number;           // Composite score 0-100
  scoreBreakdown: LeadScoreBreakdown;
  status: LeadStatus;
  source: string;          // Where the lead came from
  tags: string[];
  notes?: string;
  dateAdded: Date;
  lastContact?: Date;
  lastActivity?: Date;
  assignedTo?: string;
  customFields?: Record<string, any>;
}

export interface LeadFilters {
  status?: LeadStatus[];
  industries?: string[];
  locations?: string[];
  countries?: string[];
  scoreRange?: [number, number];
  dateRange?: {
    start: Date;
    end: Date;
  };
  sources?: string[];
  tags?: string[];
  assignedTo?: string[];
  searchQuery?: string;
}

export interface LeadSortOptions {
  field: keyof Lead;
  direction: 'asc' | 'desc';
}

// ==================== Campaign Interfaces ====================

export type CampaignStatus = 'draft' | 'scheduled' | 'active' | 'paused' | 'completed' | 'archived';

export interface CampaignTargeting {
  industries: string[];
  locations: string[];
  countries: string[];
  scoreRange: [number, number];
  companySizes?: string[];
  statuses?: LeadStatus[];
  tags?: string[];
  excludeContacted?: boolean;
  customCriteria?: Record<string, any>;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;              // HTML content
  preview: string;           // Plain text preview
  variables: string[];       // {{variable}} placeholders
  category: 'outreach' | 'follow-up' | 'nurture' | 'promotional';
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
}

export interface CampaignPerformance {
  sent: number;
  delivered: number;
  bounced: number;
  opened: number;
  clicked: number;
  replied: number;
  converted: number;
  unsubscribed: number;
  openRate: number;         // Percentage
  clickRate: number;        // Percentage
  conversionRate: number;   // Percentage
  replyRate: number;        // Percentage
}

export interface CampaignSchedule {
  type: 'immediate' | 'scheduled' | 'recurring';
  startDate?: Date;
  endDate?: Date;
  frequency?: 'daily' | 'weekly' | 'monthly';
  time?: string;            // HH:MM format
  timezone?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  targeting: CampaignTargeting;
  emailTemplateId: string;
  emailTemplate?: EmailTemplate;
  schedule: CampaignSchedule;
  performance: CampaignPerformance;
  targetCount: number;      // Number of leads targeted
  sentCount: number;        // Number of emails sent
  budget?: number;
  owner: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  launchDate?: Date;
  completedDate?: Date;
}

// ==================== Analytics Interfaces ====================

export interface DashboardMetrics {
  totalLeads: number;
  newLeadsThisMonth: number;
  leadsGrowthRate: number;     // Percentage change
  averageScore: number;
  conversionRate: number;
  totalCampaigns: number;
  activeCampaigns: number;
  totalRevenue?: number;
  averageDealSize?: number;
}

export interface IndustryDistribution {
  industry: string;
  count: number;
  percentage: number;
  averageScore: number;
}

export interface ScoreDistribution {
  range: string;              // e.g., "0-20", "21-40"
  count: number;
  percentage: number;
}

export interface TrendData {
  date: string;
  leads: number;
  conversions: number;
  score: number;
}

export interface PerformanceTrend {
  period: 'daily' | 'weekly' | 'monthly';
  data: TrendData[];
}

export interface TopPerformer {
  name: string;
  metric: 'conversions' | 'revenue' | 'leads';
  value: number;
  change: number;           // Percentage change
}

// ==================== Settings Interfaces ====================

export interface APIConfiguration {
  baseUrl: string;
  apiKey: string;
  timeout: number;
  rateLimitPerMinute: number;
  webhookUrl?: string;
  isActive: boolean;
}

export interface ScraperSettings {
  enabled: boolean;
  frequency: 'hourly' | 'daily' | 'weekly';
  sources: DataSource[];
  filters: {
    industries?: string[];
    locations?: string[];
    minimumScore?: number;
    keywords?: string[];
  };
  maxLeadsPerRun: number;
  deduplication: boolean;
  autoEnrich: boolean;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'linkedin' | 'company-website' | 'directory' | 'api' | 'manual';
  enabled: boolean;
  credentials?: Record<string, string>;
  lastRun?: Date;
  totalLeadsCollected: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
  emailNotifications: boolean;
  dashboardLayout: 'default' | 'compact' | 'detailed';
  defaultFilters?: LeadFilters;
}

// ==================== API Response Interfaces ====================

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
    hasMore?: boolean;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ==================== Action Interfaces ====================

export interface BulkAction {
  action: 'add-to-campaign' | 'update-status' | 'assign' | 'tag' | 'delete' | 'export';
  leadIds: string[];
  params?: Record<string, any>;
}

export interface LeadAction {
  type: 'email-sent' | 'email-opened' | 'email-clicked' | 'call-made' | 'meeting-scheduled' | 'note-added' | 'status-changed';
  leadId: string;
  userId: string;
  timestamp: Date;
  details?: Record<string, any>;
}

export interface CampaignAction {
  type: 'created' | 'launched' | 'paused' | 'resumed' | 'completed' | 'archived';
  campaignId: string;
  userId: string;
  timestamp: Date;
  details?: Record<string, any>;
}

// ==================== Notification Interfaces ====================

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// ==================== Export Interfaces ====================

export interface ExportOptions {
  format: 'csv' | 'xlsx' | 'json';
  fields: (keyof Lead)[];
  filters?: LeadFilters;
  includeScoreBreakdown: boolean;
}

// ==================== Form Validation ====================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

// ==================== Webhook Interfaces ====================

export interface WebhookEvent {
  id: string;
  type: 'lead.created' | 'lead.updated' | 'campaign.launched' | 'campaign.completed';
  timestamp: Date;
  data: Lead | Campaign;
}

// ==================== Constants ====================

export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Real Estate',
  'Education',
  'Hospitality',
  'Transportation',
  'Energy',
  'Telecommunications',
  'Media & Entertainment',
  'Professional Services',
  'Non-Profit',
  'Government',
  'Other'
] as const;

export const COMPANY_SIZES = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1001-5000',
  '5000+'
] as const;

export const LEAD_SOURCES = [
  'Website',
  'LinkedIn',
  'Cold Outreach',
  'Referral',
  'Event',
  'Advertisement',
  'Content Download',
  'Webinar',
  'Partner',
  'Import',
  'Other'
] as const;

export type Industry = typeof INDUSTRIES[number];
export type CompanySize = typeof COMPANY_SIZES[number];
export type LeadSource = typeof LEAD_SOURCES[number];
