import { NextResponse } from 'next/server';
import { getProductData } from '@/lib/getProductData';

// GET all products
export async function GET() {
  try {
    const data = await getProductData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
