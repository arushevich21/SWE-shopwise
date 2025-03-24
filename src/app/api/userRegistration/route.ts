import { NextRequest } from "next/server";
import { supabase } from "../lib/util/supabaseClient";

export async function GET(user, pass, req: NextRequest) {

  const { error } = await supabase
    .from('users')
    .insert({ username: user, password: pass })

  if (error) {
    console.log(error);
    return Response.json({ message: 'An error occurred while registering user' }, { status: 500 });
  } 

  return Response.json(data ?? [], { status: 200 }); 
}