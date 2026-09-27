import React from 'react';
import { Layers, Scissors, ShieldAlert, Sparkles, MessageSquareHeart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BrandStory: React.FC = () => {
  const { setIsWhatsAppModalOpen } = useShop();

  const pillars = [
    {
      title: 'Custom-Milled 500 GSM Fleece',
      description: 'We reject flimsy fast-fashion blends. Every hoodie is constructed with pure 100% organic cotton loopback fleece offering structured architectural drape.',
      icon: Layers
    },
    {
      title: 'Enzyme Pre-Wash & Preshrunk',
      description: 'All garments undergo pre-shrinking and reactive organic dye baths so your fit remains completely true after years of regular washing.',
      icon: Sparkles
    },
    {
      title: 'Refined Utilitarian Tailoring',
      description: 'Double-needle flatlock seams, reinforced stress bartacks, clean pocket lines, and dropped shoulders designed for effortless daily rotation.',
      icon: Scissors
    },
    {
      title: 'Direct WhatsApp Concierge',
      description: 'Skip rigid automated checkout bots. Order directly with our team, request size recommendations, or customize order notes on WhatsApp.',
      icon: MessageSquareHeart
    }
  ];

  return (
    <section className="py-20 bg-zinc-900 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">
            Garment Engineering
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Built for Longevity. Cut with Intent.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
            Fleex Garments was founded on the philosophy that everyday staples should carry the heft, density, and craftsmanship of tailored outerwear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 bg-zinc-950/60 rounded-xl border border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/80 flex items-center justify-center text-emerald-400 mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Callout Banner */}
        <div className="mt-16 bg-gradient-to-r from-emerald-900/60 via-zinc-900 to-zinc-950 border border-emerald-700/40 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Need custom garment embroidery or bulk team orders?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-xl">
              Connect with our production director directly on WhatsApp for fabric samples, wholesale pricing sheets, and custom silhouette runs.
            </p>
          </div>
          <button
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition-all shrink-0 cursor-pointer active:scale-98"
          >
            Start WhatsApp Inquiry &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
