"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/api/lib/util/supabaseClient";

interface ShoppingItem {
  id: string;
  item_name: string;
  item_brand?: string;
  item_store?: string;
  item_price?: number;
  quantity?: number; // ✅ added quantity field
  added_at: string;
}

export default function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  const grandTotal = items.reduce(
    (sum, item) => sum + (item.item_price ?? 0) * (item.quantity ?? 1),
    0
  );  

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchList = async () => {
      setLoading(true);
      const res = await fetch(`/api/shopping-list?user_id=${userId}`);
      const data = await res.json();
      setItems(data);
      setLoading(false);
    };

    fetchList();
  }, [userId]);

  const handleRemove = async (id: string) => {
    await fetch(`/api/shopping-list/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Shopping List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">Your shopping list is empty.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="border border-gray-200 rounded-md p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.item_name}</p>
                <p className="text-sm text-gray-500">
                  {item.item_brand} @ {item.item_store} – ${item.item_price?.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity ?? 1}
                </p>
                <p className="text-sm text-gray-800 font-semibold">
                  Total: ${((item.item_price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 text-right font-bold text-lg">
        Grand Total: ${grandTotal.toFixed(2)}
      </div>
    </div>
  );
}
