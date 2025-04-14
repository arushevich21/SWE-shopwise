import ProductCard from "./productCard";
import {Spinner} from "@heroui/spinner";

interface ProductListProps {
  data: Product[];
  loading: boolean;
}

export default function ProductList({ data, loading }: ProductListProps) {
  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  const uniqueProductsMap = new Map<string, Product>();
  data.forEach((product) => {
    if (!uniqueProductsMap.has(product.name)) {
      uniqueProductsMap.set(product.name, product);
    }
  });
  const uniqueProducts = Array.from(uniqueProductsMap.values());

  return (
    <div className="max-w-[1200px] w-full flex flex-wrap gap-8">
      {uniqueProducts.length > 0 ? (
        uniqueProducts.map((product) => (
          <ProductCard
            key={product.id}
            index={product.id}
            name={product.name}
            image="https://media.istockphoto.com/id/177834117/photo/butter-isolated-on-white.jpg?s=612x612&w=0&k=20&c=wKXNDSvB-tzfT9RPdmKsH2JAGpBv7OISdUmGdegupxg="
            description={product.description}
          />
        ))
      ) : (
        <p className="text-gray-500 text-lg w-full text-center">
          Search a grocery item to get started with ShopWise!
        </p>
      )}
    </div>
  );
}