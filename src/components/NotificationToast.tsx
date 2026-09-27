import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2 } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notification } = useShop();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200 pointer-events-none">
      <div className="bg-zinc-950/90 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full shadow-2xl border border-zinc-800 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{notification.message}</span>
      </div>
    </div>
  );
};
