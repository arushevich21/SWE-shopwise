import { NextRequest } from "next/server";
import { removeFromShoppingList } from "@/app/api/lib/util/shoppingListQueries";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing item ID" }), { status: 400 });
  }

  const { success, error } = await removeFromShoppingList(id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
