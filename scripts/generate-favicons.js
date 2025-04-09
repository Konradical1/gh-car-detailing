const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgPath = path.join(__dirname, '../public/gh-logo.svg');
const publicDir = path.join(__dirname, '../public');

// Read the SVG file
const svgBuffer = fs.readFileSync(svgPath);

// Generate favicon.ico (16x16, 32x32)
sharp(svgBuffer)
  .resize(32, 32)
  .toFile(path.join(publicDir, 'favicon.ico'))
  .then(() => console.log('Generated favicon.ico'))
  .catch(err => console.error('Error generating favicon.ico:', err));

// Generate icon-192x192.png
sharp(svgBuffer)
  .resize(192, 192)
  .png()
  .toFile(path.join(publicDir, 'icon-192x192.png'))
  .then(() => console.log('Generated icon-192x192.png'))
  .catch(err => console.error('Error generating icon-192x192.png:', err));

// Generate icon-384x384.png
sharp(svgBuffer)
  .resize(384, 384)
  .png()
  .toFile(path.join(publicDir, 'icon-384x384.png'))
  .then(() => console.log('Generated icon-384x384.png'))
  .catch(err => console.error('Error generating icon-384x384.png:', err));

// Generate icon-512x512.png
sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile(path.join(publicDir, 'icon-512x512.png'))
  .then(() => console.log('Generated icon-512x512.png'))
  .catch(err => console.error('Error generating icon-512x512.png:', err));

// Generate apple-icon.png
sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile(path.join(publicDir, 'apple-icon.png'))
  .then(() => console.log('Generated apple-icon.png'))
  .catch(err => console.error('Error generating apple-icon.png:', err)); 