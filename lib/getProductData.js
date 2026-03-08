import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const PRODUCT_DATA_PATH = path.join(process.cwd(), 'lib/productData.json');

export async function getProductData() {
  try {
    // 1. Try to fetch from Firebase first
    const docRef = doc(db, 'settings', 'productData');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().products || [];
    }

    // 2. Fallback to local JSON file if Firebase doc doesn't exist yet
    if (fs.existsSync(PRODUCT_DATA_PATH)) {
      const fileContent = fs.readFileSync(PRODUCT_DATA_PATH, 'utf8');
      const data = JSON.parse(fileContent);
      return data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching product data:", error);
    // If Firebase fails (e.g. during build or missing config), fallback to local JSON
    if (fs.existsSync(PRODUCT_DATA_PATH)) {
      const fileContent = fs.readFileSync(PRODUCT_DATA_PATH, 'utf8');
      return JSON.parse(fileContent);
    }
    return [];
  }
}
