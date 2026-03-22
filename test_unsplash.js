const https = require('https');

const queries = ['led street light', 'stadium lighting night'];

queries.forEach(query => {
  const options = {
    hostname: 'unsplash.com',
    path: `/napi/search/photos?page=1&query=${encodeURIComponent(query)}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  };

  https.get(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log(`--- ${query} ---`);
        data.results.slice(0, 3).forEach(r => {
          console.log(`Description: ${r.alt_description}`);
          console.log(`URL: ${r.urls.raw}&w=1600&fit=crop&q=80`);
        });
      } catch (e) { console.error("Error parsing API response"); }
    });
  });
});
