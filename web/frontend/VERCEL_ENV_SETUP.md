# Vercel Environment Variables Setup

These environment variables must be configured in your Vercel project dashboard.

## Required Environment Variables

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

### WordPress API Configuration

```bash
NEXT_PUBLIC_BASE_URL=https://wonderjarcreative.com
NEXT_PUBLIC_WORDPRESS_API_URL=https://cms.wonderjarcreative.com
NEXT_PUBLIC_WORDPRESS_API_HOSTNAME=cms.wonderjarcreative.com
HEADLESS_SECRET=rfh8cax@MGC5vzefeoijrurusz34e
WP_USER=frontendUser
WP_APP_PASS=cNt(cv3G&2nYY1CIGO1nPr0O
WP_THEME=wonderjarcreative-backend
```

### Gravity Forms API Credentials

```bash
GRAVITY_FORMS_CONSUMER_KEY=ck_c53496e6c47738b7073cf46e5aa58750c44cbf5b
GRAVITY_FORMS_CONSUMER_SECRET=cs_3e050b62b003b7f9ad6f2be662cea664554e1c5f
```

### Revalidation Configuration

```bash
TEMPLATE_PART_REVALIDATE=300
```

### WordPress GraphQL Endpoint

```bash
WORDPRESS_URL=https://cms.wonderjarcreative.com/graphql
```

### ISR Revalidation Secret

```bash
REVALIDATE_SECRET_KEY=your-revalidate-secret-key
```

## Important Notes

1. **DO NOT** set `NODE_TLS_REJECT_UNAUTHORIZED` in production
2. All variables should be set for **Production** environment
3. Optionally set for **Preview** environment if needed
4. These match the values in `.env.production.local`

## After Adding Variables

1. Redeploy your application in Vercel
2. Check deployment logs for any missing variables
3. Test the live site for CORS and API access

## Troubleshooting

### 401 Errors on Gravity Forms
- Verify `GRAVITY_FORMS_CONSUMER_KEY` and `GRAVITY_FORMS_CONSUMER_SECRET` are set
- Check WordPress → Gravity Forms → Settings → REST API for correct keys

### CORS Errors
- Ensure WordPress theme has CORS headers configured
- Verify domain is allowed in WordPress CORS settings
- Check browser console for specific CORS error messages

### GraphQL 500 Errors
- Verify `WORDPRESS_URL` ends with `/graphql`
- Check WPGraphQL plugin is activated
- Increase PHP memory limit if needed
