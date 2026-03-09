import { supabase } from './supabase.js';
import fs from 'fs';
import path from 'path';

const PRODUCT_DATA_PATH = path.join(process.cwd(), 'lib/productData.json');

export async function getProductData() {
  let products = [];

  try {
    // 1. Guard: If Supabase env config doesn't exist (e.g., during build), instantly fallback to local JSON
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      if (fs.existsSync(PRODUCT_DATA_PATH)) {
        const fileContent = fs.readFileSync(PRODUCT_DATA_PATH, 'utf8');
        const data = JSON.parse(fileContent);
        products = Array.isArray(data) ? data : (data.products || []);
      }
      return products;
    }

    // 2. Try to fetch from Supabase
    const { data: dbData, error } = await supabase
      .from('settings')
      .select('data')
      .eq('id', 'productData')
      .single();

    if (dbData && dbData.data && dbData.data.products) {
      products = Array.isArray(dbData.data.products) ? dbData.data.products : [];
    } else {
      // 3. Row doesn't exist in Supabase yet, use local fallback
      if (fs.existsSync(PRODUCT_DATA_PATH)) {
        const fileContent = fs.readFileSync(PRODUCT_DATA_PATH, 'utf8');
        const data = JSON.parse(fileContent);
        products = Array.isArray(data) ? data : (data.products || []);
      }
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
    // 4. Final safety fallback to local JSON on any error
    if (fs.existsSync(PRODUCT_DATA_PATH)) {
      try {
        const fileContent = fs.readFileSync(PRODUCT_DATA_PATH, 'utf8');
        const data = JSON.parse(fileContent);
        products = Array.isArray(data) ? data : (data.products || []);
      } catch (parseError) {
        console.error("JSON Parse Error during fallback:", parseError);
      }
    }
  }

  return Array.isArray(products) ? products : [];
}

