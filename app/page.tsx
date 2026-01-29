import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, TrendingUp, DollarSign, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Leads"
          value="2,847"
          description="All-time leads generated"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Active Campaigns"
          value="12"
          description="Currently running"
          icon={Target}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Conversion Rate"
          value="24.8%"
          description="Average across campaigns"
          icon={TrendingUp}
          trend={{ value: 3.1, isPositive: true }}
        />
        <StatsCard
          title="Revenue"
          value="$45,231"
          description="This month"
          icon={DollarSign}
          trend={{ value: 19.4, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest leads that require attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Alice Cooper", company: "TechCorp", status: "new", time: "2 min ago" },
                { name: "Bob Williams", company: "StartupXYZ", status: "contacted", time: "15 min ago" },
                { name: "Carol Martinez", company: "Enterprise Inc", status: "qualified", time: "1 hour ago" },
                { name: "David Chen", company: "Innovation Labs", status: "new", time: "2 hours ago" },
              ].map((lead, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-muted-foreground">{lead.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm capitalize text-primary">{lead.status}</div>
                    <div className="text-xs text-muted-foreground">{lead.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/leads">
              <Button variant="outline" className="mt-4 w-full gap-2">
                View All Leads
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Campaigns</CardTitle>
            <CardDescription>Best performing this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Q1 Email Campaign", leads: 342, roi: "285%" },
                { name: "Social Media Blitz", leads: 198, roi: "215%" },
                { name: "PPC Google Ads", leads: 267, roi: "340%" },
              ].map((campaign, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{campaign.name}</div>
                    <div className="text-sm font-semibold text-green-600">{campaign.roi}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {campaign.leads} leads
                  </div>
                  {i < 2 && <div className="h-px bg-border" />}
                </div>
              ))}
            </div>
            <Link href="/campaigns">
              <Button variant="outline" className="mt-4 w-full gap-2">
                View All Campaigns
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
