# ServiceLine Dashboard - Complete Setup Guide

This guide will walk you through setting up the ServiceLine Lead Generation Dashboard from scratch.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Integrating with Base Template](#integrating-with-base-template)
4. [Configuration](#configuration)
5. [Running the Dashboard](#running-the-dashboard)
6. [Development Workflow](#development-workflow)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm**, **yarn**, or **pnpm** package manager
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)
- **ServiceLine API Key** (contact ServiceLine support if you don't have one)

## Initial Setup

### Step 1: Clone the Base Template

First, clone the Next.js shadcn Dashboard Starter template:

```bash
# Clone the base template
git clone https://github.com/Kiranism/next-shadcn-dashboard-starter.git serviceline-dashboard-app

# Navigate into the directory
cd serviceline-dashboard-app
```

### Step 2: Install Dependencies

Install all required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Install Additional Dependencies

Install the additional packages needed for ServiceLine:

```bash
npm install recharts date-fns lucide-react
# or
yarn add recharts date-fns lucide-react
# or
pnpm add recharts date-fns lucide-react
```

## Integrating with Base Template

### Step 4: Download ServiceLine Custom Files

Clone the ServiceLine dashboard repository in a separate directory:

```bash
cd ..
git clone https://github.com/covenantOS/serviceline-dashboard.git
```

### Step 5: Copy Custom Files

Copy the ServiceLine-specific files to your dashboard:

```bash
# Copy type definitions
mkdir -p serviceline-dashboard-app/src/types
cp serviceline-dashboard/src/types/serviceline.ts serviceline-dashboard-app/src/types/

# Copy API utilities
mkdir -p serviceline-dashboard-app/src/lib/serviceline
cp serviceline-dashboard/src/lib/serviceline/*.ts serviceline-dashboard-app/src/lib/serviceline/

# Copy components
mkdir -p serviceline-dashboard-app/src/components/serviceline
cp -r serviceline-dashboard/src/components/serviceline/* serviceline-dashboard-app/src/components/serviceline/

# Copy environment example
cp serviceline-dashboard/.env.example serviceline-dashboard-app/.env.local
```

### Step 6: Create Additional Required Folders

```bash
cd serviceline-dashboard-app

# Create app routes directories
mkdir -p src/app/leads
mkdir -p src/app/campaigns
mkdir -p src/app/settings
```

## Configuration

### Step 7: Configure Environment Variables

Edit `.env.local` and add your ServiceLine API credentials:

```env
NEXT_PUBLIC_SERVICELINE_API_URL=https://api.serviceline.com/v1
NEXT_PUBLIC_SERVICELINE_API_KEY=your_actual_api_key_here
```

**Important**: Never commit your `.env.local` file to version control!

### Step 8: Update Next.js Configuration (Optional)

If you need to configure CORS or API routes, update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Configure CORS for external APIs
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Step 9: Update Tailwind Configuration

Ensure your `tailwind.config.js` includes the ServiceLine components:

```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        serviceline: {
          primary: '#3b82f6',
          secondary: '#10b981',
        },
      },
    },
  },
  plugins: [],
};
```

## Running the Dashboard

### Step 10: Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 11: Verify Installation

Check that everything is working:

1. **Dashboard loads** without errors
2. **API connection** is established (check browser console)
3. **Components render** correctly
4. **No TypeScript errors** in the terminal

## Development Workflow

### Creating Custom Pages

#### Dashboard Home Page

Create `src/app/dashboard/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { MetricsCards } from '@/components/serviceline/dashboard/metrics-cards';
import { IndustryChart } from '@/components/serviceline/charts/industry-chart';
import { getLeadStats } from '@/lib/serviceline/leads';
import { DashboardMetrics, IndustryDistribution } from '@/types/serviceline';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [industryData, setIndustryData] = useState<IndustryDistribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getLeadStats();
        // Transform stats to metrics format
        setMetrics({
          totalLeads: stats.total,
          newLeadsThisMonth: stats.newThisMonth,
          leadsGrowthRate: 12.5, // Calculate from data
          averageScore: stats.averageScore,
          conversionRate: stats.conversionRate,
          totalCampaigns: 0,
          activeCampaigns: 0,
        });
        
        // Transform industry data
        const industries: IndustryDistribution[] = Object.entries(stats.byIndustry).map(
          ([industry, count]) => ({
            industry,
            count: count as number,
            percentage: ((count as number) / stats.total) * 100,
            averageScore: stats.averageScore,
          })
        );
        setIndustryData(industries);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome to your ServiceLine dashboard</p>
      </div>

      {metrics && <MetricsCards metrics={metrics} isLoading={loading} />}
      
      <div className="grid gap-6 md:grid-cols-2">
        <IndustryChart data={industryData} isLoading={loading} />
      </div>
    </div>
  );
}
```

#### Leads Page

Create `src/app/leads/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { LeadsTable } from '@/components/serviceline/leads/leads-table';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { getLeads } from '@/lib/serviceline/leads';
import { Lead } from '@/types/serviceline';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await getLeads(1, 50);
        setLeads(response.items);
      } catch (error) {
        console.error('Failed to fetch leads:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-gray-500">Manage your lead database</p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>

      <LeadsTable
        leads={leads}
        isLoading={loading}
        onSelectLead={(lead) => console.log('Selected:', lead)}
        onEditLead={(lead) => console.log('Edit:', lead)}
        onDeleteLead={(lead) => console.log('Delete:', lead)}
      />
    </div>
  );
}
```

### Adding New Components

All custom components should follow the shadcn/ui patterns:

```typescript
// Example: src/components/serviceline/custom/my-component.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Component</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Your content here */}
      </CardContent>
    </Card>
  );
}
```

## Troubleshooting

### Common Issues

#### 1. API Connection Errors

**Error**: "Failed to fetch" or "Network error"

**Solution**:
```bash
# Check if API URL is correct in .env.local
echo $NEXT_PUBLIC_SERVICELINE_API_URL

# Verify API key is set
echo $NEXT_PUBLIC_SERVICELINE_API_KEY

# Test API connection
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.serviceline.com/v1/health
```

#### 2. TypeScript Errors

**Error**: "Cannot find module '@/types/serviceline'"

**Solution**:
```bash
# Ensure files are in correct locations
ls -la src/types/serviceline.ts
ls -la src/lib/serviceline/

# Restart TypeScript server in VS Code
# Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
# Type "TypeScript: Restart TS Server"
```

#### 3. Missing shadcn/ui Components

**Error**: "Cannot find module '@/components/ui/...'

**Solution**:
```bash
# Install missing shadcn components
npx shadcn-ui@latest add card
npx shadcn-ui@latest add table
npx shadcn-ui@latest add button
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add dropdown-menu
```

#### 4. Environment Variables Not Loading

**Error**: "undefined" when accessing process.env variables

**Solution**:
- Ensure `.env.local` exists in project root
- Restart development server after changing env vars
- Variables must start with `NEXT_PUBLIC_` to be accessible in browser

#### 5. Chart Library Issues

**Error**: "Recharts is not defined"

**Solution**:
```bash
# Reinstall recharts
npm install recharts --save
# or
yarn add recharts
```

### Getting Help

- **Documentation**: Check the README.md for detailed API documentation
- **Issues**: Create an issue on GitHub with error details
- **Support**: Email support@serviceline.com

## Next Steps

Once you have the dashboard running:

1. **Customize Colors**: Update theme in `tailwind.config.js`
2. **Add Authentication**: Integrate NextAuth.js
3. **Set Up Database**: Connect to PostgreSQL/MongoDB
4. **Deploy**: Deploy to Vercel or your preferred hosting
5. **Add Tests**: Write unit and integration tests

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Recharts Documentation](https://recharts.org/)

---

**Need help?** Open an issue or reach out to the ServiceLine support team!
