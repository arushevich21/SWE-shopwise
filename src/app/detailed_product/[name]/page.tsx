"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavigationBar from "../../dashboard/_components/navigationBar";
import axios from "axios";
import Image from "next/image";

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
            </div>
            <p
              className={`text-lg font-bold ${
                product.price === lowestPrice ? "text-green-700" : "text-gray-800"
              }`}
            >
              ${product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
