const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Load environment-specific .env file
const NODE_ENV = process.env.NODE_ENV || 'development';
const envFiles = [
  `.env.${NODE_ENV}.local`,
  '.env.local',
  `.env.${NODE_ENV}`,
  '.env'
];

// Load the first env file that exists
for (const envFile of envFiles) {
  const envPath = path.join(__dirname, '..', envFile);
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
    console.log(`Loaded env from: ${envFile}`);
    break;
  }
}

const WP_API = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8000';

const outDir = path.join(__dirname, '../data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

(async () => {
  try {
    // Fetch all template structures in one request
    const url = `${WP_API}/wp-json/template-structure/v1/full`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    
    const data = await res.json();

    // Save each type to separate files
    for (const [type, items] of Object.entries(data)) {
      for (const [slug, itemData] of Object.entries(items)) {
        const filename = `${type}.${slug}.json`;
        fs.writeFileSync(path.join(outDir, filename), JSON.stringify(itemData, null, 2));
        console.log(`Saved: ${filename}`);
      }
    }

    console.log('Done!');
  } catch (error) {
    console.error('Error:', error.message);
  }
})();