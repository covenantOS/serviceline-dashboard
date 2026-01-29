# ServiceLine Lead Generation Dashboard

A modern, full-featured lead generation and campaign management dashboard built with Next.js 14, Supabase, and shadcn/ui.

![ServiceLine Dashboard](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=flat&logo=supabase)

## 🚀 Features

### Lead Management
- **Comprehensive Lead Tracking**: Manage leads with detailed information including contact details, company, value, and status
- **Advanced Search & Filtering**: Search leads by name, email, company, and filter by status
- **Lead Status Pipeline**: Track leads through stages (New, Contacted, Qualified, Proposal, Won, Lost)
- **Activity Timeline**: Keep detailed history of all interactions with each lead
- **Lead Forms**: Create and edit leads with intuitive, validated forms

### Campaign Management
- **Campaign Creation**: Set up marketing campaigns with budgets, dates, and descriptions
- **Campaign Tracking**: Monitor campaign performance and lead generation
- **Status Management**: Track campaigns as Active, Paused, or Completed
- **Campaign Analytics**: View lead counts and metrics per campaign

### Analytics & Reporting
- **Real-time Dashboard**: View key metrics including total leads, conversion rates, and revenue
- **Interactive Charts**: Visualize lead generation trends and status distribution with Recharts
- **Performance Metrics**: Track conversion rates, average lead value, and pipeline health
- **Source Analysis**: Identify your best lead sources
- **Revenue Breakdown**: Analyze revenue by status and campaign

### User Interface
- **Modern Design**: Built with shadcn/ui components and Tailwind CSS
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Ready**: Theme system prepared for light/dark mode
- **Intuitive Navigation**: Clean sidebar navigation with clear hierarchy

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Date Handling**: date-fns

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A Supabase account and project
- Git installed

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/covenantOS/serviceline-dashboard.git
cd serviceline-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project in [Supabase](https://supabase.com)
2. Run the SQL schema from `database/schema.sql` in your Supabase SQL editor
3. Get your project URL and anon key from Project Settings > API

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

The application uses three main tables:

### Leads Table
- Stores all lead information including contact details, status, value, and source
- Links to campaigns via `campaign_id`

### Campaigns Table
- Manages marketing campaign information
- Tracks budget, dates, status, and lead counts

### Lead Activities Table
- Records all activities and interactions with leads
- Supports multiple activity types (email, call, meeting, note, status_change)

See `database/schema.sql` for the complete schema.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel project settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/covenantOS/serviceline-dashboard)

### Deploy to Other Platforms

This app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

Make sure to:
1. Set the build command to `npm run build`
2. Set the output directory to `.next`
3. Add all environment variables

## 📱 Features Breakdown

### Dashboard
- Overview of key metrics
- Lead generation trend chart (30 days)
- Lead status distribution pie chart
- Quick stats cards

### Leads
- List all leads with search and filter
- View detailed lead information
- Edit lead details
- Track lead activity history
- Add new leads

### Campaigns
- Create and manage campaigns
- View campaign details and performance
- Track leads per campaign
- Monitor campaign budgets

### Analytics
- Detailed performance metrics
- Conversion rate analysis
- Revenue breakdown
- Top lead sources
- Pipeline health monitoring

### Settings
- User profile management
- Notification preferences
- Integration configuration

## 🔧 Development

### Project Structure

```
serviceline-dashboard/
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard layout group
│   │   ├── leads/        # Lead pages
│   │   ├── campaigns/    # Campaign pages
│   │   ├── analytics/    # Analytics page
│   │   └── settings/     # Settings page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard/        # Dashboard components
│   ├── leads/            # Lead components
│   └── campaigns/        # Campaign components
├── lib/                   # Utility functions
│   ├── utils.ts          # Helper functions
│   ├── supabase.ts       # Supabase client & types
│   └── api.ts            # API functions
├── database/              # Database files
│   └── schema.sql        # Database schema
└── public/               # Static assets
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Will Hamilton**

- GitHub: [@covenantOS](https://github.com/covenantOS)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ using Next.js and Supabase
