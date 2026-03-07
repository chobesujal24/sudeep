import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PRODUCT_DATA_PATH = path.join(process.cwd(), 'lib/productData.js');

// GET all products
export async function GET() {
  try {
    // We import dynamically to avoid caching issues during admin edits
    const fileContent = fs.readFileSync(PRODUCT_DATA_PATH, 'utf8');
    
    // Evaluate the ES module export manually or use a regex to extract the array
    // Since we control lib/productData.js, we can parse it carefully.
    // For a robust admin panel editing a JS file, parsing AST or using a simpler JSON file is safer.
    // However, given the project bounds, we will extract the object string array:
    const match = fileContent.match(/export const productsData = (\[[\s\S]*?\]);/);
    
    if (match && match[1]) {
      // Very simple eval to convert JS object string to JSON
      // Note: In production with external input this is unsafe, but for local admin on static site it's acceptable contextually.
      let data = [];
      try {
        data = eval(match[1]);
      } catch (e) {
        console.error("Eval failed:", e);
      }
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: "Could not parse products variable" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST to update the entire products array
export async function POST(req) {
  try {
    const products = await req.json();
    
    // Read existing file to keep imports intact
    const fileContent = fs.readFileSync(PRODUCT_DATA_PATH, 'utf8');
    
    // Format the new products array to a Javascript string representation
    // We use JSON.stringify with null, 2 for formatting, but remove quotes around keys if desired (though string keys in JS are fine)
    const newArrayString = JSON.stringify(products, null, 2)
      // Clean up stringified nested JSX or specific JS properties if they existed, though productData appears to be pure data.
    
    const newContent = fileContent.replace(
      /export const productsData = \[[\s\S]*?\];/,
      `export const productsData = ${newArrayString};`
    );

    fs.writeFileSync(PRODUCT_DATA_PATH, newContent, 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
