// This is a public presentation filter, not a confidentiality boundary: a
// public Supabase settings row can still expose its full JSON to API callers.
export function publicProducts(products) {
  return Array.isArray(products) ? products.filter((p) => p && p.status !== 'inactive') : [];
}

export async function saveCatalog(client, expected, products) {
  const next = { ...(expected || {}), products };
  const { data, error } = await client.rpc('compare_and_set_product_data', {
    expected_data: expected,
    new_data: next,
  });
  if (error) throw new Error(`Catalog save failed: ${error.message}`);
  if (data !== true) throw new Error('The catalog changed since you loaded it. Reload the page before saving again.');
  return next;
}
