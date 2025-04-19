'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import NavigationBar from './_components/navigationBar';
import ProductList from './_components/productList';
import Sort from './_components/sort';
import Filter from './_components/filters'
import { useSearchParams } from 'next/navigation';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const baseCategories = ["Legumes", "Dairy", "Meat", "Produce", "Bakery", "Grains"];

  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [priceSort, setPriceSort] = useState<'lowToHigh' | 'highToLow' | undefined>(undefined);

  const fetchData = async (searchQuery: string | null) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/grocery${searchQuery ? `?name=${searchQuery}` : ''}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  const handleSortApply = (filters: {
    priceSort?: 'lowToHigh' | 'highToLow';
  }) => {
    setPriceSort(filters.priceSort ?? undefined);
  };

  const handleApplyFilters = ((filters) => {
    setCategoryFilter(filters.categories);
  });

  return (
    <div>
      <div className="flex flex-wrap gap-8 justify-center p-8 w-full max-h-[100vh] overflow-auto pb-2">
        <div className="flex max-w-[1400px] w-full">
          <div className="w-64 mr-8">
            <Sort onSortApply={handleSortApply} />
            <Filter categories={baseCategories} onFilterApply={handleApplyFilters}/>
          </div>
          <div className="flex-grow">
            <ProductList data={data} loading={loading} priceSort={priceSort} category={categoryFilter} />
          </div>
        </div>
      </div>
    </div>
  );
}