const fs = require('fs');

async function downloadGuaranteedImages() {
  const targets = [
    { name: 'streetlight', query: 'streetlight,led' },
    { name: 'stadiumlight', query: 'stadium,lighting' },
    { name: 'solarpanel', query: 'solarpanels' },
    { name: 'factory', query: 'manufacturing,led' }
  ];

  fs.mkdirSync('public/slider', { recursive: true });

  for (let target of targets) {
    // LoremFlickr redirects to a real image. We follow the redirect inherently via fetch.
    const url = `https://loremflickr.com/1600/900/${target.query}/all?random=${Math.floor(Math.random()*10000)}`;
    console.log(`Fetching ${target.name}...`);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        const path = `public/slider/${target.name}.jpg`;
        fs.writeFileSync(path, Buffer.from(buffer));
        console.log(`✅ Downloaded and cached: ${path}`);
      } else {
        console.error(`❌ Failed: ${res.statusText}`);
      }
    } catch (e) {
      console.error(`❌ Network error for ${target.name}`);
    }
  }
}

downloadGuaranteedImages();
