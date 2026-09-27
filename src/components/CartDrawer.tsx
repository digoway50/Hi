import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, MessageCircle, Copy, ArrowRight, ShieldCheck, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { CustomerOrderInfo } from '../types/garments';
import { formatCartOrderMessage } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartItemsCount,
    shippingCost,
    freeShippingThreshold,
    submitOrderViaWhatsApp,
    showToast
  } = useShop();

  const [customer, setCustomer] = useState<CustomerOrderInfo>({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const sampleOrderNum = '849201';
  const previewMessage = formatCartOrderMessage(cart, customer, sampleOrderNum, cartTotal, shippingCost);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(previewMessage);
    setCopied(true);
    showToast('Order details copied to clipboard');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppCheckout = () => {
    submitOrderViaWhatsApp(customer);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-zinc-950 font-display">Shopping Bag</h2>
            <span className="text-xs text-zinc-500 font-medium">({cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
            title="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-100">
          <div className="flex justify-between text-xs text-zinc-600 mb-1.5">
            {amountToFreeShipping > 0 ? (
              <span>Add <strong className="text-zinc-900">${amountToFreeShipping.toFixed(2)}</strong> more for Free Shipping</span>
            ) : (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Unlocked Complimentary Delivery!
              </span>
            )}
            <span className="font-mono text-[11px] text-zinc-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${amountToFreeShipping === 0 ? 'bg-emerald-600' : 'bg-zinc-900'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Drawer Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                <X className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900">Your shopping bag is empty</h3>
              <p className="text-xs text-zinc-500 max-w-xs mt-1 mb-6">
                Explore our signature 500 GSM fleeces, combed tees, and tailored cargos.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 bg-zinc-950 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Browse Garments
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-4 pb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-18 h-18 object-cover rounded-lg bg-zinc-100 shrink-0 border border-zinc-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5">
                        <span>Size: <strong className="text-zinc-700">{item.size}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>Color: <strong className="text-zinc-700">{item.color}</strong></span>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border border-zinc-200 rounded-md overflow-hidden bg-zinc-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-200 text-xs font-bold transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-mono font-medium text-zinc-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-200 text-xs font-bold transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs sm:text-sm font-bold text-zinc-950 font-mono tabular-nums">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form (Collapsible) */}
              <div className="py-4">
                <button
                  onClick={() => setShowDetailsForm(!showDetailsForm)}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-800 hover:text-zinc-950 cursor-pointer"
                >
                  <span>Customer &amp; Delivery Details (Optional)</span>
                  {showDetailsForm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showDetailsForm && (
                  <div className="mt-3 space-y-2.5 bg-zinc-50 p-3 rounded-lg border border-zinc-200 animate-in fade-in">
                    <p className="text-[11px] text-zinc-500">
                      Include your delivery information so it is automatically included in the WhatsApp order message.
                    </p>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full text-xs bg-white border border-zinc-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-zinc-900"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="w-full text-xs bg-white border border-zinc-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-zinc-900"
                      />
                      <input
                        type="text"
                        placeholder="City / Region"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        className="w-full text-xs bg-white border border-zinc-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-zinc-900"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Street Shipping Address"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full text-xs bg-white border border-zinc-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-zinc-900"
                    />
                    <textarea
                      placeholder="Order notes (e.g. gift wrap, preferred delivery hours)..."
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      rows={2}
                      className="w-full text-xs bg-white border border-zinc-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-zinc-900 resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Live WhatsApp Message Preview Toggle */}
              <div className="py-4">
                <button
                  onClick={() => setShowMessagePreview(!showMessagePreview)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Preview WhatsApp Message Format
                  </span>
                  {showMessagePreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showMessagePreview && (
                  <div className="mt-2.5 bg-emerald-950/5 border border-emerald-800/20 p-3 rounded-lg text-[11px] font-mono text-zinc-700 whitespace-pre-wrap leading-relaxed">
                    {previewMessage}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer & Checkout Controls */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-zinc-200 bg-white space-y-3.5">
            {/* Calculation rows */}
            <div className="space-y-1.5 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-zinc-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono tabular-nums text-zinc-900">
                  {shippingCost === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
                <span>Total</span>
                <span className="font-mono tabular-nums text-base">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Primary Action: Order via WhatsApp */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
              <span>Place Order via WhatsApp &rarr;</span>
            </button>

            {/* Secondary Copy Button */}
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                onClick={handleCopyMessage}
                className="text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Order Summary' : 'Copy Order Text'}</span>
              </button>
              <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Encrypted &amp; Direct</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
