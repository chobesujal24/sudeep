const fs = require('fs');

async function grabSolidImages() {
  const images = [
    { path: 'public/slider/solid-led-1.jpg', url: 'https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    { path: 'public/slider/solid-led-2.jpg', url: 'https://images.pexels.com/photos/3345512/pexels-photo-3345512.jpeg?auto=compress&cs=tinysrgb&w=1600' }
  ];

  for (let img of images) {
    try {
      const res = await fetch(img.url);
      if (res.ok) {
        fs.writeFileSync(img.path, Buffer.from(await res.arrayBuffer()));
        console.log("Saved", img.path);
      } else console.log("Failed", img.url);
    } catch(e) { console.log(e); }
  }
}
grabSolidImages();
