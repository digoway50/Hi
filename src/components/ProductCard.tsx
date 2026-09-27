import React, { useState } from 'react';
import { Product } from '../types/garments';
import { useShop } from '../context/ShopContext';
import { Heart, MessageCircle, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist, setQuickViewProduct, quickBuyViaWhatsApp } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickWhatsAppBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors[0]?.name || 'Standard';
    quickBuyViaWhatsApp(product, selectedSize, defaultColor, 1);
  };

  const handleCardClick = () => {
    setQuickViewProduct(product);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white border border-zinc-200/90 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-zinc-300"
    >
      {/* Visual Canvas Slot (65%–75% of visual weight) */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] bg-[#F5F5F4] overflow-hidden flex items-center justify-center">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-100 text-zinc-400">
            <span className="font-display font-bold text-lg text-zinc-500">{product.name}</span>
            <span className="text-xs text-zinc-400 mt-1">{product.weight}</span>
          </div>
        )}

        {/* Quiet Subtle Status / Run Tag (No pill, quiet text badge) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-zinc-950/85 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-sm">
            {product.badge}
          </div>
        )}

        {/* Wishlist Toggle Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 cursor-pointer shadow-xs ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 scale-105'
              : 'bg-white/90 text-zinc-700 hover:text-rose-600 hover:bg-white backdrop-blur-xs'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${isFavorited ? 'fill-current scale-110' : ''}`}
          />
        </button>

        {/* Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-zinc-900 text-xs font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickWhatsAppBuy}
            className="py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Product Information Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata (Category & Fabric Weight) */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1.5">
            <span className="capitalize">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.weight}</span>
          </div>

          {/* Primary Title */}
          <h3 className="text-sm sm:text-base font-semibold text-zinc-900 line-clamp-1 group-hover:text-emerald-800 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{product.tagline}</p>
        </div>

        {/* Size chips & Price row */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
          {/* Quick Size Selector */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 overflow-x-auto scrollbar-none"
          >
            {product.sizes.slice(0, 4).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[11px] font-medium px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                  selectedSize === size
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {size.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Price with tabular numerals */}
          <div className="text-right shrink-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-zinc-950 font-mono tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-400 line-through font-mono tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
