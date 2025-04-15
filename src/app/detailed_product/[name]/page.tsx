"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavigationBar from "../../dashboard/_components/navigationBar";
import axios from "axios";
import Image from "next/image";
import { supabase } from "@/app/api/lib/util/supabaseClient";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@heroui/react";


interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  store: string;
  image: string;
  description: string;
}

export default function DetailedProduct() {
  const { name } = useParams();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  useEffect(() => {
    if (typeof name === "string") {
      setLoading(true);
      axios
        .get(`/api/product?name=${name}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [name]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!data.length) return <p className="p-4">Product not found.</p>;

  const lowestPrice = Math.min(...data.map((p) => p.price));

  const handleAddToList = async (product: Product) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      setModalMessage("Please log in to add items.");
      setIsOpen(true);
      return;
    }
  
    const quantity = quantities[product.id] || 1;
  
    try {
      const res = await fetch("/api/shopping-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          name: product.name,
          brand: product.brand,
          store: product.store,
          price: product.price,
          quantity,
        }),
      });
  
      if (!res.ok) throw new Error("Add failed");
  
      setModalMessage(`${quantity} × ${product.name} added to your list.`);
      setIsOpen(true);
    } catch (err) {
      setModalMessage("Something went wrong.");
      setIsOpen(true);
    }
  };
  
  

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
      <Image
        src="https://media.istockphoto.com/id/177834117/photo/butter-isolated-on-white.jpg?s=612x612&w=0&k=20&c=wKXNDSvB-tzfT9RPdmKsH2JAGpBv7OISdUmGdegupxg="
        alt={data[0].name}
        width={300}
        height={300}
        className="rounded-md shadow-md object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{data[0].name}</h1>
          <p className="text-gray-600">{data[0].description}</p>
          <p className="text-gray-500 mt-1">Category: {data[0].category}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Prices Across Stores</h2>
      <div className="space-y-2">
        {data.map((product) => (
          <div
            key={product.id}
            className={`flex justify-between items-center border p-3 rounded-md ${
              product.price === lowestPrice ? "border-green-500 bg-green-50" : "border-gray-200"
            }`}
          >
            <div>
              <p className="font-medium">{product.store}</p>
              <p className="text-sm text-gray-500">{product.brand}</p>
              <p className="text-sm text-gray-700">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                value={quantities[product.id] || 1}
                onChange={(e) =>
                  setQuantities({ ...quantities, [product.id]: Number(e.target.value) })
                }
                className="w-16 px-2 py-1 border rounded text-sm"
              />
              <button
                onClick={() => handleAddToList(product)}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader>Shopping List</ModalHeader>
          <ModalBody>
            <p>{modalMessage}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
