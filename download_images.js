const fs = require('fs');

async function downloadImages() {
  const images = [
    { path: 'public/slider/street-lamp-1.jpg', url: 'https://images.unsplash.com/photo-1542382156909-92be44cead9e?w=1600&q=80' },
    { path: 'public/slider/street-lamp-2.jpg', url: 'https://images.unsplash.com/photo-1510618037672-13eb51817cdd?w=1600&q=80' },
    { path: 'public/slider/highmast-stadium.jpg', url: 'https://images.unsplash.com/photo-1502920514313-52581002a659?w=1600&q=80' },
    { path: 'public/slider/solar-field.jpg', url: 'https://images.unsplash.com/photo-1592833159057-6dd15ab67e10?w=1600&q=80' }
  ];

  fs.mkdirSync('public/slider', { recursive: true });

  for (let img of images) {
    try {
      console.log(`Downloading ${img.path}...`);
      const res = await fetch(img.url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(img.path, Buffer.from(buffer));
        console.log(`✅ Saved ${img.path}`);
      } else {
        console.error(`❌ Failed to download ${img.url}: ${res.statusText}`);
      }
    } catch (err) {
      console.error(`❌ Fetch error for ${img.path}:`, err.message);
    }
  }
}

downloadImages();
