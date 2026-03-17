import { supabase } from './supabase.js';
import fs from 'fs';
import path from 'path';

const PRODUCT_DATA_PATH = path.join(process.cwd(), 'lib/productData.json');

function transformUrls(obj) {
  if (!obj) return obj;
  if (typeof obj === 'string') {
    // 1. Replace Supabase storage URLs with custom CDN URL
    let transformed = obj.replace(
      /https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/public\/images\//g,
      'https://cdn.sudeepengineers.com/'
    );
    
    // 2. Transfrom relative paths (found in local fallback) to CDN URL
    if (transformed.startsWith('/products/') || transformed.startsWith('/catalogs/')) {
      transformed = 'https://cdn.sudeepengineers.com' + transformed;
    }
    
    return transformed;
  }
  if (Array.isArray(obj)) {
    return obj.map(transformUrls);
  }
  if (typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = transformUrls(obj[key]);
    }
    return newObj;
  }
  return obj;
}

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
      return transformUrls(products);
    }

    // 2. Try to fetch from Supabase
    const { data: dbData, error } = await supabase
      .from('settings')
      .select('data')
      .eq('id', 'productData')
      .single();

    if (dbData && dbData.data && Array.isArray(dbData.data.products) && dbData.data.products.length > 0) {
      products = dbData.data.products;
      console.log(`[getProductData] Successfully fetched ${products.length} products from Supabase.`);
      console.log(`[getProductData] Products: ${products.map(p => p.slug).join(', ')}`);
    } else {
      // 3. Row doesn't exist or products array is empty in Supabase, use local fallback
      console.log("[getProductData] Supabase fetch returned no products, using local fallback.");
      if (fs.existsSync(PRODUCT_DATA_PATH)) {
        const fileContent = fs.readFileSync(PRODUCT_DATA_PATH, 'utf8');
        const data = JSON.parse(fileContent);
        products = Array.isArray(data) ? data : (data.products || []);
        console.log(`[getProductData] Loaded ${products.length} products from local fallback.`);
      }
    }
  } catch (error) {
    console.error("[getProductData] Error fetching product data:", error);
    // 4. Final safety fallback to local JSON on any error
    if (fs.existsSync(PRODUCT_DATA_PATH)) {
      try {
        const fileContent = fs.readFileSync(PRODUCT_DATA_PATH, 'utf8');
        const data = JSON.parse(fileContent);
        products = Array.isArray(data) ? data : (data.products || []);
        console.log(`[getProductData] Loaded ${products.length} products from FINAL fallback.`);
      } catch (parseError) {
        console.error("[getProductData] JSON Parse Error during fallback:", parseError);
      }
    }
  }

  return transformUrls(Array.isArray(products) ? products : []);
}

