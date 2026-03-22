const fs = require('fs');
const https = require('https');
https.get('https://ledrhythm.com/categories/led-post-top-lights', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
}, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    fs.writeFileSync('ledrhythm.html', data);
    console.log("HTML saved. Grepping for images...");
    const matches = data.match(/<img[^>]+src=["']([^"']+)["']/g);
    if(matches) {
       matches.forEach(m => console.log(m));
    }
    const bgMatches = data.match(/background-image:\s*url\(['"]?([^'"\)]+)['"]?\)/g);
    if(bgMatches) {
       bgMatches.forEach(m => console.log(m));
    }
  });
}).on('error', console.error);
