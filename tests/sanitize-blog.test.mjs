import test from "node:test";
import assert from "node:assert/strict";
import { jsonForHtml, sanitizeBlogHtml } from "../lib/sanitizeBlogHtml.mjs";

test("blog HTML preserves ordinary formatting and safe images", () => {
  const result = sanitizeBlogHtml('<h2>Heading</h2><p>Hello <strong>world</strong></p><img src="https://example.com/image.png" alt="Photo">');
  assert.match(result, /<h2>Heading<\/h2>/);
  assert.match(result, /<strong>world<\/strong>/);
  assert.match(result, /src="https:\/\/example.com\/image.png"/);
});

test("blog HTML removes scripts, event handlers, and unsafe URLs", () => {
  const result = sanitizeBlogHtml('<script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">link</a>');
  assert.doesNotMatch(result, /script|onerror|javascript:/i);
  assert.match(result, /<a>link<\/a>/);
});

test("JSON-LD cannot close the surrounding script element", () => {
  const output = jsonForHtml({ title: '</script><script>alert(1)</script>' });
  assert.doesNotMatch(output, /<\/script/i);
  assert.equal(JSON.parse(output).title, '</script><script>alert(1)</script>');
});
