# Wonderjar Creative - Project Changelog

All notable project-level changes and releases will be documented in this file.

For component-specific changes, see:
- [Frontend Changelog](./web/frontend/CHANGELOG.md)
- [WordPress Backend Changelog](./web/wordpress/CHANGELOG.md)

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Project-wide
- Prepared for Vercel deployment (frontend)
- Production WordPress deployment on AWS Lightsail
- Environment configuration for development and production

## [0.1.0] - 2025-11-21

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

### When to Release
- **Major (1.0.0)**: Complete redesign, breaking API changes
- **Minor (0.X.0)**: New features, pages, or significant improvements
- **Patch (0.0.X)**: Bug fixes, small improvements

### Steps
1. Update component changelogs (frontend/wordpress)
2. Update this root changelog with summary
3. Create git tag: `git tag -a v0.1.0 -m "Release v0.1.0"`
4. Push tag: `git push origin v0.1.0`
5. Deploy to production
