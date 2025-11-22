# Changelog - WordPress Backend

All notable changes to the WordPress theme and backend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Migrated base styles from frontend `globals.css` to WordPress `theme.json` for unified color, spacing, and typography presets.
### [1.0.1] 2025-11-21

### Added
- CORS headers for Vercel and production domains
- Documentation: README.md with theme setup and usage

### Changed
- None

### Fixed
- CORS blocking Vercel preview and production domains

## [1.0.0] - 2025-11-21

### Added
- Custom theme: wonderjarcreative-backend
- Block patterns: home, about, contact, header, footer
- Template parts: header, footer, header-absolute, header-sticky
- Page templates: home, page, single, page-no-title
- REST API feature for template structure endpoint
- Composer autoloading for theme classes
- GraphQL integration via WPGraphQL
- Custom REST API endpoints
- Theme.json configuration
- Pattern library following design system
- SVG upload support

### Infrastructure
- Headless WordPress architecture
- Production deployment on AWS Lightsail
- Domain: cms.wonderjarcreative.com

---

## How to Update This Changelog

### When to Update
- Before each release
- After significant features or fixes
- When deploying to production

### Version Format (SemVer)
- **Major (X.0.0)**: Breaking changes to theme structure or API
- **Minor (1.X.0)**: New patterns, templates, or features
- **Patch (1.0.X)**: Bug fixes, small improvements

### Sections
- **Added**: New features, patterns, templates
- **Changed**: Updates to existing functionality
- **Deprecated**: Features to be removed
- **Removed**: Deleted features
- **Fixed**: Bug fixes
- **Security**: Security patches

