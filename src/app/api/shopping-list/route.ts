import { NextRequest } from "next/server";
import { addToShoppingList, getShoppingList } from "@/app/api/lib/util/shoppingListQueries";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing user_id" }), { status: 400 });
  }

  const { data, error } = await getShoppingList(userId);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id, name, brand, store, price, quantity } = body;

  if (!user_id || !name) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  const { success, error } = await addToShoppingList(user_id, { name, brand, store, price, quantity });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
