# CORS Configuration for WordPress Uploads

## Problem
SVG and other media files uploaded to WordPress are served as static files by the web server (Apache/Nginx), not through WordPress/PHP. This means CORS headers need to be set at the web server level.

## Solution
The `.htaccess` file in this directory adds CORS headers to all uploaded files, allowing your Next.js frontend to load images, SVGs, and other media.

## Setup Instructions

### For Apache (AWS Lightsail with Bitnami)

1. **Upload this `.htaccess` file** to your WordPress uploads directory on the server:
   ```bash
   # SSH into your server
   ssh -i your-key.pem bitnami@your-server-ip
   
   # Navigate to uploads directory
   cd /opt/bitnami/wordpress/wp-content/uploads/
   
   # Upload the .htaccess file (or create it)
   sudo nano .htaccess
   # Paste the contents from this file
   
   # Set proper permissions
   sudo chown daemon:daemon .htaccess
   sudo chmod 644 .htaccess
   ```

2. **Verify Apache has mod_headers enabled**:
   ```bash
   sudo apachectl -M | grep headers
   ```
   
   If not enabled, enable it:
   ```bash
   sudo a2enmod headers
   sudo /opt/bitnami/ctlscript.sh restart apache
   ```

3. **Test the CORS headers**:
   ```bash
   curl -I -H "Origin: https://www.wonderjarcreative.com" \
     https://cms.wonderjarcreative.com/wp-content/uploads/2025/11/lets-start.svg
   ```
   
   You should see: `Access-Control-Allow-Origin: https://www.wonderjarcreative.com`

### For Nginx

If your server uses Nginx instead of Apache, add this to your site configuration:

```nginx
location ~* ^/wp-content/uploads/.*\.(svg|jpg|jpeg|png|gif|webp)$ {
    add_header Access-Control-Allow-Origin $http_origin always;
    add_header Access-Control-Allow-Methods "GET" always;
    add_header Access-Control-Allow-Credentials "true" always;
}
```

Then reload Nginx:
```bash
sudo systemctl reload nginx
```

## Allowed Origins

The configuration allows requests from:
- `https://www.wonderjarcreative.com`
- `https://wonderjarcreative.com`
- `http://localhost:3000` (development)
- `https://*.vercel.app` (preview deployments)

## Troubleshooting

**CORS still blocked?**
1. Check if `.htaccess` is in the correct location: `/wp-content/uploads/`
2. Verify Apache has mod_headers enabled
3. Clear your browser cache
4. Check server error logs: `sudo tail -f /opt/bitnami/apache/logs/error_log`

**Alternative: Server-level configuration**
If `.htaccess` doesn't work, you may need to add CORS headers in your Apache VirtualHost or Nginx site config at the server level.
