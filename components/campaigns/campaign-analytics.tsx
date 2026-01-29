"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const performanceData = [
  { date: "Jan 1", leads: 45, conversions: 12, spend: 850 },
  { date: "Jan 8", leads: 52, conversions: 18, spend: 920 },
  { date: "Jan 15", leads: 61, conversions: 22, spend: 1050 },
  { date: "Jan 22", leads: 58, conversions: 20, spend: 980 },
  { date: "Jan 29", leads: 68, conversions: 25, spend: 1100 },
]

const channelData = [
  { channel: "Email", leads: 145, conversions: 42, roi: 285 },
  { channel: "Social", leads: 98, conversions: 28, roi: 215 },
  { channel: "PPC", leads: 167, conversions: 55, roi: 340 },
  { channel: "SEO", leads: 124, conversions: 38, roi: 295 },
]

export function CampaignAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
        <CardDescription>Track your campaign metrics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="leads" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="conversions" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="channels" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" fill="#8884d8" />
                <Bar dataKey="conversions" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="roi" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="roi" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
