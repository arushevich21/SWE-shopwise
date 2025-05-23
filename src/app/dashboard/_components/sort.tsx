import React, { useState } from 'react';

interface SortProps {
  onSortApply: (filters: {
    priceSort?: 'lowToHigh' | 'highToLow';
  }) => void;
}

const Sort: React.FC<SortProps> = ({ onSortApply }) => {
  const [priceSort, setPriceSort] = useState<'lowToHigh' | 'highToLow' | null>(null);

  const handlePriceSortToggle = (sort: 'lowToHigh' | 'highToLow') => {
    setPriceSort(prevSort => (prevSort === sort ? null : sort));
  };

  const handleApplySort = () => {
    onSortApply({
      priceSort: priceSort || undefined,
    });
  };

  return (
    <div className="w-64 shadow-md rounded-lg border border-gray-200 bg-white">
      <div className="p-4">
        <h3 className="font-semibold mb-2">Sort by Price</h3>
        <div className="space-y-2">
          {['lowToHigh', 'highToLow'].map((sort) => (
            <div key={sort} className="flex items-center">
              <input
                type="checkbox"
                id={sort}
                checked={priceSort === sort}
                onChange={() => handlePriceSortToggle(sort as 'lowToHigh' | 'highToLow')}
                className="mr-2"
              />
              <label htmlFor={sort}>
                Price: {sort === 'lowToHigh' ? 'Low to High' : 'High to Low'}
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleApplySort}
          className="mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded transition"
        >
          Apply Sort
        </button>
      </div>
    </div>
  );
};

export default Sort;