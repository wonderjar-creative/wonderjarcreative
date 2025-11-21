# Changelog - Frontend

All notable changes to the Next.js frontend application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Environment-specific configuration (`.env.development.local`, `.env.production.local`)
- GraphQL codegen with WordPress schema integration
- SVG proxy API route for CORS handling
- BlastOffImage effect component with rocket animation
- JumpingText effect for animated letter bouncing
- AnimatedBorder effect with scroll triggers
- Gravity Forms integration with REST API
- Core WordPress blocks: Separator, Details, Pattern, TemplatePart
- Effects directory for reusable animations
- ISR fetchers for templates, patterns, and template parts

### Changed
- Updated `getBlockComponents` to use named export instead of default
- Fixed function signatures to pass `blocksJSON` string and `featuredImage`
- Reorganized block components under `Blocks/Core/` directory
- Updated import paths for `getBlockComponents` across all components

### Fixed
- Import/export mismatches in Pattern, PostContent, renderPattern, renderTemplatePart
- Missing `key` prop in Group component
- Border object support in `blockStyles.ts` for individual sides
- Layout orientation vertical alignment logic
- Environment variable loading in codegen and fetch scripts

### Removed
- Legacy Logo, SiteHeader, and Navigation components (replaced with WordPress blocks)

## [0.1.0] - 2025-11-21

### Added
- Initial Next.js 15 setup with App Router
- WordPress headless integration via GraphQL
- Block-based rendering system
- TypeScript support with strict mode
- Tailwind CSS configuration
- Dynamic block component loading
- Template and pattern support
- Featured image handling
- SEO metadata integration

---

## How to Update This Changelog

### Categories
- **Added** - New features
- **Changed** - Changes to existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements

### Version Numbers
Follow [Semantic Versioning](https://semver.org/):
- **MAJOR** version (1.0.0) - Incompatible API changes
- **MINOR** version (0.1.0) - New functionality, backwards compatible
- **PATCH** version (0.0.1) - Bug fixes, backwards compatible

### Format
```markdown
## [Version] - YYYY-MM-DD

### Added
- Feature description (#PR-number)

### Fixed
- Bug fix description (#PR-number)
```
