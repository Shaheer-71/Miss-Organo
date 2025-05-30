import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FilterProps {
  categories: string[];
  priceRanges: { id: string; label: string; min: number; max: number }[];
  onFilterChange: (filters: any) => void;
}

const ProductFilters: React.FC<FilterProps> = ({ categories, priceRanges, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      const updated = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      
      onFilterChange({
        categories: updated,
        priceRange: selectedPriceRange
      });
      
      return updated;
    });
  };

  const handlePriceChange = (priceRangeId: string) => {
    setSelectedPriceRange(prev => {
      const updated = prev === priceRangeId ? null : priceRangeId;
      
      onFilterChange({
        categories: selectedCategories,
        priceRange: updated
      });
      
      return updated;
    });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    onFilterChange({
      categories: [],
      priceRange: null
    });
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleMobileFilter}
          className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-between"
        >
          <span className="text-gray-700">Filters</span>
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </button>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:block space-y-6">
        {(selectedCategories.length > 0 || selectedPriceRange) && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-700">Active Filters</h3>
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(category => (
                <div
                  key={category}
                  className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {category}
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className="ml-1 hover:text-primary-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {selectedPriceRange && (
                <div className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm flex items-center">
                  {priceRanges.find(range => range.id === selectedPriceRange)?.label}
                  <button
                    onClick={() => handlePriceChange(selectedPriceRange)}
                    className="ml-1 hover:text-primary-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <h3 className="font-medium text-gray-700 mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <input
                  id={`category-${category}`}
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`category-${category}`}
                  className="ml-2 text-gray-700"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-3">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map(range => (
              <div key={range.id} className="flex items-center">
                <input
                  id={`price-${range.id}`}
                  type="radio"
                  checked={selectedPriceRange === range.id}
                  onChange={() => handlePriceChange(range.id)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label
                  htmlFor={`price-${range.id}`}
                  className="ml-2 text-gray-700"
                >
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-80 h-full overflow-y-auto animate-slideIn">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">Filters</h3>
                <button onClick={toggleMobileFilter}>
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`mobile-category-${category}`}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`mobile-category-${category}`}
                        className="ml-2 text-gray-700"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <div key={range.id} className="flex items-center">
                      <input
                        id={`mobile-price-${range.id}`}
                        type="radio"
                        checked={selectedPriceRange === range.id}
                        onChange={() => handlePriceChange(range.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label
                        htmlFor={`mobile-price-${range.id}`}
                        className="ml-2 text-gray-700"
                      >
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Clear All
                </button>
                <button
                  onClick={toggleMobileFilter}
                  className="flex-1 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;