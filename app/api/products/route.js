import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
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

// POST is intentionally removed.
// The Admin CMS now manages writes directly via the Firebase Client SDK to bypass Vercel serverless timeouts.
