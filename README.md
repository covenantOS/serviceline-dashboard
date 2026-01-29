# ServiceLine Lead Generation Dashboard

A comprehensive lead generation management dashboard built with Next.js 16, shadcn/ui, Tailwind CSS, and TypeScript.

![ServiceLine Dashboard](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)

## 🚀 Features

### Dashboard Home
- **Lead Acquisition Metrics**: Total leads, conversion rates, and growth trends
- **Industry Distribution**: Interactive pie chart showing lead breakdown by industry
- **Lead Score Distribution**: Histogram displaying lead scoring patterns
- **Recent Leads Table**: Quick view of latest leads with key information

### Lead Management
- **Advanced Filtering**: Sort and filter leads by score, industry, location, and date
- **Detailed Lead View**: Complete lead profiles with scoring breakdown
- **Bulk Actions**: Add leads to campaigns, edit details, or remove leads
- **Export Capabilities**: Export lead data in multiple formats

### Campaign Management
- **Campaign Builder**: Create targeted campaigns with advanced filters
- **Email Templates**: Pre-built and custom email template library
- **Performance Analytics**: Track open rates, click rates, and conversions
- **Timeline Tracking**: Visual campaign progress and status monitoring

### Settings
- **API Configuration**: ServiceLine endpoint management
- **Scraper Settings**: Configure data collection frequency and sources
- **Template Manager**: Create, edit, and manage email templates
- **User Preferences**: Customize dashboard appearance and behavior

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git
- A ServiceLine API key (for production use)

## 🛠️ Installation

### Step 1: Clone the Base Template

First, clone the Next.js shadcn Dashboard Starter template:

```bash
git clone https://github.com/Kiranism/next-shadcn-dashboard-starter.git temp-dashboard
cd temp-dashboard
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Clone ServiceLine Custom Files

In a separate directory, clone this repository:

```bash
cd ..
git clone https://github.com/covenantOS/serviceline-dashboard.git
```

### Step 4: Copy Custom Files

Copy the ServiceLine-specific files from this repo to your dashboard:

```bash
# Copy types
cp -r serviceline-dashboard/src/types/* temp-dashboard/src/types/

# Copy components
cp -r serviceline-dashboard/src/components/serviceline/* temp-dashboard/src/components/

# Copy pages/app routes
cp -r serviceline-dashboard/src/app/serviceline/* temp-dashboard/src/app/

# Copy API utilities
cp -r serviceline-dashboard/src/lib/serviceline/* temp-dashboard/src/lib/

# Copy environment example
cp serviceline-dashboard/.env.example temp-dashboard/.env.local
```

### Step 5: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# ServiceLine API Configuration
NEXT_PUBLIC_SERVICELINE_API_URL=https://api.serviceline.com/v1
SERVICELINE_API_KEY=your_api_key_here

# Database (if using)
DATABASE_URL=your_database_url

# Optional: Email Service
EMAIL_SERVICE_API_KEY=your_email_service_key
```

### Step 6: Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
serviceline-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Dashboard home
│   │   ├── leads/              # Lead management pages
│   │   ├── campaigns/          # Campaign management
│   │   └── settings/           # Settings pages
│   ├── components/
│   │   ├── serviceline/        # Custom ServiceLine components
│   │   │   ├── dashboard/      # Dashboard widgets
│   │   │   ├── leads/          # Lead components
│   │   │   ├── campaigns/      # Campaign components
│   │   │   └── charts/         # Chart components
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   ├── serviceline/        # ServiceLine API utilities
│   │   │   ├── api.ts          # API client
│   │   │   ├── leads.ts        # Lead management functions
│   │   │   └── campaigns.ts    # Campaign functions
│   │   └── utils.ts            # Utility functions
│   └── types/
│       └── serviceline.ts      # TypeScript interfaces
├── public/                     # Static assets
└── package.json
```

## 🔧 Configuration

### API Setup

The dashboard connects to ServiceLine APIs through the configuration in `src/lib/serviceline/api.ts`. Update the base URL and authentication:

```typescript
const SERVICELINE_API_BASE = process.env.NEXT_PUBLIC_SERVICELINE_API_URL;
const API_KEY = process.env.SERVICELINE_API_KEY;
```

### Customization

#### Colors and Theme

Modify `tailwind.config.js` to customize the color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        serviceline: {
          primary: '#your-color',
          secondary: '#your-color',
        }
      }
    }
  }
}
```

#### Dashboard Metrics

Update dashboard calculations in `src/components/serviceline/dashboard/metrics.tsx`.

## 📊 Data Structures

### Lead Interface

```typescript
interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  location: string;
  score: number;
  scoreBreakdown: {
    engagement: number;
    demographic: number;
    behavioral: number;
  };
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  dateAdded: Date;
  lastContact?: Date;
}
```

### Campaign Interface

```typescript
interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  targeting: {
    industries: string[];
    locations: string[];
    scoreRange: [number, number];
  };
  emailTemplate: string;
  performance: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
  };
  createdAt: Date;
  launchDate?: Date;
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/covenantOS/serviceline-dashboard)

### Docker

```bash
# Build image
docker build -t serviceline-dashboard .

# Run container
docker run -p 3000:3000 serviceline-dashboard
```

## 📖 Usage Guide

### Adding a New Lead

1. Navigate to **Leads** page
2. Click **Add Lead** button
3. Fill in lead information
4. System automatically calculates lead score
5. Click **Save Lead**

### Creating a Campaign

1. Go to **Campaigns** page
2. Click **Create Campaign**
3. Set campaign name and description
4. Configure targeting criteria
5. Select email template
6. Preview and launch

### Viewing Analytics

The dashboard home provides real-time analytics:
- Total leads and conversion rates
- Industry distribution
- Lead score trends
- Recent activity

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on [Next.js shadcn Dashboard Starter](https://github.com/Kiranism/next-shadcn-dashboard-starter)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Charts powered by [Recharts](https://recharts.org/)

## 📧 Support

For issues and questions:
- Create an [Issue](https://github.com/covenantOS/serviceline-dashboard/issues)
- Email: support@serviceline.com

## 🗺️ Roadmap

- [ ] Advanced lead scoring AI/ML integration
- [ ] Multi-channel campaign support (SMS, social media)
- [ ] A/B testing for email templates
- [ ] Integration with CRM systems (Salesforce, HubSpot)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reporting dashboard
- [ ] Team collaboration features

---

**Built with ❤️ for lead generation professionals**
