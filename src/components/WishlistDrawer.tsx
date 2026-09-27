import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, Trash2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlistProducts,
    toggleWishlist,
    addToCart,
    moveWishlistToCart,
    whatsAppPhone,
    setIsCartOpen
  } = useShop();

  if (!isWishlistOpen) return null;

  const handleInquireWishlistOnWhatsApp = () => {
    if (wishlistProducts.length === 0) return;
    const itemsList = wishlistProducts
      .map((p, idx) => `${idx + 1}. *${p.name}* ($${p.price.toFixed(2)}) — ${p.weight}`)
      .join('\n');

    const message = [
      `👋 Hi Fleex Garments!`,
      `Here is my saved wishlist of items I am interested in:`,
      ``,
      itemsList,
      ``,
      `Could you let me know if these are all in stock and if you offer any bundle discounts? Thank you!`
    ].join('\n');

    const url = buildWhatsAppUrl(whatsAppPhone, message);
    window.location.href = url;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-zinc-900 text-zinc-900" />
            <h2 className="text-lg font-bold text-zinc-950 font-display">Saved Wishlist</h2>
            <span className="text-xs text-zinc-500 font-medium">({wishlistProducts.length})</span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
            title="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-100">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900">Your wishlist is empty</h3>
              <p className="text-xs text-zinc-500 max-w-xs mt-1 mb-6">
                Tap the heart on any fleece, tee, or trouser to save it here for later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 bg-zinc-950 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {wishlistProducts.map((product) => {
                const defaultSize = product.sizes[0] || 'M';
                const defaultColor = product.colors[0]?.name || 'Standard';

                return (
                  <div key={product.id} className="flex gap-4 items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-18 h-18 object-cover rounded-lg bg-zinc-100 shrink-0 border border-zinc-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-400 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-zinc-400 hover:text-rose-600 p-1 cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-mono font-bold text-zinc-900 mt-0.5">
                        ${product.price.toFixed(2)}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => {
                            addToCart(product, defaultSize, defaultColor, 1);
                            setIsWishlistOpen(false);
                            setIsCartOpen(true);
                          }}
                          className="py-1 px-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {wishlistProducts.length > 0 && (
          <div className="px-6 py-5 border-t border-zinc-200 bg-white space-y-3">
            <button
              onClick={moveWishlistToCart}
              className="w-full py-3 px-4 bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Shopping Bag</span>
            </button>

            <button
              onClick={handleInquireWishlistOnWhatsApp}
              className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire Wishlist on WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
