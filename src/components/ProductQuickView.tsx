import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, MessageCircle, ShoppingBag, ShieldCheck, Ruler, Check } from 'lucide-react';

export const ProductQuickView: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    quickBuyViaWhatsApp,
    isInWishlist,
    toggleWishlist,
    setIsCartOpen,
    setIsSizeGuideOpen
  } = useShop();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const handleWhatsAppBuy = () => {
    quickBuyViaWhatsApp(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-zinc-200 flex flex-col md:flex-row my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer shadow-xs"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Showcase */}
        <div className="md:w-1/2 bg-[#F5F5F4] relative flex items-center justify-center min-h-[320px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-h-[480px] md:max-h-full"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-zinc-950 text-white text-xs font-medium tracking-wide px-3 py-1 rounded-sm">
              {product.badge}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          <div>
            {/* Metadata */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                {product.category} · {product.weight}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="text-xs text-zinc-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600 text-rose-600' : ''}`} />
                <span>{isFavorited ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Title & Price */}
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 font-display">
              {product.name}
            </h2>

            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-zinc-950 font-mono tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-400 line-through font-mono tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium ml-2">
                In Stock &amp; Ready to Ship
              </span>
            </div>

            {/* Short Description */}
            <p className="mt-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                  Color: <span className="font-normal text-zinc-600">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                      selectedColor === c.name ? 'border-zinc-900 scale-105' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <Check className={`w-3.5 h-3.5 ${c.hex === '#F4F2EC' || c.hex === '#EAE6DF' ? 'text-zinc-900' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection & Guide */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                  Select Size: <span className="font-normal text-zinc-600">{selectedSize}</span>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-zinc-600 hover:text-zinc-950 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                          : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                Quantity:
              </span>
              <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-zinc-600 hover:bg-zinc-200 text-sm font-semibold transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-mono font-bold text-zinc-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-zinc-600 hover:bg-zinc-200 text-sm font-semibold transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons & Features */}
          <div className="mt-8 space-y-3 pt-6 border-t border-zinc-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleAddToCart}
                className="py-3 px-4 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleWhatsAppBuy}
                className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Buy Now on WhatsApp</span>
              </button>
            </div>

            {/* Quiet Product Features */}
            <div className="pt-4 text-xs text-zinc-500 space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Fabric: {product.fabric}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Fit Profile: {product.fit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
