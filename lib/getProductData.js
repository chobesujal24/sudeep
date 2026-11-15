import { cache } from 'react';
import { supabase } from './supabase.js';
import { publicProducts } from './catalog.mjs';

export function transformUrls(obj) {
  if (!obj) return obj;
  if (typeof obj === 'string') {
    // No longer replacing Supabase storage URLs with custom CDN URL
    let transformed = obj;

    // 1. Point everything to the custom CDN
    const CDN_PREFIX = 'https://cdn.sudeepengineers.com/storage/v1/object/public/images';
    const OLD_STORAGE_PREFIX = 'https://ceawmxeopfmvjywmbsen.supabase.co/storage/v1/object/public/images';

    // Replace old storage links with clean CDN links
    if (transformed.includes(OLD_STORAGE_PREFIX)) {
      transformed = transformed.replace(OLD_STORAGE_PREFIX, CDN_PREFIX);
    }
    
    // 2. Transfrom relative paths (found in local fallback) to CDN URL
    if (transformed.startsWith('/products/') || transformed.startsWith('/catalogs/')) {
      transformed = CDN_PREFIX + transformed;
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

// React deduplicates this request within a server render, including metadata.
export const getProductData = cache(async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('data')
    .eq('id', 'productData')
    .maybeSingle();

  if (error) {
    console.error("[getProductData] Supabase fetch error:", error.message);
    throw new Error("Product data is temporarily unavailable.");
  }

  return transformUrls(publicProducts(data?.data?.products));
});
