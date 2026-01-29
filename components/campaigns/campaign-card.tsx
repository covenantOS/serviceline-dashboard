"use client"

import { Campaign } from "@/types/campaign"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, TrendingUp, Users, DollarSign } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface CampaignCardProps {
  campaign: Campaign
}

const statusColors = {
  draft: "bg-gray-500",
  active: "bg-green-500",
  paused: "bg-yellow-500",
  completed: "bg-blue-500",
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const budgetUsed = (campaign.spent / campaign.budget) * 100

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>{campaign.name}</CardTitle>
            <CardDescription>{campaign.description}</CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge className={statusColors[campaign.status]}>
            {campaign.status}
          </Badge>
          {campaign.channels.map((channel) => (
            <Badge key={channel} variant="outline">
              {channel}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              Leads
            </div>
            <div className="text-2xl font-bold">{campaign.leads}</div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              Conv. Rate
            </div>
            <div className="text-2xl font-bold">{campaign.conversionRate}%</div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              ROI
            </div>
            <div className="text-2xl font-bold">{campaign.roi}%</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Budget</span>
            <span className="font-medium">
              ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
            </span>
          </div>
          <Progress value={budgetUsed} />
        </div>
      </CardContent>
    </Card>
  )
}
