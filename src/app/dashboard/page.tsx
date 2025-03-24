'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import NavigationBar from './_components/navigationBar';
import ProductList from './_components/productList';

export default function Dashboard() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const fetchData = async (searchQuery: string) => {
    setLoading(true);
    axios
      .get(`/api/grocery/route.ts?name=${searchQuery}`)
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

  return (
    <div>
      <NavigationBar query={query} setQuery={setQuery} fetchData={fetchData} />
      <div className="flex flex-wrap gap-8 justify-center p-8 w-full max-h-[100vh] overflow-auto pb-2">
        <div className="max-w-[1200px] w-full flex flex-wrap gap-8">
          <ProductList data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
}