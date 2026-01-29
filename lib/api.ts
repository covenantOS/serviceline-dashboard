import { supabase, Lead, Campaign, LeadActivity } from './supabase'

// Lead API functions
export async function getLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Lead[]
}

export async function getLead(id: string) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Lead
}

export async function createLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select()
    .single()

  if (error) throw error
  return data as Lead
}

export async function updateLead(id: string, updates: Partial<Lead>) {
  const { data, error } = await supabase
    .from('leads')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Lead
}

export async function deleteLead(id: string) {
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Campaign API functions
export async function getCampaigns() {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Campaign[]
}

export async function getCampaign(id: string) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Campaign
}

export async function createCampaign(campaign: Omit<Campaign, 'id' | 'created_at' | 'updated_at' | 'leads_count'>) {
  const { data, error } = await supabase
    .from('campaigns')
    .insert([{ ...campaign, leads_count: 0 }])
    .select()
    .single()

  if (error) throw error
  return data as Campaign
}

export async function updateCampaign(id: string, updates: Partial<Campaign>) {
  const { data, error } = await supabase
    .from('campaigns')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Campaign
}

// Lead Activity API functions
export async function getLeadActivities(leadId: string) {
  const { data, error } = await supabase
    .from('lead_activities')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as LeadActivity[]
}

export async function createLeadActivity(activity: Omit<LeadActivity, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('lead_activities')
    .insert([activity])
    .select()
    .single()

  if (error) throw error
  return data as LeadActivity
}

// Dashboard Stats - Now returns full lead data with source field
export async function getDashboardStats() {
  const { data: leads, error: leadsError } = await supabase
    .from('leads')
    .select('*')

  if (leadsError) throw leadsError

  const totalLeads = leads?.length || 0
  const newLeads = leads?.filter(l => l.status === 'new').length || 0
  const qualifiedLeads = leads?.filter(l => l.status === 'qualified').length || 0
  const wonLeads = leads?.filter(l => l.status === 'won').length || 0
  const totalValue = leads?.reduce((sum, l) => sum + (l.value || 0), 0) || 0
  const wonValue = leads?.filter(l => l.status === 'won').reduce((sum, l) => sum + (l.value || 0), 0) || 0
  const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0

  return {
    totalLeads,
    newLeads,
    qualifiedLeads,
    wonLeads,
    totalValue,
    wonValue,
    conversionRate,
    leads: leads || [],
  }
}
