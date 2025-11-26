# Wonderjar Creative - Project Changelog

All notable project-level changes and releases will be documented in this file.

For component-specific changes, see:
- [Frontend Changelog](./web/frontend/CHANGELOG.md)
- [WordPress Backend Changelog](./web/wordpress/CHANGELOG.md)

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Calendar Versioning](https://calver.org/) (YYYY.MM.MICRO).

## [Unreleased]

## [2025.11.10] - 2025-11-25

### WordPress Theme (v1.3.1)
- Changed `style.layout.wideSize` width to 1280px.

### Frontend (v1.3.0)
- Added `AnimatedBorder` effect into wp:heading component.
- Changed `--wide` css variable width.
- Increased `.dot-pattern` .background-image opacity to 0.2.

## [2025.11.9] - 2025-11-25

### Frontend (v1.2.0)
- Refactored home page patterns into reusable components
- Fixed block styling issues
- Fixed stylesCollector async timing issue for nested blocks inside patterns
- Added `renderPostContent` utility to replace PostContent component
- Added support for `layout.contentSize` CSS generation
- Fixed SVG image rendering in Next.js Image component
- Added Tailwind v4 source scanning for data/*.json pattern files

### WordPress Theme (v1.3.0)
- New `services.php` pattern with alternating text/image layout
- New `why-wonderjar.php` pattern with accordion-style benefits
- Extracted sections from `home.php` into dedicated reusable patterns
- Reduced supporting image sizes from 400px to 300px for better visual balance
- Updated pattern URLs from local dev to production

## [2025.11.8] - 2025-11-25

### WordPress Theme (v1.2.3)
- Converted hero patterns (`hero-home`, `hero-about`, `hero-contact`) to be text only. Removed graphics.

## [2025.11.7] - 2025-11-24

### Frontend (v1.1.1)
- BlastOffImage effect now loops continuously for rocket, smoke, fire, and sparkles animations.

## [2025.11.6] - 2025-11-24

### WordPress Theme (v1.2.2)
- Changed allowed domains in `add_cors_headers()` to allow `cms` subdomain as well as `http://localhost:3000`.

## [2025.11.5] - 2025-11-24

### WordPress Theme (v1.2.1)
- Updated `footer` pattern to use correct production domain for privacy link.

## [2025.11.4] - 2025-11-24

### Frontend (v1.1.0)
- Added `dot-pattern` utility class for subtle white dot grid overlay effect
- CSS override for `wp-block-cover` to apply pattern to background overlay

### WordPress Theme (v1.2.0)
- Updated hero patterns to use `dot-pattern` class on teal backgrounds

## [2025.11.3] - 2025-11-24

### Frontend (v1.0.2)
- Hotfix: Fixed BlastOffImage animation clipping issue on frontend
- Fixed BlastOffImage component clipping rocket during animation by adding `overflow: visible` to SVG and outer containers

## [2025.11.2] - 2025-11-24

### Frontend (v1.0.1)
- Hotfix: Fixed Tailwind v4 gradient utilities on frontend
- Fixed gradient utilities not working with Tailwind CSS v4
- Corrected gradient configuration using `@theme` block and `@source` directives
- Removed unused `backgroundImage` from tailwind.config.ts

## [2025.11.1] - 2025-11-24

### Frontend (v1.0.0) 🎉
- First production release
- Migrated from Yoast SEO to Rank Math SEO for improved SEO capabilities
- Added gradient utilities to Tailwind config for design consistency
- Enhanced build system with proper environment handling

### WordPress (v1.1.0)
- Added 5 gradient presets to theme.json (tech, warm, subtle, radial glows)
- Created reusable hero patterns with gradient backgrounds
- Refactored home, about, and contact pages to use modular hero components
- Updated plugin requirements (Rank Math SEO + WPGraphQL for Rank Math)

### Infrastructure
- Production environment validated with Rank Math SEO integration
- GraphQL schema successfully regenerated with new SEO fields
- All builds passing with updated type system

## [2025.11.0] - 2025-11-21

### Frontend
- Initial release of the Wonderjar Creative headless WordPress website with Next.js frontend
- Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: WordPress with custom block theme, GraphQL API
- **Integration**: Headless architecture with WordPress as CMS
- **Blocks**: Full WordPress block support with custom renderers
- **Effects**: Custom animation components (BlastOff, JumpingText, AnimatedBorder)
- **Forms**: Gravity Forms integration via REST API
- **Content**: Home, About, and Contact pages with custom patterns

### Infrastructure
- **Frontend Hosting**: Vercel (production), localhost:3000 (dev)
- **Backend Hosting**: AWS Lightsail at cms.wonderjarcreative.com
- **Domain**: wonderjarcreative.com

### Documentation
- Environment variable setup documented
- Development workflow established
- Build and deployment process defined

---

## Release Process

### Versioning
- **Root**: Calendar Versioning (YYYY.MM.MICRO) - tracks deployment dates
- **Frontend**: Semantic Versioning - tracks code changes (major.minor.patch)
- **WordPress**: Semantic Versioning - tracks theme changes (major.minor.patch)

### When to Release
- **New Month (YYYY.MM.0)**: First deployment of the month
- **Patch (YYYY.MM.X)**: Additional deployments within the same month

### Steps
1. Update component changelogs (frontend/wordpress)
2. Update this root changelog with summary
3. Create git tag: `git tag -a v2024.11.0 -m "Release v2024.11.0"`
4. Push tag: `git push origin v2024.11.0`
5. Deploy to production
