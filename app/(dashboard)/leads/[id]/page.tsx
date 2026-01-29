import { getLead, getLeadActivities } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ActivityTimeline } from '@/components/leads/activity-timeline'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Edit, Mail, Phone, Building } from 'lucide-react'

export const revalidate = 0

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-purple-100 text-purple-800',
  proposal: 'bg-orange-100 text-orange-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
}

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const lead = await getLead(params.id)
  const activities = await getLeadActivities(params.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {lead.first_name} {lead.last_name}
          </h1>
          <p className="text-muted-foreground">{lead.email}</p>
        </div>
        <Link href={`/leads/${lead.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Lead
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Source</p>
                <p className="font-medium">{lead.source}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-2 font-medium text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {lead.email}
                </a>
              </div>
              {lead.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-2 font-medium text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {lead.phone}
                  </a>
                </div>
              )}
              {lead.company && (
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="flex items-center gap-2 font-medium">
                    <Building className="h-4 w-4" />
                    {lead.company}
                  </p>
                </div>
              )}
              {lead.value && (
                <div>
                  <p className="text-sm text-muted-foreground">Value</p>
                  <p className="font-medium">{formatCurrency(lead.value)}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">{formatDate(lead.created_at)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">{formatDate(lead.updated_at)}</p>
              </div>
            </div>
            {lead.notes && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Notes</p>
                <p className="text-sm whitespace-pre-wrap">{lead.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <ActivityTimeline activities={activities} />
      </div>
    </div>
  )
}
