import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public');

const WIDTH = 1200;
const HEIGHT = 630;

// Dark blue theme matching #1D4ED8
const PRIMARY = '#1D4ED8';
const PRIMARY_DARK = '#1E40AF';
const BG_DARK = '#0F172A';
const BG_GRADIENT_END = '#1E293B';

// Create SVG for the OG image
const svgImage = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BG_DARK};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${BG_GRADIENT_END};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${PRIMARY};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${PRIMARY_DARK};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />

  <!-- Decorative circles -->
  <circle cx="1050" cy="120" r="200" fill="${PRIMARY}" opacity="0.08" />
  <circle cx="150" cy="530" r="150" fill="#7C3AED" opacity="0.06" />
  <circle cx="900" cy="500" r="100" fill="${PRIMARY}" opacity="0.05" />

  <!-- Top accent line -->
  <rect x="0" y="0" width="${WIDTH}" height="6" fill="url(#accent)" />

  <!-- Chart icon (bar chart) -->
  <g transform="translate(80, 160)">
    <rect x="0" y="80" width="20" height="50" rx="4" fill="${PRIMARY}" opacity="0.9"/>
    <rect x="28" y="50" width="20" height="80" rx="4" fill="${PRIMARY}" opacity="0.8"/>
    <rect x="56" y="20" width="20" height="110" rx="4" fill="${PRIMARY}" opacity="0.9"/>
    <rect x="84" y="60" width="20" height="70" rx="4" fill="${PRIMARY}" opacity="0.7"/>
    <!-- Trend line -->
    <line x1="10" y1="90" x2="94" y2="30" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  </g>

  <!-- Title -->
  <text x="210" y="210" font-family="Arial, sans-serif" font-size="56" font-weight="900" fill="white">
    DreamIT Statistics
  </text>

  <!-- Subtitle Korean -->
  <text x="210" y="270" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#94A3B8">
    &#xD1B5;&#xACC4;&#xD559; &#xD559;&#xC2B5; &#xD50C;&#xB7AB;&#xD3FC;
  </text>

  <!-- Divider -->
  <rect x="210" y="300" width="120" height="4" rx="2" fill="${PRIMARY}" />

  <!-- Description -->
  <text x="210" y="355" font-family="Arial, sans-serif" font-size="22" fill="#CBD5E1">
    &#xAE30;&#xC220;&#xD1B5;&#xACC4; | &#xD655;&#xB960;&#xB860; | &#xCD94;&#xB860;&#xD1B5;&#xACC4; | &#xAC00;&#xC124;&#xAC80;&#xC815;
  </text>
  <text x="210" y="390" font-family="Arial, sans-serif" font-size="22" fill="#CBD5E1">
    &#xD68C;&#xADC0;&#xBD84;&#xC11D; | &#xBD84;&#xC0B0;&#xBD84;&#xC11D; | &#xBE44;&#xBAA8;&#xC218;&#xD1B5;&#xACC4; | &#xBCA0;&#xC774;&#xC9C0;&#xC548;&#xD1B5;&#xACC4;
  </text>

  <!-- URL -->
  <text x="210" y="460" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="${PRIMARY}">
    statistics.dreamitbiz.com
  </text>

  <!-- Bottom bar -->
  <rect x="0" y="${HEIGHT - 60}" width="${WIDTH}" height="60" fill="${PRIMARY}" opacity="0.15" />
  <text x="80" y="${HEIGHT - 25}" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#94A3B8">
    DreamIT Biz &#xB4DC;&#xB9BC;&#xC544;&#xC774;&#xD2F0;
  </text>
  <text x="${WIDTH - 80}" y="${HEIGHT - 25}" font-family="Arial, sans-serif" font-size="16" fill="#64748B" text-anchor="end">
    8 Categories &#xB7; 48 Topics
  </text>
</svg>`;

async function generate() {
  try {
    await sharp(Buffer.from(svgImage))
      .png()
      .toFile(path.join(outDir, 'og-image.png'));
    console.log('OG image generated: public/og-image.png (1200x630)');
  } catch (err) {
    console.error('Failed to generate OG image:', err);
    process.exit(1);
  }
}

generate();
