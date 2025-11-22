# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wonderjar Creative is a headless CMS architecture combining:
- **Frontend**: Next.js 15 (App Router) with TypeScript and Tailwind CSS on Vercel
- **Backend**: WordPress block theme with GraphQL API on AWS Lightsail

## Common Commands

```bash
# Root commands (from project root)
npm run dev           # Start frontend dev server (includes codegen)
npm run build         # Build frontend for production
npm run lint          # ESLint check
npm run format        # Format with Prettier

# Frontend-specific (from web/frontend/)
npm run codegen       # Regenerate GraphQL types from WordPress schema
npm run fetch-wp-template-structure  # Fetch template data from WordPress
```

## Architecture

### Routing & Content Flow
1. Catch-all route `[[...slug]]` at `src/app/[[...slug]]/page.tsx` handles all URLs
2. WordPress GraphQL determines content type (Page, Post, etc.)
3. Template components (`src/components/Templates/`) render the appropriate layout
4. Blocks are recursively rendered via `getBlockComponents.tsx`

### Block Rendering System
- WordPress blocks map to React components in `src/components/Blocks/Core/`
- Each component receives: `name`, `attributes`, `saveContent`, `innerBlocks`
- `blockStyles.ts` converts WordPress attributes to Tailwind classes
- Template parts and patterns are fetched and resolved recursively

### GraphQL Integration
- Types auto-generated in `src/gql/` via CodeGen (excluded from git)
- Queries defined in `src/queries/`
- `fetchGraphQL.ts` handles authentication and draft mode
- **Requires live WordPress instance** - cannot build without `NEXT_PUBLIC_WORDPRESS_API_URL`

### Preview Mode
- JWT authentication via `WP_USER` and `WP_APP_PASS` credentials
- `/api/preview` endpoint handles preview links from WordPress
- Cookie-based session with `wp_jwt` token

### Caching
- ISR with 5-minute revalidation (`/api/revalidate` endpoint)
- Templates and patterns have ISR-cached fetchers

## Key Files

| Path | Purpose |
|------|---------|
| `src/app/[[...slug]]/page.tsx` | Main dynamic route handler |
| `src/utils/getBlockComponents.tsx` | Block-to-component mapper |
| `src/utils/blockStyles.ts` | WordPress attrs → Tailwind classes |
| `src/utils/fetchGraphQL.ts` | GraphQL client with auth |
| `src/components/Blocks/Core/` | WordPress block renderers |
| `src/components/Templates/` | Page/Post templates |
| `middleware.ts` | Redirect handling from WordPress Redirection plugin |
| `codegen.ts` | GraphQL CodeGen configuration |

## Environment Variables

Required in `.env.development.local` or `.env.production.local`:
- `NEXT_PUBLIC_WORDPRESS_API_URL` - WordPress GraphQL endpoint
- `HEADLESS_SECRET` - ISR revalidation secret
- `WP_USER` / `WP_APP_PASS` - WordPress app password for preview
- `GRAVITY_FORMS_CONSUMER_KEY` / `GRAVITY_FORMS_CONSUMER_SECRET` - Forms API

## Adding New Block Types

1. Create component in `src/components/Blocks/Core/[BlockName]/`
2. Add mapping in `getBlockComponents.tsx`
3. Block receives `{ name, attributes, saveContent, innerBlocks }`
4. Use `blockStyles.ts` utilities for styling

## Versioning

- **Root**: Calendar Versioning (YYYY.MM.MICRO) - deployment dates
- **Frontend/WordPress**: Semantic Versioning (major.minor.patch)
