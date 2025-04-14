import { NextRequest } from "next/server";
import { supabase } from "../lib/util/supabaseClient";

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const productName = searchParams.get('name');

  if (!productName) {
    return Response.json([], { status: 500 }); 
  }

  const query = supabase.from('grocery_products').select('*').eq('name', productName);

  const { data, error } = await query;

  if (error) {
    console.log(error);
    return Response.json({ message: 'An error occurred while fetching data' }, { status: 500 });
  } 

  return Response.json(data ?? [], { status: 200 }); 
}