const fs = require('fs');
const path = require('path');

const productDataFile = path.join(__dirname, 'lib', 'productData.js');
let content = fs.readFileSync(productDataFile, 'utf8');

const regex = /slug:\s*["']([^"']+)["'][\s\S]*?images:\s*\[([\s\S]*?)\]/g;

content = content.replace(regex, (match, slug, oldArray) => {
  const folderPath = path.join(__dirname, 'public', 'products', slug);
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath);
    const validImages = files.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f)).map(f => `/products/${slug}/${f}`);
    if (validImages.length > 0) {
      const newArrayStr = validImages.map(img => `\n      "${img}"`).join(',') + '\n    ';
      return match.replace(oldArray, newArrayStr);
    }
  }
  return match;
});

fs.writeFileSync(productDataFile, content);
console.log('Successfully synced productData.js with actual physical images.');
