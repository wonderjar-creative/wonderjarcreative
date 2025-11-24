# Wonderjar Creative - AI Coding Agent Instructions

## Project Architecture

This is a **headless WordPress** project with Next.js 15 App Router frontend and WordPress block theme backend. The architecture is tightly coupled through GraphQL and requires both systems to work together.

- **Frontend**: `web/frontend/` - Next.js 15 (TypeScript, Tailwind CSS) on Vercel
- **Backend**: `web/wordpress/` - WordPress block theme with WPGraphQL on AWS Lightsail
- **Monorepo**: Root-level scripts run frontend commands, workspace structure in `package.json`

## Critical Build Requirements

**The frontend CANNOT build without a live WordPress instance.** GraphQL CodeGen (`codegen.ts`) fetches the schema from WordPress at build time to generate types in `src/gql/`. These types are gitignored and must be regenerated.

```bash
# Development workflow
npm run dev              # Runs: codegen → add ts-nocheck → next dev
npm run codegen          # Manually regenerate GraphQL types

# Build fails without NEXT_PUBLIC_WORDPRESS_API_URL pointing to live WordPress
```

## Content Rendering System

### 1. Routing Flow
The **catch-all route** `src/app/[[...slug]]/page.tsx` handles all content:
1. Converts Next.js slug to WordPress slug via `nextSlugToWpSlug()`
2. Fetches content type via GraphQL (`ContentInfoQuery`)
3. Routes to template: `PageTemplate`, `PostTemplate`, etc.
4. Templates recursively render blocks via `getBlockComponents()`

### 2. Block-to-Component Mapping
WordPress blocks map to React components in `src/components/Blocks/Core/`. Each receives:
```typescript
{ name: string, attributes: Record<string, any>, saveContent: string, innerBlocks: Block[] }
```

**Key utilities:**
- `getBlockComponents.tsx` - Maps block names to components, handles recursion
- `blockStyles.ts` - Converts WordPress attributes (align, fontSize, etc.) to Tailwind classes
- `blockMedia.ts` - Batch-fetches media details via REST API, enriches blocks with `mediaItem` data

### 3. Template Parts & Patterns
Resolved **dynamically** at render time:
- `core/template-part` → `renderTemplatePart()` → fetches via ISR (`fetchTemplatePartWithISR`)
- `core/pattern` → `renderPattern()` → fetches pattern blocks, recursively renders
- Both are cached with ISR (stored in `data/*.json` from `fetch-wp-template-structure.js`)

## Data Flow & Caching

### ISR Strategy
- **Pages**: 5-minute revalidation (`revalidate = 300` in `[[...slug]]/page.tsx`)
- **Template parts/patterns**: 1-hour cache via ISR fetchers
- **Navigation**: 1-hour static cache (`api/navigation/[id]/route.ts`)
- **Revalidation**: `/api/revalidate` endpoint triggered by WordPress (secret header required)

### Preview/Draft Mode
- **Authentication**: JWT via `WP_USER`/`WP_APP_PASS` (WordPress app password)
- **Flow**: WordPress preview link → `/api/preview` → sets JWT cookie → enables Next.js `draftMode()`
- **GraphQL**: `fetchGraphQL.ts` adds `Authorization: Bearer` header when preview active

## Environment Variables

Required in `.env.development.local` or `.env.production.local`:
```bash
NEXT_PUBLIC_WORDPRESS_API_URL=https://cms.wonderjarcreative.com
HEADLESS_SECRET=xxx                  # ISR revalidation secret
WP_USER=username                      # WordPress app password username
WP_APP_PASS=xxxx xxxx xxxx xxxx      # WordPress app password
GRAVITY_FORMS_CONSUMER_KEY=ck_xxx    # Forms API (optional)
GRAVITY_FORMS_CONSUMER_SECRET=cs_xxx
```

## Key File Patterns

### Block Components
Located in `src/components/Blocks/Core/[BlockName]/`. Example structure:
```tsx
import { getBlockClasses, getBlockBaseClass } from '@/utils/blockStyles';

const Button: React.FC<CoreButtonBlock> = ({ name, attributes, saveContent }) => {
  const blockClasses = getBlockClasses(attributes, getBlockBaseClass(name));
  // Use saveContent for raw HTML or parse/transform it
  return <div className={blockClasses}>...</div>;
};
```

### Dynamic Imports
Use `next/dynamic` with `{ ssr: true }` in `getBlockComponents.tsx`:
```tsx
const Button = dynamic(() => import('@/components/Blocks/Core/Button/Button'), { ssr: true });
```

### Animations
Project uses `framer-motion` for animations (see `src/components/Effects/`):
- `JumpingText.tsx` - Character-by-character spring animations
- `BlastOffImage.tsx` - Parallax scroll effects with `useInView`

## WordPress Integration

### Theme Structure (`web/wordpress/wp-content/themes/wonderjarcreative-backend/`)
- **Class-based architecture**: `Theme.php` → `Loader.php` → Feature modules in `inc/Features/`
- **REST API extensions**: `RestFeature.php` adds `/wp-json/template-structure/v1/full` endpoint
- **Block patterns**: Defined in `patterns/` directory, synced to WordPress on theme activation
- **Theme.json**: Defines color palette (teal, warm-coral, etc.) and spacing scale used by Tailwind

### Required Plugins
- WPGraphQL
- WPGraphQL JWT Authentication
- WPGraphQL for Rank Math
- Rank Math SEO (robots.txt must point to `sitemap.xml` not `wp-sitemap.xml`)
- Gravity Forms + REST API add-on
- Redirection (for middleware redirects)

## Development Commands

```bash
# From project root
npm install                           # Install all workspace dependencies
npm run dev                           # Frontend dev server with codegen
npm run build                         # Production build
npm run format                        # Prettier formatting

# Frontend-specific (cd web/frontend/)
npm run fetch-wp-template-structure   # Pre-build: fetch template/pattern data
npm run codegen                       # Regenerate GraphQL types
```

## Common Patterns

### Adding New Block Types
1. Create component: `src/components/Blocks/Core/NewBlock/NewBlock.tsx`
2. Add case in `getBlockComponents.tsx` switch statement
3. Import GraphQL attribute types from `@/gql/graphql`
4. Use `blockStyles.ts` utilities for className generation

### Handling WordPress HTML
Use `html-react-parser` and transformations in `htmlTransformations.tsx`:
- `stripOuterTag()` - Remove wrapper divs/anchors
- `getTransformedHtml()` - Parse HTML with custom element transforms

### SEO Metadata
Generated in `generateMetadata()` via `SeoQuery` (Rank Math SEO data via WPGraphQL) → `setSeoData()` utility

## Versioning
- **Root monorepo**: Calendar versioning (YYYY.MM.MICRO) - tracks deployment dates
- **Frontend/WordPress**: Semantic versioning (major.minor.patch) - tracks feature changes

## Troubleshooting

**Build fails with GraphQL errors**: Verify `NEXT_PUBLIC_WORDPRESS_API_URL` is set and WordPress is accessible
**Preview not working**: Check JWT auth credentials and WordPress JWT Authentication plugin activation
**Styles missing**: Ensure `theme.json` color palette matches Tailwind config, run codegen
**Template parts not rendering**: Run `fetch-wp-template-structure` to update cached data
