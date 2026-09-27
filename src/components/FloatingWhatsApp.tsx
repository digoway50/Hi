import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MessageCircle, X, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { setIsWhatsAppModalOpen, whatsAppPhone } = useShop();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Gentle First-Time Prompt Tooltip */}
      {showTooltip && (
        <div className="hidden md:flex items-center gap-2 bg-zinc-900 text-white text-xs px-3.5 py-2 rounded-xl shadow-lg border border-zinc-700 animate-in fade-in slide-in-from-right-4 duration-300">
          <span>Need sizing help or quick order? <strong>Chat on WhatsApp</strong></span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-400 hover:text-white p-0.5 cursor-pointer"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsWhatsAppModalOpen(true)}
        className="w-13 h-13 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer relative group border-2 border-white/20"
        title="Chat & Order via WhatsApp"
        aria-label="Chat & Order via WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-700" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
      </button>
    </div>
  );
};
