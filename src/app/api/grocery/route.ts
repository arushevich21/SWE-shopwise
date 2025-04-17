import { NextRequest } from "next/server";
import { supabase } from "../lib/util/supabaseClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productName = searchParams.get('name');

  let query;
  
  if (!productName) {
    // If no search query, return all items
    query = supabase.from('grocery_products').select('*');
  } else {
    // If there's a search query, use fuzzy search
    query = supabase.rpc('fuzzy_search', {search_term: productName});
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
    return Response.json({ message: 'An error occurred while fetching data' }, { status: 500 });
  } 

  return Response.json(data ?? [], { status: 200 }); 
}