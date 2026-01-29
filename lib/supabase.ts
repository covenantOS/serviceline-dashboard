import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Lead = {
  id: string
  created_at: string
  updated_at: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  company: string | null
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'
  source: string
  campaign_id: string | null
  value: number | null
  notes: string | null
}

export type Campaign = {
  id: string
  created_at: string
  updated_at: string
  name: string
  description: string | null
  status: 'active' | 'paused' | 'completed'
  budget: number | null
  start_date: string | null
  end_date: string | null
  leads_count: number
}

export type LeadActivity = {
  id: string
  created_at: string
  lead_id: string
  activity_type: 'email' | 'call' | 'meeting' | 'note' | 'status_change'
  description: string
  user_name: string | null
}
