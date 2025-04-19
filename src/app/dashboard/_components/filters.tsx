import React, { useState } from 'react';

interface FilterProps {
  categories: string[];
  onFilterApply: (filters: { categories?: string[] }) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, onFilterApply }) => {
  const [categoryList, setCategoryList] = useState<string[]>([]);

  const handleFilterCategoryToggle = (category: string) => {
    if (categoryList.includes(category)) {
      setCategoryList(categoryList.filter((c) => c !== category));
    } else {
      setCategoryList([...categoryList, category]);
    }
  };

  const handleApplyFilters = () => {
    onFilterApply({
      categories: categoryList.length > 0 ? categoryList : [],
    });
  };

  return (
    <div className="w-64 shadow-md rounded-lg border border-gray-200 bg-white">
      <div className="p-4">
        <h3 className="font-semibold mb-2 mt-4">Filter by Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                checked={categoryList.includes(category)}
                onChange={() => handleFilterCategoryToggle(category)}
                className="mr-2"
              />
              <label htmlFor={category}>
                {category}
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleApplyFilters}
          className="mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default React.memo(Filter);