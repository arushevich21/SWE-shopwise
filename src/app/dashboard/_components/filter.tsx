import React, { useState } from 'react';

interface FilterProps {
  onFilterApply: (filters: {
    brands: string[];
    priceSort?: 'lowToHigh' | 'highToLow';
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterApply }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceSort, setPriceSort] = useState<'lowToHigh' | 'highToLow' | null>(null);

  const brands = [
    'Brand A',
    'Brand B',
    'Brand C',
    '...'
  ];

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handlePriceSortToggle = (sort: 'lowToHigh' | 'highToLow') => {
    setPriceSort(prevSort => prevSort === sort ? null : sort);
  };

  const handleApplyFilters = () => {
    onFilterApply({
      brands: selectedBrands,
      priceSort: priceSort || undefined
    });
  };

  return (
    <div className="w-64 shadow-md rounded-lg border">
      <div className="text-lg font-bold p-4 border">
        Filter
      </div>

      <div className="border p-4">
        <h3 className="font-semibold mb-2">Price Sort</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lowToHigh"
              checked={priceSort === 'lowToHigh'}
              onChange={() => handlePriceSortToggle('lowToHigh')}
              className="mr-2"
            />
            <label htmlFor="lowToHigh">Price: Low to High</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="highToLow"
              checked={priceSort === 'highToLow'}
              onChange={() => handlePriceSortToggle('highToLow')}
              className="mr-2"
            />
            <label htmlFor="highToLow">Price: High to Low</label>
          </div>
        </div>
      </div>

      <div className="border p-4">
        <h3 className="font-semibold mb-2">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="mr-2"
              />
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-sky-500/100 text-white py-2 rounded hover:bg-sky-blue-500/75 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;