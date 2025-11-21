# Wonderjar Creative - Project Changelog

All notable project-level changes and releases will be documented in this file.

For component-specific changes, see:
- [Frontend Changelog](./web/frontend/CHANGELOG.md)
- [WordPress Backend Changelog](./web/wordpress/CHANGELOG.md)

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Calendar Versioning](https://calver.org/) (YYYY.MM.MICRO).

## [Unreleased]

### Project-wide
- Prepared for Vercel deployment (frontend)
- Production WordPress deployment on AWS Lightsail
- Environment configuration for development and production

## [2024.11.0] - 2024-11-21

### Summary
Initial release of the Wonderjar Creative headless WordPress website with Next.js frontend.

### Features
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
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
