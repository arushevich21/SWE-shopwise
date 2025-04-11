'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import NavigationBar from './_components/navigationBar';
import ProductList from './_components/productList';
import Filter from './_components/filter';

export default function Dashboard() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredBrands, setFilteredBrands] = useState<string[]>([]);
  const [priceSort, setPriceSort] = useState<'lowToHigh' | 'highToLow' | null>(null);

  const fetchData = async (searchQuery: string) => {
    setLoading(true);
    axios
      .get(`/api/grocery?name=${searchQuery}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }
  /* Turned off for now, but this is if you want to return new results everytime they type something
  useEffect(() => {
    fetchData(query);
  }, [query]);
  */
  const handleFilterApply = (filters: {
    brands: string[];
    priceSort?: 'lowToHigh' | 'highToLow';
  }) => {
    setFilteredBrands(filters.brands);
    setPriceSort(filters.priceSort || null);
    fetchData(query);
  }


  return (
    <div>
      <NavigationBar query={query} setQuery={setQuery} fetchData={fetchData}/>
      <div className="flex flex-wrap gap-8 justify-center p-8 w-full max-h-[100vh] overflow-auto pb-2">
        <div className="flex max-w-[1400px] w-full">
          <div className="w-64 mr-8">
            <Filter onFilterApply={handleFilterApply} />
          </div>
          <div className="flex-grow">
            <ProductList data={data} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}