# ServiceLine Dashboard Architecture

## Overview

ServiceLine Dashboard is built with Next.js 14 using the App Router architecture, providing a modern, performant, and maintainable foundation for lead management and campaign tracking.

## Technology Stack

### Core Framework
- **Next.js 14**: React framework with App Router
- **React 18**: UI library with Server Components
- **TypeScript**: Type-safe development

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components built on Radix UI
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management

### Data Visualization
- **Recharts**: Composable charting library

## Project Structure

### App Router (`/app`)

Next.js 14 App Router provides file-system based routing with layouts and nested routes.

```
app/
├── layout.tsx          # Root layout with sidebar and header
├── page.tsx            # Dashboard home page
├── globals.css         # Global styles and CSS variables
├── leads/
│   └── page.tsx        # Leads management page
├── campaigns/
│   └── page.tsx        # Campaigns tracking page
├── settings/
│   └── page.tsx        # Settings page
└── api/                # API routes
    ├── leads/
    ├── campaigns/
    └── analytics/
```

### Components (`/components`)

Organized by feature and reusability:

- **`ui/`**: Base shadcn/ui components (buttons, cards, inputs, etc.)
- **`dashboard/`**: Dashboard-specific layout components
- **`leads/`**: Lead management components
- **`campaigns/`**: Campaign tracking components
- **`settings/`**: Settings and configuration components

### Type Definitions (`/types`)

TypeScript interfaces and types for type safety:

- **`lead.ts`**: Lead-related types
- **`campaign.ts`**: Campaign-related types

### Utilities (`/lib`)

Helper functions and utilities:

- **`utils.ts`**: Common utility functions (cn for className merging)

## Design Patterns

### Component Architecture

1. **Server Components by Default**: All components are Server Components unless marked with "use client"
2. **Client Components**: Used only when necessary (interactivity, hooks, browser APIs)
3. **Composition**: Small, focused components that compose together

### Data Flow

```
Page (Server Component)
  ↓
  Fetches data from API
  ↓
  Passes to Client Components as props
  ↓
Client Components handle user interaction
```

### API Routes

RESTful API design:

- **GET**: Retrieve resources
- **POST**: Create resources
- **PATCH**: Update resources
- **DELETE**: Remove resources

Example:
```typescript
GET    /api/leads       # List all leads
POST   /api/leads       # Create lead
GET    /api/leads/[id]  # Get specific lead
PATCH  /api/leads/[id]  # Update lead
DELETE /api/leads/[id]  # Delete lead
```

## Styling Strategy

### Tailwind CSS

Utility-first approach with custom configuration:

```javascript
tailwind.config.js
├── Custom colors (primary, secondary, muted, etc.)
├── Custom border radius
├── Custom animations
└── Dark mode support
```

### CSS Variables

Theme colors defined as CSS variables in `globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
```

### Component Variants

Using `class-variance-authority` for type-safe variants:

```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default, destructive, outline },
      size: { default, sm, lg, icon }
    }
  }
)
```

## State Management

Current implementation uses:

- **Server Components**: For initial data fetching
- **Client Components**: Local state with React hooks
- **URL State**: Search params for filters and pagination

For future scaling, consider:
- **Zustand**: Lightweight state management
- **React Query**: Server state management
- **Context API**: Shared state across components

## Data Layer

### Current: Mock Data

API routes use in-memory mock data for development.

### Future: Database Integration

Recommended stack:

```
PostgreSQL/MongoDB
  ↓
Prisma ORM / Drizzle
  ↓
API Routes
  ↓
React Components
```

## Performance Optimization

### Current Implementations

1. **Server Components**: Reduced JavaScript bundle size
2. **Code Splitting**: Automatic with Next.js App Router
3. **Image Optimization**: Next.js Image component ready
4. **Font Optimization**: Using next/font

### Future Optimizations

1. **React Server Actions**: For mutations without API routes
2. **Streaming**: Progressive UI rendering
3. **Partial Prerendering**: Mix static and dynamic content
4. **Database Connection Pooling**: For production database

## Security Considerations

### Current

- TypeScript for type safety
- Input validation in API routes
- CORS handling

### To Implement

1. **Authentication**: NextAuth.js
2. **Authorization**: Role-based access control
3. **API Rate Limiting**: Protect against abuse
4. **Input Sanitization**: Prevent XSS attacks
5. **CSRF Protection**: Built-in with Next.js
6. **Environment Variables**: Secure configuration

## Testing Strategy

### Recommended Approach

```
Unit Tests (Jest + React Testing Library)
  ↓
Integration Tests (API routes)
  ↓
E2E Tests (Playwright/Cypress)
```

## Deployment

### Vercel (Recommended)

- Automatic deployments from Git
- Edge Functions support
- Built-in analytics
- Preview deployments

### Alternative Platforms

- AWS Amplify
- Netlify
- Railway
- Self-hosted with Docker

## Scaling Considerations

### Horizontal Scaling

1. **Serverless Functions**: API routes scale automatically
2. **CDN**: Static assets cached globally
3. **Database**: Read replicas for scaling reads

### Vertical Optimizations

1. **Caching**: Redis for session and data caching
2. **Database Indexing**: Optimize query performance
3. **Lazy Loading**: Code and data as needed

## Future Enhancements

### Phase 1: Core Functionality
- [ ] Real database integration
- [ ] User authentication
- [ ] Real-time notifications

### Phase 2: Advanced Features
- [ ] Advanced analytics
- [ ] Email automation
- [ ] Workflow automation
- [ ] Mobile app

### Phase 3: Enterprise Features
- [ ] Multi-tenant support
- [ ] Advanced reporting
- [ ] AI-powered insights
- [ ] Custom integrations

## Maintenance

### Dependency Updates

```bash
npm outdated          # Check for updates
npm update            # Update packages
npm audit             # Security audit
```

### Code Quality

- ESLint for linting
- Prettier for formatting (recommended)
- TypeScript for type checking
- Husky for pre-commit hooks (recommended)

## Contributing Guidelines

1. Follow existing code structure
2. Use TypeScript for type safety
3. Write meaningful commit messages
4. Test changes before committing
5. Update documentation as needed

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
