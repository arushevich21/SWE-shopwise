import { createClient } from "@supabase/supabase-js";

export async function GET() {
  // Test funcion to check if Supabase is working, please remove this function
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

  return Response.json({ message: supabase });
}