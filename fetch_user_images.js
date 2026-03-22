const https = require('https');
const fs = require('fs');

const urls = [
  "https://www.govtech.com/biz/data/led-streetlight-replacement-projects-show-huge-savings",
  "https://www.mercomindia.com/daily-news-rajasthan-led-solar-open-access",
  "https://ledrhythm.com/categories/led-post-top-lights"
];

async function fetchImage(pageUrl, index) {
  return new Promise((resolve) => {
    https.get(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        let match = data.match(/<meta[^>]*property=['"]og:image['"][^>]*content=['"](.*?)['"]/i) ||
                    data.match(/<meta[^>]*content=['"](.*?)['"][^>]*property=['"]og:image['"]/i) ||
                    data.match(/<meta[^>]*name=['"]twitter:image['"][^>]*content=['"](.*?)['"]/i);
        
        let imgUrl = match ? match[1] : null;

        if (!imgUrl && index === 2) {
          // fallback for ledrhythm.com
          let imgMatch = data.match(/<img[^>]*src=['"](.*?post-top.*?\.(?:jpg|png|webp))['"]/i) ||
                         data.match(/<img[^>]*src=['"](.*?post-top.*?)['"]/i);
          if (imgMatch) {
            imgUrl = imgMatch[1];
            if (imgUrl.startsWith('/')) {
              imgUrl = 'https://ledrhythm.com' + imgUrl;
            }
          }
        }
        
        if(imgUrl) {
           console.log(`URL ${index+1}: Found image ${imgUrl}`);
           // Download it
           try {
             const r = await fetch(imgUrl);
             const buffer = await r.arrayBuffer();
             fs.writeFileSync(`public/slider/user-req-${index+1}.jpg`, Buffer.from(buffer));
             console.log(`URL ${index+1}: Saved to slider/user-req-${index+1}.jpg`);
           } catch(e) { console.error(`Error downloading ${imgUrl}`); }
        } else {
           console.log(`URL ${index+1}: No image found in metatags.`);
        }
        resolve();
      });
    }).on('error', () => resolve());
  });
}

async function run() {
  for (let i=0; i<urls.length; i++) {
    await fetchImage(urls[i], i);
  }
}
run();
