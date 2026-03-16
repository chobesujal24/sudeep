import { NextResponse } from 'next/server';
import { getProductData } from '@/lib/getProductData';

export const dynamic = 'force-dynamic';

// GET all products
export async function GET() {
  try {
    const data = await getProductData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
