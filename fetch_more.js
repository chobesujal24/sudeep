const fs = require('fs');
async function getMore() {
  const url1 = `https://loremflickr.com/1600/900/highway,streetlight/all?random=1`;
  const url2 = `https://loremflickr.com/1600/900/posttop,led/all?random=2`;

  let r1 = await fetch(url1);
  if(r1.ok) fs.writeFileSync('public/slider/highwaylight.jpg', Buffer.from(await r1.arrayBuffer()));

  let r2 = await fetch(url2);
  if(r2.ok) fs.writeFileSync('public/slider/posttop.jpg', Buffer.from(await r2.arrayBuffer()));
}
getMore();
