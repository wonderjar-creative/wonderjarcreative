# Wonderjar Creative Monorepo

Headless WordPress website with Next.js frontend.

## Structure

```
wonderjarcreative/
├── web/
│   ├── frontend/          # Next.js 15 App Router
│   └── wordpress/         # WordPress custom theme
├── package.json           # Root workspace config
└── CHANGELOG.md          # Project changelog
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install all dependencies (root + workspaces)
npm install
```

### Development

```bash
# Run frontend dev server
npm run dev
```

### Building

```bash
# Build frontend
npm run build
```

### Environment Setup

Copy environment files:

```bash
# Frontend
cp web/frontend/.env.example web/frontend/.env.development.local
```

See [Frontend README](./web/frontend/README.md) for detailed environment variable configuration.

## Workspaces

### Frontend (`web/frontend`)
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Port**: 3000

### WordPress (`web/wordpress`)
- **Theme**: wonderjarcreative-backend
- **Architecture**: Headless CMS
- **API**: GraphQL (WPGraphQL)
- **Deployment**: AWS Lightsail

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run build` | Build frontend |
| `npm run lint` | Lint frontend |
| `npm run clean` | Clean all build artifacts |
| `npm run format` | Format code with Prettier |

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set root directory to `web/frontend`
3. Configure environment variables in Vercel dashboard
4. Deploy from `main` branch

### WordPress (AWS Lightsail)
1. Deploy WordPress to Lightsail instance
2. Upload theme to `/wp-content/themes/wonderjarcreative-backend`
3. Configure domain: `cms.wonderjarcreative.com`

## Documentation

- [Frontend Documentation](./web/frontend/README.md)
- [Changelog](./CHANGELOG.md)
- [Frontend Changelog](./web/frontend/CHANGELOG.md)
- [WordPress Changelog](./web/wordpress/CHANGELOG.md)

## License

Proprietary - Wonderjar Creative

