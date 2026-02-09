import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(__dirname, 'server', 'assets', 'forvis-mazars-logo.jpg');
const logoBuffer = fs.readFileSync(logoPath);
const base64Logo = logoBuffer.toString('base64');

console.log('Base64 encoded logo (first 100 chars):');
console.log(base64Logo.substring(0, 100) + '...');
console.log('\nFull length:', base64Logo.length, 'characters');
console.log('\nUse in HTML as:');
console.log(`<img src="data:image/jpeg;base64,${base64Logo.substring(0, 50)}..." alt="Forvis Mazars" />`);

// Save to a file for easy use
fs.writeFileSync(
  path.join(__dirname, 'server', 'assets', 'logo-base64.txt'),
  `data:image/jpeg;base64,${base64Logo}`
);

console.log('\n✅ Saved to server/assets/logo-base64.txt');
