'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

interface StatusChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
}

export function StatusChart({ data }: StatusChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Status Distribution</CardTitle>
        <CardDescription>Current leads by status</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
