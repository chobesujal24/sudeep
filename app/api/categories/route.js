export const dynamic = 'force-dynamic';
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sequence', { ascending: true })
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    
    return Response.json(data);
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return Response.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
