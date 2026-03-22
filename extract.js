const fs = require('fs');
const html = fs.readFileSync('ledrhythm.html', 'utf8');
const regex = /https:\/\/[a-zA-Z0-9.\/-_]+\.(?:jpg|png|webp)/g;
const matches = [...new Set(html.match(regex))];
let filtered = matches.filter(url => !url.includes('logo') && !url.includes('flag') && !url.includes('icon'));
console.log("Found pure images:", filtered);
