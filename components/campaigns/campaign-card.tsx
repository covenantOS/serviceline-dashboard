import Link from 'next/link'
import { Campaign } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Eye, Users } from 'lucide-react'

interface CampaignCardProps {
  campaign: Campaign
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-gray-100 text-gray-800',
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{campaign.name}</CardTitle>
            <CardDescription>
              {campaign.description || 'No description'}
            </CardDescription>
          </div>
          <Badge className={statusColors[campaign.status]}>
            {campaign.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Budget</p>
              <p className="font-medium">
                {campaign.budget ? formatCurrency(campaign.budget) : '-'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Leads</p>
              <p className="font-medium flex items-center gap-1">
                <Users className="h-4 w-4" />
                {campaign.leads_count}
              </p>
            </div>
            {campaign.start_date && (
              <div>
                <p className="text-muted-foreground">Start Date</p>
                <p className="font-medium">{formatDate(campaign.start_date)}</p>
              </div>
            )}
            {campaign.end_date && (
              <div>
                <p className="text-muted-foreground">End Date</p>
                <p className="font-medium">{formatDate(campaign.end_date)}</p>
              </div>
            )}
          </div>
          <Link href={`/campaigns/${campaign.id}`}>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
