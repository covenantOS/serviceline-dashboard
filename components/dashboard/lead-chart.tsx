'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

/**
 * Props for the LeadChart component
 */
interface LeadChartProps {
  data: Array<{
    date: string    // Date label (e.g., "Jan 29")
    leads: number   // Number of leads on that date
  }>
}

/**
 * LeadChart - Line chart component showing lead generation trends
 * 
 * Displays a 30-day trend of lead generation with interactive features.
 * Uses Recharts library for data visualization.
 * 
 * @param data - Array of date/lead count pairs
 */
export function LeadChart({ data }: LeadChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Generation Trend</CardTitle>
        <CardDescription>Daily lead generation over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
