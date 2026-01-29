export type CampaignStatus = "draft" | "active" | "paused" | "completed"
export type CampaignChannel = "email" | "social" | "ppc" | "display" | "seo" | "content"

export interface Campaign {
  id: string
  name: string
  description?: string
  status: CampaignStatus
  channels: CampaignChannel[]
  budget: number
  spent: number
  startDate: string
  endDate?: string
  leads: number
  conversions: number
  roi: number
  cpl: number // Cost per lead
  conversionRate: number
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface CampaignMetrics {
  impressions: number
  clicks: number
  ctr: number // Click-through rate
  leads: number
  conversions: number
  conversionRate: number
  spend: number
  cpl: number
  cpc: number // Cost per click
  roi: number
}
