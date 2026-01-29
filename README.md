# ServiceLine Dashboard

A modern dashboard application for ServiceLine lead management, campaign tracking, and administrative settings.

## Features

### 🎯 Lead Management
- Real-time lead dashboard with status tracking
- Lead assignment and distribution
- Lead scoring and prioritization
- Lead activity timeline
- Conversion tracking

### 📊 Campaign Analytics
- Campaign performance metrics
- ROI tracking and analysis
- Multi-channel campaign management
- Visual analytics with charts
- Export and reporting capabilities

### ⚙️ Admin Settings
- User management
- Team configuration
- Integration settings
- Notification preferences
- System configuration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
serviceline-dashboard/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── leads/             # Lead management pages
│   ├── campaigns/         # Campaign tracking pages
│   ├── settings/          # Admin settings pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   ├── leads/            # Lead-specific components
│   ├── campaigns/        # Campaign components
│   ├── settings/         # Settings components
│   └── dashboard/        # Dashboard layout components
├── lib/                  # Utilities and helpers
└── types/                # TypeScript type definitions
```

## Development

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## License

Private - CovenantOS
