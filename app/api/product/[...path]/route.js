export async function GET(_req, { params }) {
  const { path } = await params;
  // Treat each segment as an object name, never as a URL or path traversal.
  if (path.some((part) => part === "." || part === ".." || part.includes("/") || part.includes("\\"))) {
    return new Response("Invalid path", { status: 400 });
  }
  const objectPath = path.map(encodeURIComponent).join("/");
  const imageURL = `https://ceawmxeopfmvjywmbsen.supabase.co/storage/v1/object/public/images/${objectPath}`;

  try {
    const response = await fetch(imageURL);
    if (!response.ok) {
      return new Response("Image unavailable", { status: response.status === 404 ? 404 : 502 });
    }
    const headers = new Headers({
      "Cache-Control": "public, max-age=31536000",
      "Content-Security-Policy": "sandbox",
      "X-Content-Type-Options": "nosniff",
    });
    const contentType = response.headers.get("content-type");
    if (contentType) headers.set("Content-Type", contentType);
    return new Response(response.body, { headers });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new Response("Image unavailable", { status: 502 });
  }
}
