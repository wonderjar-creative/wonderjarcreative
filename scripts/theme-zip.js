#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse arguments
const [mode] = process.argv.slice(2);

if (!mode) {
  console.error('❌ Error: Missing mode argument');
  console.log('\nUsage: node scripts/theme-zip.js <mode>');
  console.log('\nModes:');
  console.log('  dev   - Development build (includes dev dependencies)');
  console.log('  prod  - Production build (optimized, no dev dependencies)');
  console.log('\nExamples:');
  console.log('  npm run theme:zip dev');
  console.log('  npm run theme:zip prod');
  process.exit(1);
}

// Validate mode
const validModes = ['dev', 'prod'];
if (!validModes.includes(mode)) {
  console.error(`❌ Error: Invalid mode "${mode}"`);
  console.log(`Valid modes: ${validModes.join(', ')}`);
  process.exit(1);
}

// Paths
const themePath = path.join(__dirname, '..', 'web', 'wordpress', 'wp-content', 'themes', 'wonderjarcreative-backend');
const themesDir = path.join(__dirname, '..', 'web', 'wordpress', 'wp-content', 'themes');
const stylePath = path.join(themePath, 'style.css');

// Get theme version
const styleContent = fs.readFileSync(stylePath, 'utf8');
const versionMatch = styleContent.match(/^Version: (.+)$/m);
if (!versionMatch) {
  console.error('❌ Error: Could not find Version in style.css');
  process.exit(1);
}
const themeVersion = versionMatch[1];
const zipName = `wonderjarcreative-backend-${themeVersion}.zip`;
const zipPath = path.join(themesDir, zipName);

console.log(`📦 Building theme package: ${zipName}`);
console.log(`   Mode: ${mode === 'prod' ? 'Production' : 'Development'}`);
console.log('');

try {
  // Step 1: Composer install
  console.log('⚙️  Running composer install...');
  const composerCmd = mode === 'prod'
    ? 'composer install --no-dev --optimize-autoloader'
    : 'composer install';

  execSync(composerCmd, {
    cwd: themePath,
    stdio: 'inherit',
  });
  console.log('✅ Composer dependencies installed\n');

  // Step 2: Remove old zip if exists
  if (fs.existsSync(zipPath)) {
    console.log('🗑️  Removing old zip file...');
    fs.unlinkSync(zipPath);
  }

  // Step 3: Create zip
  console.log('📦 Creating zip archive...');
  const zipCmd = `zip -r "${zipName}" wonderjarcreative-backend -x "*.git*" -x "*node_modules*" -x "*.DS_Store" -x "*composer.json" -x "*composer.lock"`;

  execSync(zipCmd, {
    cwd: themesDir,
    stdio: 'pipe',
  });

  // Step 4: Verify zip was created
  if (!fs.existsSync(zipPath)) {
    throw new Error('Zip file was not created');
  }

  const stats = fs.statSync(zipPath);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log('✅ Zip archive created\n');
  console.log('📋 Summary:');
  console.log(`   File: ${zipPath}`);
  console.log(`   Size: ${fileSizeMB} MB`);
  console.log(`   Version: ${themeVersion}`);
  console.log(`   Mode: ${mode === 'prod' ? 'Production' : 'Development'}`);
  console.log('');
  console.log('✨ Theme package ready for deployment!');

} catch (error) {
  console.error('\n❌ Error creating theme package:');
  console.error(error.message);
  process.exit(1);
}
