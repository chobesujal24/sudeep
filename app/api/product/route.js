export const dynamic = 'force-dynamic';

import { getProductData } from "@/lib/getProductData";

export async function GET() {
  try {
    const products = await getProductData();
    return Response.json(products);
  } catch (error) {
    console.error("GET /api/product error:", error);
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
