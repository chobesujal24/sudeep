import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('public');

// Recursively find all .png and .jpg files
function findImages(dir, exts = ['.png', '.jpg', '.jpeg']) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findImages(fullPath, exts));
    } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

// Skip logo.png (too small to matter, and used as favicon/schema reference)
const SKIP = ['logo.png'];

async function convert() {
  const images = findImages(PUBLIC_DIR);
  let totalSaved = 0;

  for (const imgPath of images) {
    const basename = path.basename(imgPath);
    if (SKIP.includes(basename)) {
      console.log(`⏩ SKIP ${basename}`);
      continue;
    }

    const ext = path.extname(imgPath);
    const webpPath = imgPath.replace(ext, '.webp');
    const originalSize = fs.statSync(imgPath).size;

    try {
      // Convert to WebP with quality 80 (good balance of quality/size)
      await sharp(imgPath)
        .webp({ quality: 80 })
        .toFile(webpPath);

      const newSize = fs.statSync(webpPath).size;
      const saved = originalSize - newSize;
      const pct = ((saved / originalSize) * 100).toFixed(1);
      totalSaved += saved;

      console.log(`✅ ${basename} → ${path.basename(webpPath)} | ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${pct}% smaller)`);

      // Delete original after successful conversion
      fs.unlinkSync(imgPath);
    } catch (err) {
      console.error(`❌ Failed: ${basename} — ${err.message}`);
    }
  }

  console.log(`\n🎉 Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

convert();
