import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, FilterState, CategoryFilter, CustomerOrderInfo } from '../types';
import { PRODUCTS } from '../data/products';
import {
  DEFAULT_STORE_PHONE,
  buildWhatsAppUrl,
  formatCartOrderMessage,
  formatDirectBuyMessage
} from '../utils/whatsapp';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  filterState: FilterState;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isWhatsAppModalOpen: boolean;
  isSizeGuideOpen: boolean;
  quickViewProduct: Product | null;
  whatsAppPhone: string;
  notification: { message: string; id: number } | null;
  
  // Setters & Actions
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setWhatsAppPhone: (phone: string) => void;
  
  // Filter actions
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  setSearchQuery: (query: string) => void;
  setCategory: (category: CategoryFilter) => void;
  resetFilters: () => void;
  
  // Cart actions
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
  shippingCost: number;
  freeShippingThreshold: number;
  
  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  wishlistProducts: Product[];
  moveWishlistToCart: () => void;

  // WhatsApp actions
  submitOrderViaWhatsApp: (customer: CustomerOrderInfo) => void;
  quickBuyViaWhatsApp: (product: Product, size: string, color: string, quantity?: number) => void;
  showToast: (message: string) => void;
}

const initialFilterState: FilterState = {
  searchQuery: '',
  category: 'all',
  selectedSize: null,
  maxPrice: 200,
  sortBy: 'featured'
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  
  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Store WhatsApp Phone
  const [whatsAppPhone, setWhatsAppPhoneState] = useState<string>(() => {
    return localStorage.getItem('fleex_whatsapp_phone') || DEFAULT_STORE_PHONE;
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fleex_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fleex_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Notification Toast
  const [notification, setNotification] = useState<{ message: string; id: number } | null>(null);

  useEffect(() => {
    localStorage.setItem('fleex_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fleex_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const setWhatsAppPhone = (phone: string) => {
    setWhatsAppPhoneState(phone);
    localStorage.setItem('fleex_whatsapp_phone', phone);
  };

  const showToast = (message: string) => {
    const id = Date.now();
    setNotification({ message, id });
    setTimeout(() => {
      setNotification((curr) => (curr?.id === id ? null : curr));
    }, 3200);
  };

  // Filter helpers
  const setSearchQuery = (query: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery: query }));
  };

  const setCategory = (category: CategoryFilter) => {
    setFilterState((prev) => ({ ...prev, category }));
  };

  const resetFilters = () => {
    setFilterState(initialFilterState);
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const lineId = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === lineId);
      if (existing) {
        return prev.map((item) =>
          item.id === lineId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: lineId, productId: product.id, product, size, color, quantity }];
    });
    showToast(`Added ${product.name} (${size}) to Bag`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from Bag');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 75;
  const shippingCost = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 10;
  const cartTotal = cartSubtotal + shippingCost;

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const product = products.find((p) => p.id === productId);
      if (exists) {
        showToast(`Removed ${product?.name || 'Item'} from Wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved ${product?.name || 'Item'} to Wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));
  const wishlistCount = wishlist.length;

  const moveWishlistToCart = () => {
    if (wishlistProducts.length === 0) return;
    wishlistProducts.forEach((prod) => {
      const defaultSize = prod.sizes[0] || 'M';
      const defaultColor = prod.colors[0]?.name || 'Default';
      addToCart(prod, defaultSize, defaultColor, 1);
    });
    setWishlist([]);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
    showToast('All wishlist items moved to Shopping Bag');
  };

  // WhatsApp Order Submission
  const submitOrderViaWhatsApp = (customer: CustomerOrderInfo) => {
    if (cart.length === 0) {
      showToast('Your shopping bag is empty.');
      return;
    }
    const orderNum = Math.floor(100000 + Math.random() * 900000).toString();
    const message = formatCartOrderMessage(cart, customer, orderNum, cartTotal, shippingCost);
    const url = buildWhatsAppUrl(whatsAppPhone, message);
    
    // Redirect cleanly to WhatsApp
    window.location.href = url;
  };

  // Quick Direct Buy on WhatsApp
  const quickBuyViaWhatsApp = (product: Product, size: string, color: string, quantity = 1) => {
    const message = formatDirectBuyMessage(product, size, color, quantity);
    const url = buildWhatsAppUrl(whatsAppPhone, message);
    window.location.href = url;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        filterState,
        isCartOpen,
        isWishlistOpen,
        isWhatsAppModalOpen,
        isSizeGuideOpen,
        quickViewProduct,
        whatsAppPhone,
        notification,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsWhatsAppModalOpen,
        setIsSizeGuideOpen,
        setQuickViewProduct,
        setWhatsAppPhone,
        setFilterState,
        setSearchQuery,
        setCategory,
        resetFilters,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemsCount,
        shippingCost,
        freeShippingThreshold,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        wishlistProducts,
        moveWishlistToCart,
        submitOrderViaWhatsApp,
        quickBuyViaWhatsApp,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
