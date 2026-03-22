const https = require('https');
https.get('https://ledrhythm.com/wp-json/wp/v2/media?search=post&per_page=10', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    try {
      const media = JSON.parse(data);
      const urls = media.map(m => m.source_url).filter(u => u && (u.includes('post') || u.includes('top')));
      console.log("Found Media URLs:", urls);
    } catch(e) {
      console.error("WP-JSON Error:", e.message);
    }
  });
});
