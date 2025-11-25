#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Parse arguments
const [component, bumpType] = process.argv.slice(2);

if (!component || !bumpType) {
  console.error('❌ Error: Missing arguments');
  console.log('\nUsage: node scripts/version-bump.js <component> <type>');
  console.log('\nComponents:');
  console.log('  root      - Root package (CalVer: YYYY.MM.MICRO)');
  console.log('  frontend  - Frontend package (SemVer)');
  console.log('  theme     - WordPress theme (SemVer)');
  console.log('\nTypes:');
  console.log('  major     - Breaking changes (x.0.0)');
  console.log('  minor     - New features (0.x.0)');
  console.log('  patch     - Bug fixes (0.0.x)');
  console.log('\nExamples:');
  console.log('  npm run version:bump frontend minor');
  console.log('  npm run version:bump theme patch');
  console.log('  npm run version:bump root patch');
  process.exit(1);
}

// Validate component
const validComponents = ['root', 'frontend', 'theme'];
if (!validComponents.includes(component)) {
  console.error(`❌ Error: Invalid component "${component}"`);
  console.log(`Valid components: ${validComponents.join(', ')}`);
  process.exit(1);
}

// Validate bump type
const validTypes = ['major', 'minor', 'patch'];
if (!validTypes.includes(bumpType)) {
  console.error(`❌ Error: Invalid type "${bumpType}"`);
  console.log(`Valid types: ${validTypes.join(', ')}`);
  process.exit(1);
}

// Helper: Parse semantic version
function parseSemVer(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) throw new Error(`Invalid SemVer: ${version}`);
  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3]),
  };
}

// Helper: Parse CalVer (YYYY.MM.MICRO)
function parseCalVer(version) {
  const match = version.match(/^(\d{4})\.(\d{1,2})\.(\d+)$/);
  if (!match) throw new Error(`Invalid CalVer: ${version}`);
  return {
    year: parseInt(match[1]),
    month: parseInt(match[2]),
    micro: parseInt(match[3]),
  };
}

// Helper: Bump SemVer
function bumpSemVer(version, type) {
  const { major, minor, patch } = parseSemVer(version);

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`Invalid bump type: ${type}`);
  }
}

// Helper: Bump CalVer
function bumpCalVer(version, type) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const { year, month, micro } = parseCalVer(version);

  // If same year and month, increment micro
  if (year === currentYear && month === currentMonth) {
    return `${year}.${month}.${micro + 1}`;
  }

  // New month or year, reset to .0
  return `${currentYear}.${currentMonth}.0`;
}

// Component-specific logic
let filePath, currentVersion, newVersion;

switch (component) {
  case 'root': {
    filePath = path.join(__dirname, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    currentVersion = pkg.version;
    newVersion = bumpCalVer(currentVersion, bumpType);
    pkg.version = newVersion;
    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
    break;
  }

  case 'frontend': {
    filePath = path.join(__dirname, '..', 'web', 'frontend', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    currentVersion = pkg.version;
    newVersion = bumpSemVer(currentVersion, bumpType);
    pkg.version = newVersion;
    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
    break;
  }

  case 'theme': {
    filePath = path.join(__dirname, '..', 'web', 'wordpress', 'wp-content', 'themes', 'wonderjarcreative-backend', 'style.css');
    const content = fs.readFileSync(filePath, 'utf8');
    const versionMatch = content.match(/^Version: (.+)$/m);
    if (!versionMatch) throw new Error('Could not find Version in style.css');
    currentVersion = versionMatch[1];
    newVersion = bumpSemVer(currentVersion, bumpType);
    const newContent = content.replace(/^Version: .+$/m, `Version: ${newVersion}`);
    fs.writeFileSync(filePath, newContent);
    break;
  }
}

console.log(`✅ ${component.charAt(0).toUpperCase() + component.slice(1)} version bumped`);
console.log(`   ${currentVersion} → ${newVersion} (${bumpType})`);
