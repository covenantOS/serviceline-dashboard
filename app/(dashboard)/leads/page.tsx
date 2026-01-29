import { getLeads } from '@/lib/api'
import { LeadTable } from '@/components/leads/lead-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const revalidate = 0

export default async function LeadsPage() {
  const leads = await getLeads()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Manage your sales leads</p>
        </div>
        <Link href="/leads/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Lead
          </Button>
        </Link>
      </div>

      <LeadTable leads={leads} />
    </div>
  )
}
