// utils/shoppingList.ts
import { supabase } from "./supabaseClient";

export async function addToShoppingList(userId: string, item: {
  name: string;
  brand?: string;
  store?: string;
  price?: number;
  quantity?: number;
}) {
  const { error } = await supabase.from("shopping_list").insert({
    user_id: userId,
    item_name: item.name,
    item_brand: item.brand,
    item_store: item.store,
    item_price: item.price,
    quantity: item.quantity || 1
  });

  return { success: !error, error };
}

export async function getShoppingList(userId: string) {
  const { data, error } = await supabase
    .from("shopping_list")
    .select("*")
    .eq("user_id", userId)
    .order("added_at", { ascending: false });

  return { data, error };
}

export async function removeFromShoppingList(itemId: string) {
  const { error } = await supabase
    .from("shopping_list")
    .delete()
    .eq("id", itemId);

  return { success: !error, error };
}
