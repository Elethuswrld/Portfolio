// optimize-images.js
// Optimizes images in assets/images and assets/certificates (WebP + compression)
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDirs = [
  'assets/images',
  'assets/certificates',
];

const exts = ['.jpg', '.jpeg', '.png'];

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, ext);
  const webpPath = path.join(dir, base + '.webp');

  // Convert to WebP
  await sharp(filePath)
    .webp({ quality: 80 })
    .toFile(webpPath);

  // Compress original (overwrite)
  if (ext === '.jpg' || ext === '.jpeg') {
    await sharp(filePath)
      .jpeg({ quality: 80 })
      .toFile(filePath + '.tmp');
    fs.renameSync(filePath + '.tmp', filePath);
  } else if (ext === '.png') {
    await sharp(filePath)
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(filePath + '.tmp');
    fs.renameSync(filePath + '.tmp', filePath);
  }
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walkDir(p, callback);
    else callback(p);
  });
}

(async () => {
  for (const dir of imageDirs) {
    if (!fs.existsSync(dir)) continue;
    walkDir(dir, file => {
      if (exts.includes(path.extname(file).toLowerCase())) {
        optimizeImage(file).catch(console.error);
      }
    });
  }
})();
