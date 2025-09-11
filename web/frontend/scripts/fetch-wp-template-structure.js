const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

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