import { getDashboardStats } from '@/lib/api'
import { StatsCard } from '@/components/dashboard/stats-card'
import { LeadChart } from '@/components/dashboard/lead-chart'
import { StatusChart } from '@/components/dashboard/status-chart'
import { Users, TrendingUp, DollarSign, Target } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { subDays, format } from 'date-fns'

export const revalidate = 0

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  // Generate chart data from leads
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

  // Status distribution data
  const statusData = [
    { name: 'New', value: stats.newLeads, color: '#3b82f6' },
    { name: 'Qualified', value: stats.qualifiedLeads, color: '#8b5cf6' },
    { name: 'Won', value: stats.wonLeads, color: '#10b981' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Will!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={Users}
          description="All time leads"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate.toFixed(1)}%`}
          icon={TrendingUp}
          description="Lead to won ratio"
        />
        <StatsCard
          title="Total Value"
          value={formatCurrency(stats.totalValue)}
          icon={DollarSign}
          description="All leads value"
        />
        <StatsCard
          title="Won Value"
          value={formatCurrency(stats.wonValue)}
          icon={Target}
          description="Closed deals"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <LeadChart data={last30Days} />
        <StatusChart data={statusData} />
      </div>
    </div>
  )
}
