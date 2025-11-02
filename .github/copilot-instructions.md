# AI Agent Instructions for pink-dot

This document provides essential context for AI agents working in this Next.js project.

## Project Architecture

- Built with Next.js 16.0.0 using the App Router pattern
- TypeScript-based with strict mode enabled
- Uses CSS Modules for component-specific styling
- Static Site Generation (SSG) enabled for `/about` and `/blog` routes

### Key Directories
- `/src/app/*` - Page components and routing
- `/src/app/components` - Shared React components
- `/src/app/lib` - Utility functions and shared logic
- `/public` - Static assets

## Development Workflow

### Local Development
```bash
npm install  # Install dependencies
npm run dev  # Start dev server at http://localhost:3000
```

### Code Quality
- ESLint configured with Next.js recommended rules
- TypeScript strict mode enabled
- Path aliases configured (`@/*` maps to `./src/*`)

## Project Conventions

### Routing & Pages
- Pages use default exports for route components
- Static pages marked with `export const dynamic = 'force-static'`
- Layout shared via `src/app/layout.tsx`

### Styling
- CSS Modules used for component styles (e.g., `page.module.css`)
- Global styles in `src/app/globals.css`
- Dark mode support via `prefers-color-scheme` media query
- Uses Geist font family (sans and mono variants)

### Component Patterns
- Page components use PascalCase naming
- Image components use Next.js optimized `Image` component
- External links include `rel="noopener noreferrer"`

## Configuration
- Next.js config in `next.config.ts`
- TypeScript config in `tsconfig.json`
- ESLint config in `eslint.config.mjs`

## Common Tasks
- Adding a new page: Create a new directory under `src/app` with `page.tsx`
- Styling: Create a `.module.css` file alongside your component
- Static assets: Place in `/public` directory

## Build & Deployment
```bash
npm run build  # Production build
npm start      # Start production server
```
Deployed via Vercel platform (refer to deployment docs for details)