import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Load the route with a mocked database so the query is checked against the
// actual categories schema without requiring production Supabase credentials.
const source = (await readFile(new URL('../app/sitemap.js', import.meta.url), 'utf8'))
  .replace('import { supabase } from "@/lib/supabase";', 'const supabase = globalThis.__sitemapMocks.supabase;')
  .replace('import { getProductData } from "@/lib/getProductData";', 'const getProductData = globalThis.__sitemapMocks.getProductData;');

function mockSupabase(categoryFailure = null) {
  return {
    from(table) {
      return {
        select(columns) {
          const respond = () => {
            if (table === 'blogs') return { data: [{ slug: 'published', created_at: '2024-01-01' }], error: null };
            const allowed = ['slug', 'name'];
            const invalid = columns.split(',').map((column) => column.trim()).find((column) => !allowed.includes(column));
            if (invalid) return { data: null, error: new Error(`column categories.${invalid} does not exist`) };
            return { data: [{ slug: 'lighting', name: 'Lighting' }], error: categoryFailure };
          };
          return {
            eq: async () => respond(),
            order: async () => respond(),
            then(resolve, reject) { return Promise.resolve(respond()).then(resolve, reject); },
          };
        },
      };
    },
  };
}

test('sitemap generates category and product entries without categories.updated_at', async () => {
  const previousUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const previousKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.invalid';
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test';
  globalThis.__sitemapMocks = {
    supabase: mockSupabase(),
    getProductData: async () => [{ slug: 'lamp', category: 'Lighting' }],
    SEO_PRODUCTS: {},
    SEO_LOCATIONS: [{ slug: 'mumbai' }],
  };
  try {
    const { default: sitemap } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
    const entries = await sitemap();
    const category = entries.find((entry) => entry.url.endsWith('/product/lighting'));
    assert.ok(category);
    assert.equal(category.lastModified, undefined);
    assert.ok(entries.some((entry) => entry.url.endsWith('/product/lighting/lamp')));
    assert.ok(entries.some((entry) => entry.url.endsWith('/blog/published')));
    assert.ok(!entries.some((entry) => entry.url.includes('/manufacturer/')));
    assert.equal(entries.find((entry) => entry.url.endsWith('/product/lighting/lamp')).lastModified, undefined);
    assert.equal(entries.find((entry) => entry.url === 'https://sudeepengineers.com').lastModified, undefined);
  } finally {
    if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = previousUrl;
    if (previousKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = previousKey;
    delete globalThis.__sitemapMocks;
  }
});
