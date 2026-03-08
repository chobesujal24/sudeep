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

// POST to update the entire products array
export async function POST(req) {
  try {
    const products = await req.json();
    
    // Save to Firebase Firestore
    const docRef = doc(db, 'settings', 'productData');
    await setDoc(docRef, { products }, { merge: true });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
