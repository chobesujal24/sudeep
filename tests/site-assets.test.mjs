import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

test('fallback and share images exist in public', async () => {
  for (const file of ['placeholder-image.svg', 'product-hero-section.webp', 'services_hero_bg1.webp']) {
    await access(new URL(`../public/${file}`, import.meta.url));
  }
});

test('navigation does not link to the removed news route', async () => {
  const navigation = await readFile(new URL('../components/Navbar.js', import.meta.url), 'utf8');
  assert.doesNotMatch(navigation, /href:\s*["']\/news["']|href=["']\/news["']/);
});
