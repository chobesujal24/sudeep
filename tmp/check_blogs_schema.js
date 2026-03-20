const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .limit(1);

  if (error) {
    console.error("Error fetching from blogs:", error);
  } else if (data && data.length > 0) {
    console.log("Sample post keys:", Object.keys(data[0]));
  } else {
    console.log("No posts found in 'blogs' table.");
    // Try to get column names from information_schema if possible via RPC or just query
    const { data: cols, error: colError } = await supabase.rpc('get_table_columns', { table_name: 'blogs' });
    if (colError) {
       console.log("RPC get_table_columns failed (expected if not defined).");
    } else {
       console.log("Columns:", cols);
    }
  }
}

checkSchema();
