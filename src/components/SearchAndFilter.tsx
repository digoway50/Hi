import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { CategoryFilter, FilterState } from '../types';

interface SearchAndFilterProps {
  filteredCount: number;
  totalCount: number;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ filteredCount, totalCount }) => {
  const { filterState, setFilterState, setSearchQuery, setCategory, resetFilters } = useShop();

  const [isFilterPanelExpanded, setIsFilterPanelExpanded] = React.useState(false);

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const hasActiveFilters =
    filterState.searchQuery.trim() !== '' ||
    filterState.category !== 'all' ||
    filterState.selectedSize !== null ||
    filterState.maxPrice < 200 ||
    filterState.sortBy !== 'featured';

  return (
    <div className="space-y-4">
      {/* Primary Search & Category Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = filterState.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as CategoryFilter)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-zinc-100/80 text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-950'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input & Filter Toggle */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fabric, fit, or name..."
              className="w-full bg-white border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 pl-9 pr-8 py-2 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-colors shadow-2xs"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-0.5 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsFilterPanelExpanded(!isFilterPanelExpanded)}
            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors inline-flex items-center gap-2 cursor-pointer shrink-0 ${
              isFilterPanelExpanded || filterState.selectedSize || filterState.maxPrice < 200
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Refine</span>
          </button>
        </div>
      </div>

      {/* Expandable Refinement Panel */}
      {isFilterPanelExpanded && (
        <div className="p-4 sm:p-5 bg-white border border-zinc-200 rounded-xl space-y-4 shadow-xs animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Size Filter */}
            <div>
              <label className="block text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-2">
                Filter by Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setFilterState((prev) => ({ ...prev, selectedSize: null }))}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    filterState.selectedSize === null
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  All
                </button>
                {availableSizes.map((size) => {
                  const isSelected = filterState.selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() =>
                        setFilterState((prev) => ({
                          ...prev,
                          selectedSize: isSelected ? null : size
                        }))
                      }
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="text-xs font-mono font-medium text-zinc-900 tabular-nums">
                  Up to ${filterState.maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="200"
                step="5"
                value={filterState.maxPrice}
                onChange={(e) =>
                  setFilterState((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
                }
                className="w-full accent-zinc-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                <span>$40</span>
                <span>$200</span>
              </div>
            </div>

            {/* Sort Order Selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-2">
                Sort Garments
              </label>
              <select
                value={filterState.sortBy}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    sortBy: e.target.value as FilterState['sortBy']
                  }))
                }
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

          {/* Reset Action */}
          {hasActiveFilters && (
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                Filters active ({filteredCount} matches)
              </span>
              <button
                onClick={resetFilters}
                className="text-xs font-medium text-zinc-900 hover:text-emerald-700 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results Header Bar */}
      <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-zinc-900 font-semibold">{filteredCount}</strong> of{' '}
            {totalCount} garments
          </span>
          {filterState.searchQuery && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                matching &ldquo;<strong>{filterState.searchQuery}</strong>&rdquo;
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
