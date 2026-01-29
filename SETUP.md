# ServiceLine Dashboard Setup Guide

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/covenantOS/serviceline-dashboard.git
cd serviceline-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
serviceline-dashboard/
├── app/                      # Next.js 14 App Router
│   ├── api/                 # API Routes
│   │   ├── leads/          # Lead endpoints
│   │   ├── campaigns/      # Campaign endpoints
│   │   └── analytics/      # Analytics endpoints
│   ├── leads/               # Lead management pages
│   ├── campaigns/           # Campaign tracking pages
│   ├── settings/            # Admin settings pages
│   ├── layout.tsx           # Root layout with sidebar
│   ├── page.tsx             # Dashboard home
│   └── globals.css          # Global styles
├── components/              # React Components
│   ├── ui/                 # Base shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   └── separator.tsx
│   ├── dashboard/          # Dashboard layout components
│   │   ├── sidebar.tsx      # Navigation sidebar
│   │   ├── header.tsx       # Top header bar
│   │   └── stats-card.tsx   # Metric cards
│   ├── leads/              # Lead-specific components
│   │   ├── lead-table.tsx   # Lead listing table
│   │   └── lead-filters.tsx # Filter controls
│   ├── campaigns/          # Campaign components
│   │   ├── campaign-card.tsx
│   │   └── campaign-analytics.tsx
│   └── settings/           # Settings components
│       ├── user-settings.tsx
│       ├── team-settings.tsx
│       └── integration-settings.tsx
├── types/                   # TypeScript type definitions
│   ├── lead.ts
│   └── campaign.ts
├── lib/                     # Utility functions
│   └── utils.ts             # Helper utilities
└── public/                  # Static assets
```

## Features Implemented

### 📊 Dashboard Overview
- Key metrics display (Total Leads, Active Campaigns, Conversion Rate, Revenue)
- Recent leads list
- Top performing campaigns
- Trend indicators

### 👥 Lead Management
- Lead listing with filtering and search
- Lead status tracking (New, Contacted, Qualified, Converted, Lost)
- Lead scoring system
- Assignment management
- Source tracking
- Contact information management

### 🎯 Campaign Tracking
- Campaign cards with key metrics
- Multi-channel support (Email, Social, PPC, Display, SEO, Content)
- Budget tracking and visualization
- Performance analytics
- ROI calculations
- Conversion rate tracking

### 📊 Analytics & Reporting
- Interactive charts (Area, Bar, Line)
- Performance over time
- Channel comparison
- ROI analysis

### ⚙️ Settings & Configuration
- User profile management
- Notification preferences
- Team member management
- Role-based permissions (Admin, Manager, Agent)
- Integration management (Salesforce, HubSpot, etc.)
- API configuration

## API Routes

### Leads
- `GET /api/leads` - List all leads (with filtering)
- `POST /api/leads` - Create new lead
- `GET /api/leads/[id]` - Get specific lead
- `PATCH /api/leads/[id]` - Update lead
- `DELETE /api/leads/[id]` - Delete lead

### Campaigns
- `GET /api/campaigns` - List all campaigns
- `POST /api/campaigns` - Create new campaign
- `GET /api/campaigns/[id]` - Get specific campaign
- `PATCH /api/campaigns/[id]` - Update campaign
- `DELETE /api/campaigns/[id]` - Delete campaign

### Analytics
- `GET /api/analytics` - Get analytics data

## Customization

### Adding New Components

1. Create component in appropriate directory:
   - UI components: `components/ui/`
   - Feature components: `components/[feature]/`

2. Follow shadcn/ui patterns for consistency

### Styling

- Uses Tailwind CSS for styling
- CSS variables for theming (see `app/globals.css`)
- Dark mode support included

### Adding New Pages

1. Create folder in `app/` directory
2. Add `page.tsx` file
3. Navigation will be automatically handled

## Database Integration

Currently uses mock data. To integrate a real database:

1. Choose your database (PostgreSQL, MongoDB, etc.)
2. Set up database connection in `lib/db.ts`
3. Replace mock data in API routes with database queries
4. Consider using Prisma or Drizzle ORM

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Other Platforms

```bash
npm run build
npm run start
```

## Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL=your_database_url

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret

# External APIs
SALESFORCE_API_KEY=your_api_key
HUBSPOT_API_KEY=your_api_key
```

## Next Steps

1. **Authentication**: Implement NextAuth.js for user authentication
2. **Database**: Connect to PostgreSQL/MongoDB
3. **Real-time Updates**: Add WebSocket support for live updates
4. **Email Integration**: Connect email service for notifications
5. **Advanced Analytics**: Add more chart types and filters
6. **Export Functionality**: Add CSV/PDF export for reports
7. **Mobile Optimization**: Enhance responsive design
8. **Testing**: Add unit and integration tests

## Support

For questions or issues, contact the ServiceLine development team.
