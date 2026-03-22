const fs = require('fs');

async function fetchWiki() {
  const pages = ['LED_street_light', 'Solar_street_light', 'High-mast_lighting'];
  fs.mkdirSync('public/slider', { recursive: true });

  for (let i=0; i<pages.length; i++) {
    const page = pages[i];
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${page}&prop=pageimages&piprop=original&format=json`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      const pageData = Object.values(json.query.pages)[0];
      if (pageData && pageData.original && pageData.original.source) {
        let imgUrl = pageData.original.source;
        // ensure we get jpg/png
        const imgRes = await fetch(imgUrl);
        const buffer = await imgRes.arrayBuffer();
        fs.writeFileSync(`public/slider/wiki-${page}.jpg`, Buffer.from(buffer));
        console.log(`✅ Saved ${page} -> wiki-${page}.jpg`);
      } else {
        console.log(`❌ No image for ${page}`);
      }
    } catch(e) {
      console.log("Error on", page, e.message);
    }
  }
}
fetchWiki();
