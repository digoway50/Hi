import React from 'react';
import heroImage from '../assets/images/hero_garments_campaign_1790497319096.jpg';
import { useShop } from '../context/ShopContext';
import { ArrowDown, MessageCircle, ShieldCheck, Sparkles, Truck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setIsWhatsAppModalOpen, setIsSizeGuideOpen } = useShop();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      {/* Background Image with Scrim Gradient for WCAG AA readability */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Fleex Garments Architectural Lookbook Collection"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-45 transform scale-102 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Subtle text kicker (NO pill badge per Section 1.A) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-400 mb-4 tracking-wider uppercase">
            <span>Autumn / Winter Essential Series</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Handcrafted Heavyweight</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 font-display text-balance">
            Modern Silhouettes. <br />
            Engineered Comfort.
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 mb-8 leading-relaxed font-normal">
            Custom-milled 500 GSM loopback cotton fleece, dense 280 GSM combed tees, and tailored utilitarian trousers. Place individual or bulk orders seamlessly via WhatsApp with personalized concierge support.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={scrollToCatalog}
              className="px-6 py-3.5 text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-100 rounded-lg transition-all shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Explore Collection</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="px-6 py-3.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </button>

            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="px-4 py-3.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              View Sizing Chart &rarr;
            </button>
          </div>

          {/* Subtle Brand Commitments (Clean text, no pill tags) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-800 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>500 GSM Organic Cotton</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Complimentary Delivery $75+</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct WhatsApp Concierge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
