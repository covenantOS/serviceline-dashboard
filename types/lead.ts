export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost"
export type LeadSource = "website" | "referral" | "social" | "email" | "phone" | "other"

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  source: LeadSource
  status: LeadStatus
  score: number
  assignedTo?: string
  tags: string[]
  notes?: string
  createdAt: string
  updatedAt: string
  lastContact?: string
  estimatedValue?: number
}

export interface LeadActivity {
  id: string
  leadId: string
  type: "email" | "call" | "meeting" | "note" | "status_change"
  description: string
  performedBy: string
  timestamp: string
}
