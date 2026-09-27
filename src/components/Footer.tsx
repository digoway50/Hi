import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MessageCircle, Heart, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsWhatsAppModalOpen, setIsSizeGuideOpen, setCategory, showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    showToast('Subscribed to Fleex Garments lookbook updates');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 text-xs border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-bold tracking-tight text-white font-display">
              FLEEX GARMENTS
            </span>
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              Modern utilitarian streetwear and elevated heavyweight daily garments. Direct WhatsApp order placement with fast personal concierge assistance.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-white font-medium transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Customer Care</span>
              </button>
            </div>
          </div>

          {/* Catalog Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCategory('hoodies');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Heavyweight Hoodies
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCategory('tees');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Combed Cotton Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCategory('bottoms');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tailored Cargo Pants
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCategory('outerwear');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Melton Wool Outerwear
                </button>
              </li>
            </ul>
          </div>

          {/* Client Services Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Client Support
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fit &amp; Sizing Chart
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsWhatsAppModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  WhatsApp Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsWhatsAppModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bulk &amp; Wholesale Inquiries
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Free Express Delivery ($75+)</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Lookbook Dispatch
            </h4>
            <p className="text-zinc-400 mb-3 leading-relaxed">
              Receive limited run release drops and fabric announcements.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-zinc-500"
              />
              <button
                type="submit"
                className="w-full bg-white text-zinc-950 font-semibold py-2 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer text-xs"
              >
                Join Lookbook List
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <p>© {new Date().getFullYear()} Fleex Garments Co. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Direct WhatsApp Purchasing</span>
            <span aria-hidden="true">·</span>
            <span>Ethically Sourced</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
