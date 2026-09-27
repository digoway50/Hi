import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Heart, ShoppingBag, MessageCircle, X } from 'lucide-react';
import { CategoryFilter } from '../types';

export const Navbar: React.FC = () => {
  const {
    cartItemsCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsWhatsAppModalOpen,
    filterState,
    setSearchQuery,
    setCategory
  } = useShop();

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const navCategories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Garments' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 'tees', label: 'T-Shirts' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'outerwear', label: 'Outerwear' }
  ];

  const handleCategoryClick = (catId: CategoryFilter) => {
    setCategory(catId);
    // Smooth scroll down to catalog section
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-zinc-200/80 transition-colors">
      {/* Quiet Announcement Strip */}
      <div className="bg-zinc-900 text-zinc-300 text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-3">
        <span>Complimentary express delivery on orders over $75</span>
        <span aria-hidden="true" className="text-zinc-600">·</span>
        <button
          onClick={() => setIsWhatsAppModalOpen(true)}
          className="text-white underline underline-offset-2 hover:text-emerald-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Direct WhatsApp Order &amp; Support</span>
        </button>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav Links) — Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-2xl font-bold tracking-tight text-zinc-950 font-display hover:opacity-90 transition-opacity shrink-0"
        >
          FLEEX GARMENTS
        </a>

        {/* Zone 2: 4–6 nav links with clean typography & subtle hover states */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-600">
          {navCategories.map((cat) => {
            const isActive = filterState.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`py-1 relative transition-colors whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-zinc-950 font-semibold' : 'hover:text-zinc-950'
                }`}
              >
                {cat.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Search, Wishlist, Cart, WhatsApp Concierge) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Toggle / Inline Input */}
          <div className="relative flex items-center">
            {isSearchVisible ? (
              <div className="flex items-center bg-zinc-100 border border-zinc-300 rounded-lg px-2.5 py-1.5 w-48 sm:w-64 transition-all">
                <Search className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search garments..."
                  value={filterState.searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                />
                <button
                  onClick={() => {
                    setIsSearchVisible(false);
                    setSearchQuery('');
                  }}
                  className="p-1 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                  title="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchVisible(true)}
                className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                title="Search garments"
                aria-label="Search garments"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Button with Counter */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors relative cursor-pointer"
            title="Open Wishlist"
            aria-label="Open Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button with Counter */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors relative cursor-pointer"
            title="Open Shopping Bag"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-1 right-1 bg-emerald-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* WhatsApp Direct Concierge Button */}
          <button
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            title="Chat & Order via WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </button>
        </div>
      </div>
    </header>
  );
};
