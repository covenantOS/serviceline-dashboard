# ServiceLine Dashboard - Dependencies

## Required Dependencies

These dependencies need to be installed in addition to the base template's dependencies.

### Core Dependencies

```json
{
  "dependencies": {
    "recharts": "^2.10.3",
    "date-fns": "^3.0.6",
    "lucide-react": "^0.305.0"
  }
}
```

### Installation Command

After cloning the base template, run:

```bash
npm install recharts date-fns lucide-react
```

Or with yarn:

```bash
yarn add recharts date-fns lucide-react
```

Or with pnpm:

```bash
pnpm add recharts date-fns lucide-react
```

## Base Template Dependencies

The Next.js shadcn Dashboard Starter already includes:

- **next**: ^14.0.0 (or latest)
- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **typescript**: ^5.0.0
- **tailwindcss**: ^3.3.0
- **@radix-ui/react-***: Various Radix UI components
- **class-variance-authority**: For component variants
- **clsx**: Utility for className
- **tailwind-merge**: Merge Tailwind classes

## Optional Dependencies

### For Database Integration

```bash
npm install prisma @prisma/client
# or
npm install drizzle-orm postgres
```

### For Authentication

```bash
npm install next-auth
```

### For Form Handling

```bash
npm install react-hook-form @hookform/resolvers zod
```

### For State Management

```bash
npm install zustand
# or
npm install @tanstack/react-query
```

### For Testing

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

## Verification

After installation, verify all packages are installed:

```bash
npm list recharts date-fns lucide-react
```

You should see output like:

```
serviceline-dashboard@1.0.0
├── recharts@2.10.3
├── date-fns@3.0.6
└── lucide-react@0.305.0
```

## Package Details

### recharts (^2.10.3)
- **Purpose**: Chart and data visualization library
- **Used For**: Industry distribution pie charts, lead score histograms, trend graphs
- **Documentation**: https://recharts.org/

### date-fns (^3.0.6)
- **Purpose**: Modern JavaScript date utility library
- **Used For**: Date formatting, date calculations, and relative time displays
- **Documentation**: https://date-fns.org/

### lucide-react (^0.305.0)
- **Purpose**: Beautiful & consistent icon toolkit
- **Used For**: Icons throughout the dashboard (already included in base template)
- **Documentation**: https://lucide.dev/

## Troubleshooting

### Peer Dependency Warnings

If you see peer dependency warnings, they can usually be ignored if the app runs correctly. To resolve:

```bash
npm install --legacy-peer-deps
```

### Version Conflicts

If you encounter version conflicts:

1. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

3. Reinstall:
   ```bash
   npm install
   ```

### Missing Types

If TypeScript complains about missing types:

```bash
npm install --save-dev @types/node @types/react @types/react-dom
```

## Development Dependencies

The base template should already include these dev dependencies:

```json
{
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-config-next": "^14.0.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.3.0"
  }
}
```

## License Compatibility

All dependencies use permissive licenses (MIT, Apache-2.0) and are safe for commercial use.

## Updates

To update dependencies:

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update recharts
```

## Package Size

Estimated bundle impact:
- recharts: ~180KB (gzipped)
- date-fns: ~67KB (gzipped, tree-shakeable)
- lucide-react: ~2KB per icon (tree-shakeable)

Total additional bundle size: ~250KB gzipped

This is reasonable for a dashboard application with data visualization requirements.
