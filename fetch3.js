const https = require('https');
const req = https.get('https://ledrhythm.com/categories/led-post-top-lights', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    let matches = data.match(/https:\/\/[^"']*\.(?:jpg|png|webp)/ig);
    if(matches) {
       let postTop = matches.filter(m => m.toLowerCase().includes('post') || m.toLowerCase().includes('top') || m.toLowerCase().includes('led'));
       console.log("Filtered Matches:", [...new Set(postTop)].slice(0, 5));
    }
  });
});
req.on('error', console.error);
