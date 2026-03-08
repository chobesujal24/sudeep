const Jimp = require('jimp');

async function removeBlueBg(inputPath, outputPath) {
  try {
    const image = await Jimp.read(inputPath);
    
    // Iterate over all pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If the pixel is predominantly blue (adjust these thresholds based on the exact shade)
      if (blue > 120 && red < 100 && green < 150) {
        // Set alpha channel to 0 for transparency
        this.bitmap.data[idx + 3] = 0; 
      }
    });

    await image.writeAsync(outputPath);
    console.log("Background removed and image saved to", outputPath);
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (inputPath && outputPath) {
  removeBlueBg(inputPath, outputPath);
} else {
  console.log("Usage: node remove_bg_node.js <input> <output>");
}
