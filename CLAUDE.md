# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Business Context

**Wonderjar Creative** is a web development studio based in Denver, Colorado (remote-first). It's a freelance business that has been operating for several years.

**Positioning:** A professional web development studio—not a holding company or collective. Tone should be confident, technically credible, and direct. Avoid startup-speak, buzzwords, and whimsical/playful imagery.

**Denver Headless** (denverheadless.com) is a specialized service line within Wonderjar Creative, focused on headless WordPress with Next.js frontends. It's a niche productized offering, not a separate company.

**Voice guidelines:**
- Professional but approachable
- Technical credibility without jargon overload
- Direct and specific—avoid vague claims like "digital experiences" or "scalable solutions"
- Show restraint in design (sophisticated, minimal > playful illustrations)

## Project Overview

Headless WordPress monorepo with Next.js 15 frontend (TypeScript, Tailwind CSS v4) on Vercel and WordPress block theme with WPGraphQL on AWS Lightsail.

**Critical**: The frontend cannot build without a live WordPress instance - GraphQL CodeGen fetches the schema at build time.

## Commands

```bash
# From project root
npm run dev           # Runs: fetch-template-structure → codegen → next dev
npm run build         # Production build (requires WordPress)
npm run lint          # ESLint
npm run format        # Prettier

# From web/frontend/
npm run codegen       # Regenerate GraphQL types manually
npm run fetch-wp-template-structure  # Update template/pattern cache
```

## Architecture

### Content Flow
1. Catch-all route `src/app/[[...slug]]/page.tsx` receives all URLs
2. `ContentInfoQuery` determines content type via GraphQL
3. Routes to `PageTemplate` or `PostTemplate` in `src/components/Templates/`
4. Templates call `getBlockComponents()` for recursive block rendering

### Block System
WordPress blocks → React components in `src/components/Blocks/Core/`:
- Each receives `{ name, attributes, saveContent, innerBlocks }`
- `core/template-part` and `core/pattern` blocks resolve dynamically via `renderTemplatePart()` and `renderPattern()`
- `blockMedia.ts` batch-fetches media details via REST API, enriches blocks with `mediaItem` data

### Adding New Blocks
1. Create component: `src/components/Blocks/Core/[BlockName]/[BlockName].tsx`
2. Add case in `getBlockComponents.tsx` switch statement with `dynamic()` import
3. Import attribute types from `@/gql/graphql`
4. Use `getBlockClasses()` and `getBlockBaseClass()` from `blockStyles.ts`

### GraphQL
- Types generated in `src/gql/` (gitignored) - run `npm run codegen` to regenerate
- Queries in `src/queries/`
- `fetchGraphQL.ts` handles auth headers for draft/preview mode

### Caching
- Pages: 5-minute ISR (`revalidate = 300`)
- Template parts/patterns: 1-hour ISR cache, stored in `data/*.json`
- Navigation: 1-hour static cache via `api/navigation/[id]/route.ts`
- Revalidation: `/api/revalidate` endpoint triggered by WordPress (requires `X-Headless-Secret-Key` header)

### Preview/Draft Mode
- WordPress preview link → `/api/preview` → JWT auth → Next.js `draftMode()`
- Requires `WP_USER` and `WP_APP_PASS` for authentication

## Key Files

| Path | Purpose |
|------|---------|
| `web/frontend/src/app/[[...slug]]/page.tsx` | Main route handler |
| `web/frontend/src/utils/getBlockComponents.tsx` | Block-to-component mapper |
| `web/frontend/src/utils/blockStyles.ts` | WordPress attrs → Tailwind classes |
| `web/frontend/src/utils/blockMedia.ts` | Media enrichment via REST API |
| `web/frontend/src/utils/fetchGraphQL.ts` | GraphQL client with auth |
| `web/frontend/src/utils/htmlTransformations.tsx` | HTML parsing utilities |
| `web/frontend/middleware.ts` | Redirect handling (WordPress Redirection plugin) |
| `web/wordpress/wp-content/themes/wonderjarcreative-backend/` | WordPress theme |

## Environment Variables

Required in `web/frontend/.env.development.local`:
```bash
NEXT_PUBLIC_WORDPRESS_API_URL=https://cms.wonderjarcreative.com
HEADLESS_SECRET=xxx                  # ISR revalidation
WP_USER=username                     # WordPress app password user
WP_APP_PASS=xxxx xxxx xxxx xxxx      # WordPress app password
GRAVITY_FORMS_CONSUMER_KEY=ck_xxx    # Optional: Forms API
GRAVITY_FORMS_CONSUMER_SECRET=cs_xxx
```

## WordPress Theme

Located in `web/wordpress/wp-content/themes/wonderjarcreative-backend/`:
- Class-based architecture: `Theme.php` → `Loader.php` → Feature modules in `inc/Features/`
- REST endpoint: `/wp-json/template-structure/v1/full` for template data
- `theme.json` defines color palette and spacing scale (synced with Tailwind)

Required plugins: WPGraphQL, WPGraphQL JWT Authentication, WPGraphQL for Rank Math, Rank Math SEO, Gravity Forms + REST API, Redirection

## Troubleshooting

- **Build fails with GraphQL errors**: Verify `NEXT_PUBLIC_WORDPRESS_API_URL` and WordPress accessibility
- **Preview not working**: Check JWT auth credentials
- **Template parts missing**: Run `npm run fetch-wp-template-structure`
- **Styles missing**: Ensure `theme.json` matches Tailwind config

## Versioning

- **Root monorepo**: Calendar versioning (YYYY.MM.MICRO) - deployment dates
- **Frontend/WordPress**: Semantic versioning (major.minor.patch)
