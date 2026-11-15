import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Load the dependency-free route as an ES module without requiring package-wide ESM.
const source = await readFile(new URL("../app/api/product/[...path]/route.js", import.meta.url), "utf8");
const { GET } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

const context = (path) => ({ params: Promise.resolve({ path }) });

test("image proxy awaits route params and encodes object names", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (url) => {
      assert.equal(url, "https://ceawmxeopfmvjywmbsen.supabase.co/storage/v1/object/public/images/products/a%20b.webp");
      return new Response("image", { headers: { "content-type": "image/webp" } });
    };
    const response = await GET(new Request("https://example.com"), context(["products", "a b.webp"]));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "image/webp");
    assert.match(response.headers.get("cache-control"), /max-age=31536000/);
  } finally {
    globalThis.fetch = original;
  }
});

test("image proxy does not cache failed upstream responses", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response("missing", { status: 404 });
    const response = await GET(new Request("https://example.com"), context(["missing.webp"]));
    assert.equal(response.status, 404);
    assert.equal(response.headers.get("cache-control"), null);
  } finally {
    globalThis.fetch = original;
  }
});

test("image proxy rejects traversal-like segments", async () => {
  const response = await GET(new Request("https://example.com"), context(["..", "secret"]));
  assert.equal(response.status, 400);
});
