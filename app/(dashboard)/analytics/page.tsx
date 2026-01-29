import { getDashboardStats } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LeadChart } from '@/components/dashboard/lead-chart'
import { StatusChart } from '@/components/dashboard/status-chart'
import { formatCurrency } from '@/lib/utils'
import { subDays, format } from 'date-fns'
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react'

export const revalidate = 0

export default async function AnalyticsPage() {
  const stats = await getDashboardStats()

  // Generate chart data
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), 29 - i)
    const dateStr = format(date, 'yyyy-MM-dd')
    const leadsOnDate = stats.leads.filter(
      (lead) => format(new Date(lead.created_at), 'yyyy-MM-dd') === dateStr
    ).length

    return {
      date: format(date, 'MMM dd'),
      leads: leadsOnDate,
    }
  })

  const statusData = [
    { name: 'New', value: stats.newLeads, color: '#3b82f6' },
    { name: 'Contacted', value: stats.leads.filter(l => l.status === 'contacted').length, color: '#eab308' },
    { name: 'Qualified', value: stats.qualifiedLeads, color: '#8b5cf6' },
    { name: 'Proposal', value: stats.leads.filter(l => l.status === 'proposal').length, color: '#f97316' },
    { name: 'Won', value: stats.wonLeads, color: '#10b981' },
    { name: 'Lost', value: stats.leads.filter(l => l.status === 'lost').length, color: '#ef4444' },
  ]

  const avgLeadValue = stats.totalLeads > 0 ? stats.totalValue / stats.totalLeads : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive insights into your lead generation performance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.conversionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.wonLeads} won out of {stats.totalLeads} leads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Lead Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(avgLeadValue)}
            </div>
            <p className="text-xs text-muted-foreground">Per lead average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalLeads - stats.wonLeads - stats.leads.filter(l => l.status === 'lost').length}
            </div>
            <p className="text-xs text-muted-foreground">In pipeline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lost Leads</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.leads.filter(l => l.status === 'lost').length}
            </div>
            <p className="text-xs text-muted-foreground">Closed lost</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <LeadChart data={last30Days} />
        <StatusChart data={statusData} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Sources</CardTitle>
            <CardDescription>Where your leads come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(
                stats.leads.reduce((acc, lead) => {
                  acc[lead.source] = (acc[lead.source] || 0) + 1
                  return acc
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([source, count]) => (
                  <div key={source} className="flex justify-between">
                    <span className="text-sm">{source}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>By lead status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Won</span>
                <span className="text-sm font-medium text-green-600">
                  {formatCurrency(stats.wonValue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pipeline</span>
                <span className="text-sm font-medium">
                  {formatCurrency(stats.totalValue - stats.wonValue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-sm font-semibold">
                  {formatCurrency(stats.totalValue)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>At a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">New Leads</span>
                <span className="text-sm font-medium">{stats.newLeads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Qualified</span>
                <span className="text-sm font-medium">{stats.qualifiedLeads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Won</span>
                <span className="text-sm font-medium text-green-600">
                  {stats.wonLeads}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
