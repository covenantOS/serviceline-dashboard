'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Lead } from '@/lib/supabase'
import { createLead, updateLead } from '@/lib/api'

interface LeadFormProps {
  lead?: Lead
  onSuccess?: () => void
}

export function LeadForm({ lead, onSuccess }: LeadFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: lead?.first_name || '',
    last_name: lead?.last_name || '',
    email: lead?.email || '',
    phone: lead?.phone || '',
    company: lead?.company || '',
    status: lead?.status || 'new',
    source: lead?.source || '',
    value: lead?.value?.toString() || '',
    notes: lead?.notes || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        ...formData,
        value: formData.value ? parseFloat(formData.value) : null,
        campaign_id: null,
      }

      if (lead) {
        await updateLead(lead.id, data)
      } else {
        await createLead(data as any)
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/leads')
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving lead:', error)
      alert('Failed to save lead')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name *</Label>
          <Input
            id="first_name"
            required
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name *</Label>
          <Input
            id="last_name"
            required
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value as Lead['status'] })
            }
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="won">Won</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="source">Source *</Label>
          <Input
            id="source"
            required
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            placeholder="e.g., Website, Referral"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="value">Value ($)</Label>
          <Input
            id="value"
            type="number"
            step="0.01"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : lead ? 'Update Lead' : 'Create Lead'}
        </Button>
      </div>
    </form>
  )
}
