# Changelog - WordPress Backend

All notable changes to the WordPress theme and backend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.1] - 2025-11-25

### Changed
- Decreased `settings.layout.wideSize` in theme.json to 1280px.
- Increased `margin.bottom` of pattern heading in `services.php` and `why-wonderjar.php`.

## [1.3.0] - 2025-11-25

### Added
- New `services.php` pattern with alternating text/image layout for Web Development, Cloud Hosting, and Ongoing Support services
- New `why-wonderjar.php` pattern with accordion-style benefits section

### Changed
- Extracted services section from `home.php` into dedicated `services.php` pattern
- Extracted Why Wonderjar section from `home.php` into dedicated `why-wonderjar.php` pattern
- Reduced supporting image sizes from 400px to 300px for better visual balance
- Updated pattern image URLs from local dev to production (`cms.wonderjarcreative.com`)

## [1.2.3] - 2025-11-24

### Changed
- Converted hero patterns (`hero-home`, `hero-about`, `hero-contact`) to be text only.

### Removed
- Removed graphics from hero patterns (`hero-home`, `hero-about`, `hero-contact`).

## [1.2.2] - 2025-11-24

### Changed
- Added `https://cms.wonderjarcreative.com` and `http://localhost:3000` to allowed domains in `add_cors_headers()`.

## [1.2.1] - 2025-11-24

### Changed
- Changed footer privacy link to correct production domain.

## [1.2.0] - 2025-11-24

### Changed
- Updated hero patterns (`hero-home`, `hero-about`, `hero-contact`) to use `dot-pattern` class for subtle white dot grid overlay on teal backgrounds

## [1.1.0] - 2025-11-24

### Added
- **Gradients in theme.json**: 5 new gradient presets (`gradient-tech`, `gradient-warm`, `gradient-subtle`, `gradient-radial-teal`, `gradient-radial-coral`)
- **Hero patterns**: `hero-home.php`, `hero-about.php`, `hero-contact.php` with gradient backgrounds
- Reusable hero components for consistent page headers

### Changed
- **home.php**: Refactored to use `hero-home` pattern (tech gradient)
- **about.php**: Refactored to use `hero-about` pattern (warm gradient)
- **contact.php**: Refactored to use `hero-contact` pattern (subtle gradient with radial glow)
- Updated plugin requirements: Replaced Yoast SEO with Rank Math SEO + WPGraphQL for Rank Math

### Removed
- Inline hero Cover blocks from page patterns (replaced with reusable hero patterns)

## [1.0.2] - 2025-11-21

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

