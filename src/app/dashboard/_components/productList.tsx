import ProductCard from "./productCard";
import { Spinner } from "@heroui/spinner";

interface ProductListProps {
  data: Product[];
  loading: boolean;
  priceSort?: 'lowToHigh' | 'highToLow';
}

export default function ProductList({ data, loading, priceSort }: ProductListProps) {
  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  // Group by name and calculate average prices
  const grouped = new Map<string, Product[]>();
  data.forEach((product) => {
    if (!grouped.has(product.name)) {
      grouped.set(product.name, []);
    }
    grouped.get(product.name)?.push(product);
  });

  const averagedProducts = Array.from(grouped.entries()).map(([name, group]) => {
    const avgPrice = group.reduce((sum, p) => sum + p.price, 0) / group.length;
    return {
      ...group[0], // use the first item for image/description
      price: avgPrice,
    };
  });

  if (priceSort === 'lowToHigh') {
    averagedProducts.sort((a, b) => a.price - b.price);
  } else if (priceSort === 'highToLow') {
    averagedProducts.sort((a, b) => b.price - a.price);
  } else {
    averagedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="max-w-[1200px] w-full flex flex-wrap gap-8">
      {averagedProducts.length > 0 ? (
        averagedProducts.map((product) => (
          <ProductCard
            key={product.id}
            index={product.id}
            name={product.name}
            price={`$${product.price.toFixed(2)}`} // format as string with $
            image={product.image}
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
