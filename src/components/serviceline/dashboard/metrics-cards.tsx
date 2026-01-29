'use client';

/**
 * Dashboard Metrics Cards
 * Displays key performance indicators with trend indicators
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, UsersIcon, TargetIcon, DollarSignIcon } from 'lucide-react';
import { DashboardMetrics } from '@/types/serviceline';

interface MetricsCardsProps {
  metrics: DashboardMetrics;
  isLoading?: boolean;
}

export function MetricsCards({ metrics, isLoading = false }: MetricsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-4 bg-gray-200 rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Leads',
      value: metrics.totalLeads.toLocaleString(),
      change: metrics.newLeadsThisMonth,
      changeLabel: 'new this month',
      icon: UsersIcon,
      trend: metrics.leadsGrowthRate,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Average Score',
      value: metrics.averageScore.toFixed(1),
      change: null,
      changeLabel: 'lead quality',
      icon: TargetIcon,
      trend: null,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Conversion Rate',
      value: `${metrics.conversionRate.toFixed(1)}%`,
      change: null,
      changeLabel: 'of total leads',
      icon: TrendingUpIcon,
      trend: null,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Campaigns',
      value: metrics.activeCampaigns,
      change: metrics.totalCampaigns,
      changeLabel: 'total campaigns',
      icon: DollarSignIcon,
      trend: null,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              {card.trend !== null && card.trend !== undefined && (
                <>
                  {card.trend > 0 ? (
                    <ArrowUpIcon className="h-3 w-3 text-green-600 mr-1" />
                  ) : card.trend < 0 ? (
                    <ArrowDownIcon className="h-3 w-3 text-red-600 mr-1" />
                  ) : null}
                  <span className={card.trend > 0 ? 'text-green-600' : card.trend < 0 ? 'text-red-600' : ''}>
                    {Math.abs(card.trend).toFixed(1)}%
                  </span>
                  <span className="ml-1">from last month</span>
                </>
              )}
              {card.change !== null && card.trend === null && (
                <>
                  <span className="font-medium">{card.change}</span>
                  <span className="ml-1">{card.changeLabel}</span>
                </>
              )}
              {card.change === null && card.trend === null && (
                <span>{card.changeLabel}</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
