import React from 'react';
import { Card } from '@/components/ui/card';
import { LeadChart } from '@/components/dashboard/lead-chart';
import { StatusChart } from '@/components/dashboard/status-chart';

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <LeadChart />
        </Card>
        <Card>
          <StatusChart />
        </Card>
      </div>
    </div>
  );
}
