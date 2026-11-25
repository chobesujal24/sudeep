import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../app/robots.js', import.meta.url), 'utf8');
const { default: robots } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('robots allows rendering assets and excludes administration', () => {
  const rules = robots().rules[0];
  assert.ok(!rules.disallow.some((path) => '/_next/static/chunk.js'.startsWith(path)));
  assert.ok(rules.disallow.some((path) => '/admin'.startsWith(path)));
  assert.equal(robots().sitemap, 'https://sudeepengineers.com/sitemap.xml');
});
