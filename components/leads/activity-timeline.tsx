'use client'

import { LeadActivity } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/lib/utils'
import { Mail, Phone, Calendar, FileText, ArrowRight } from 'lucide-react'

interface ActivityTimelineProps {
  activities: LeadActivity[]
}

const activityIcons = {
  email: Mail,
  call: Phone,
  meeting: Calendar,
  note: FileText,
  status_change: ArrowRight,
}

const activityColors = {
  email: 'bg-blue-100 text-blue-800',
  call: 'bg-green-100 text-green-800',
  meeting: 'bg-purple-100 text-purple-800',
  note: 'bg-yellow-100 text-yellow-800',
  status_change: 'bg-orange-100 text-orange-800',
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No activities yet</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.activity_type]
              return (
                <div key={activity.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="h-full w-px bg-border" />
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={activityColors[activity.activity_type]}>
                        {activity.activity_type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDateTime(activity.created_at)}
                      </span>
                    </div>
                    <p className="text-sm">{activity.description}</p>
                    {activity.user_name && (
                      <p className="text-xs text-muted-foreground mt-1">
                        by {activity.user_name}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
