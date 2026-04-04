import { getProductData } from "./lib/getProductData.js";
import { supabase } from "./lib/supabase.js";

async function run() {
  const products = await getProductData();
  const { data: categories } = await supabase.from('categories').select('*');
  console.log("Categories:", categories.slice(0,2));
  console.log("Products:", products.slice(0,2));
}
run();
