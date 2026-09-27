/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchAndFilter } from './components/SearchAndFilter';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { WhatsAppSupportModal } from './components/WhatsAppSupportModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { BrandStory } from './components/BrandStory';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { NotificationToast } from './components/NotificationToast';
import { RotateCcw, Sparkles } from 'lucide-react';

const StorefrontContent: React.FC = () => {
  const { products, filterState, resetFilters } = useShop();

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (filterState.searchQuery.trim()) {
          const query = filterState.searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.fabric.toLowerCase().includes(query) ||
            p.weight.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.tagline.toLowerCase().includes(query);
          if (!matches) return false;
        }

        // Category filter
        if (filterState.category !== 'all' && p.category !== filterState.category) {
          return false;
        }

        // Size filter
        if (filterState.selectedSize && !p.sizes.some((s) => s.startsWith(filterState.selectedSize!))) {
          return false;
        }

        // Max price filter
        if (p.price > filterState.maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'price-asc') return a.price - b.price;
        if (filterState.sortBy === 'price-desc') return b.price - a.price;
        if (filterState.sortBy === 'rating') return b.rating - a.rating;
        if (filterState.sortBy === 'newest') {
          const aNew = a.badge === 'New Arrival' ? 1 : 0;
          const bNew = b.badge === 'New Arrival' ? 1 : 0;
          return bNew - aNew;
        }
        return 0; // 'featured' keep original order
      });
  }, [products, filterState]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-zinc-900">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Catalog Showcase Section */}
        <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="mb-10">
            {/* Header with zero-pill discipline */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Autumn / Winter Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-950 font-display">
              The Garments Collection
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm mt-2 max-w-xl">
              Clean silhouettes, high-density textiles, and tactile organic cottons. Select an item for instant details or order directly through WhatsApp.
            </p>
          </div>

          {/* Search, Category Segments & Refinements */}
          <div className="mb-10">
            <SearchAndFilter
              filteredCount={filteredProducts.length}
              totalCount={products.length}
            />
          </div>

          {/* Product Grid (3-column desktop, 2-column tablet, 1-column mobile per specs) */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-2xl border border-zinc-200/80 p-8">
              <h3 className="text-base font-semibold text-zinc-900 mb-2">
                No garments match your current search criteria
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-6">
                Try widening your price range, searching for broader terms like &ldquo;hoodie&rdquo; or &ldquo;cotton&rdquo;, or resetting your filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2.5 bg-zinc-950 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          )}
        </section>

        {/* Brand Story & Engineering Pillars */}
        <BrandStory />
      </main>

      <Footer />

      {/* Slide-over Drawers & Interactive Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductQuickView />
      <WhatsAppSupportModal />
      <SizeGuideModal />
      <FloatingWhatsApp />
      <NotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <StorefrontContent />
    </ShopProvider>
  );
}
