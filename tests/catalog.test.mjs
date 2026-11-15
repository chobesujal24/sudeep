import test from 'node:test';
import assert from 'node:assert/strict';
import { publicProducts, saveCatalog } from '../lib/catalog.mjs';

test('only active and legacy products are returned publicly', () => {
  assert.deepEqual(publicProducts([{ slug: 'a', status: 'active' }, { slug: 'b', status: 'inactive' }, { slug: 'c' }, null]).map(p => p.slug), ['a', 'c']);
  assert.deepEqual(publicProducts(null), []);
});

test('catalog save uses an atomic compare-and-set and preserves other fields', async () => {
  const before = { products: [{ slug: 'old' }], other: 42 };
  const updated = [{ slug: 'new' }];
  const client = { rpc: async (name, args) => {
    assert.equal(name, 'compare_and_set_product_data');
    assert.deepEqual(args.expected_data, before);
    assert.deepEqual(args.new_data, { products: updated, other: 42 });
    return { data: true, error: null };
  } };
  assert.deepEqual(await saveCatalog(client, before, updated), { products: updated, other: 42 });
});

test('catalog conflicts and backend errors do not report success', async () => {
  await assert.rejects(saveCatalog({ rpc: async () => ({ data: false, error: null }) }, {}, []), /changed since/);
  await assert.rejects(saveCatalog({ rpc: async () => ({ data: null, error: { message: 'Permission denied' } }) }, null, []), /Permission denied/);
});
