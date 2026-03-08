import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PRODUCT_DATA_PATH = path.join(process.cwd(), 'lib/productData.json');

// GET all products
export async function GET() {
  try {
    const fileContent = fs.readFileSync(PRODUCT_DATA_PATH, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST to update the entire products array
export async function POST(req) {
  try {
    const products = await req.json();
    fs.writeFileSync(PRODUCT_DATA_PATH, JSON.stringify(products, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
