import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(__dirname, 'server', 'assets', 'forvis-mazars-logo.jpg');

console.log('Logo path:', logoPath);
console.log('File exists:', fs.existsSync(logoPath));

if (fs.existsSync(logoPath)) {
  const stats = fs.statSync(logoPath);
  console.log('File size:', stats.size, 'bytes');
  
  const logoBuffer = fs.readFileSync(logoPath);
  const base64 = logoBuffer.toString('base64');
  const dataURI = `data:image/jpeg;base64,${base64}`;
  
  console.log('Base64 length:', base64.length);
  console.log('Data URI length:', dataURI.length);
  console.log('First 100 chars:', dataURI.substring(0, 100));
}
