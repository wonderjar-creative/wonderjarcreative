# WonderJar Creative - WordPress Backend Theme

Custom WordPress block theme for the WonderJar Creative headless website.

## Overview

This is a modern WordPress block theme that serves as a headless CMS for the Next.js frontend. It provides a GraphQL API and custom REST endpoints for content delivery.

## Theme Information

- **Theme Name**: WonderJar Creative Backend
- **Version**: 1.3.1
- **Description**: Headless WordPress theme with custom blocks and patterns
- **Author**: wjmatt
- **License**: Proprietary

## Features

### Block Patterns
- **Home**: Hero section with animated elements
- **About**: Team introduction with accordion
- **Contact**: Contact form with Gravity Forms integration
- **Header**: Multiple header variations (default, absolute, sticky)
- **Footer**: Site footer with navigation and branding

### Template Parts
- Header (default, absolute positioning, sticky)
- Footer

### Page Templates
- Home page template
- Default page template
- Single post template
- Page without title
- Page with absolute header

### Custom Functionality
- **REST API Extensions**: Template structure endpoint for Next.js
- **CORS Headers**: Configured for Vercel and production domains
- **GraphQL API**: WPGraphQL integration for headless architecture
- **SVG Support**: Allowed SVG uploads in media library
- **Block Editor**: Full block editor support with custom patterns

## Installation

### Requirements
- PHP >= 7.4
- WordPress >= 6.0
- Composer

### Setup

1. **Upload theme to WordPress**:
   ```bash
   # Via SFTP/FTP to:
   /wp-content/themes/wonderjarcreative-backend/
   ```

2. **Install dependencies**:
   ```bash
   cd wp-content/themes/wonderjarcreative-backend
   composer install --no-dev
   ```

3. **Activate theme**:
   - Go to WordPress Admin → Appearance → Themes
   - Activate "WonderJar Creative Backend"

4. **Install required plugins**:
   - WPGraphQL
   - Gravity Forms
   - Gravity Forms REST API (add-on)

### Plugin Configuration

#### WPGraphQL
- Install and activate WPGraphQL
- No additional configuration needed

#### Gravity Forms
1. Create forms for contact page
2. Go to Forms → Settings → REST API
3. Generate REST API keys for frontend

## Theme Structure

```
wonderjarcreative-backend/
├── inc/
│   ├── Base/              # Base classes
│   ├── Features/          # Feature modules
│   │   └── RestFeature.php  # REST API extensions
│   ├── Loader.php         # Hook loader
│   ├── Theme.php          # Main theme class
│   └── I18n.php          # Internationalization
├── parts/
│   ├── header.html        # Default header
│   ├── header-absolute.html
│   ├── header-sticky.html
│   └── footer.html
├── patterns/
│   ├── home.php           # Homepage pattern
│   ├── about.php          # About page pattern
│   ├── contact.php        # Contact page pattern
│   ├── header.php         # Header patterns
│   └── footer.php         # Footer pattern
├── templates/
│   ├── index.html         # Default template
│   ├── page-home.html     # Homepage template
│   ├── page.html          # Page template
│   └── single.html        # Single post template
├── vendor/                # Composer dependencies
├── composer.json
├── functions.php          # Theme initialization
├── style.css              # Theme stylesheet (required)
└── theme.json            # Block editor configuration
```

## Development

### Modifying Patterns

Block patterns are in `/patterns/` directory. Each pattern is a PHP file that registers itself:

```php
<?php
/**
 * Title: Pattern Name
 * Slug: wonderjarcreative-backend/pattern-slug
 * Categories: text, featured
 */
?>
<!-- wp:group {...} -->
<!-- Pattern content -->
<!-- /wp:group -->
```

### Adding Custom REST Endpoints

Add new endpoints in `inc/Features/RestFeature.php`:

```php
$this->loader->add_action( 'rest_api_init', $this, 'register_custom_endpoint' );
```

### CORS Configuration

CORS headers are configured in `inc/Theme.php` to allow:
- Production domain: `wonderjarcreative.com`
- Preview domains: `*.vercel.app`

To add additional domains, modify the `add_cors_headers()` method.

## Deployment

### Production (AWS Lightsail)

1. **Upload theme files** via SFTP:
   ```bash
   sftp user@cms.wonderjarcreative.com
   put -r wonderjarcreative-backend /var/www/html/wp-content/themes/
   ```

2. **Run Composer**:
   ```bash
   ssh user@cms.wonderjarcreative.com
   cd /var/www/html/wp-content/themes/wonderjarcreative-backend
   composer install --no-dev --optimize-autoloader
   ```

3. **Set permissions**:
   ```bash
   chown -R www-data:www-data wonderjarcreative-backend
   ```

4. **Activate in WordPress Admin**

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.

## Support

For issues or questions, contact: matt@wonderjarcreative.com

## License

Proprietary - WonderJar Creative
