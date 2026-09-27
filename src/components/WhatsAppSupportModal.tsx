import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, MessageCircle, Send, Settings, Check, HelpCircle, PhoneCall, PackageCheck } from 'lucide-react';
import { buildWhatsAppUrl, formatSupportMessage } from '../utils/whatsapp';

export const WhatsAppSupportModal: React.FC = () => {
  const { isWhatsAppModalOpen, setIsWhatsAppModalOpen, whatsAppPhone, setWhatsAppPhone, showToast } = useShop();

  const [selectedTopic, setSelectedTopic] = useState<string>('Sizing Recommendation');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [tempPhone, setTempPhone] = useState<string>(whatsAppPhone);

  if (!isWhatsAppModalOpen) return null;

  const topics = [
    { id: 'Sizing Recommendation', label: '📏 Sizing Advice', prompt: 'I would like help finding the right size for my measurements.' },
    { id: 'Order Tracking & Delivery', label: '📦 Track Order', prompt: 'I want to inquire about dispatch timeframes and tracking for my order.' },
    { id: 'Wholesale & Bulk Orders', label: '🧵 Bulk / Wholesale', prompt: 'I am interested in wholesale or bulk corporate garment ordering.' },
    { id: 'Fabric & Care Inquiry', label: '✨ Fabric Care', prompt: 'I have a question regarding washing and care for your 500 GSM fleeces.' }
  ];

  const handleStartChat = () => {
    const activeTopic = topics.find((t) => t.id === selectedTopic);
    const detailText = customMessage.trim() || activeTopic?.prompt || '';
    const message = formatSupportMessage(selectedTopic, detailText);
    const url = buildWhatsAppUrl(whatsAppPhone, message);
    window.location.href = url;
  };

  const handleSavePhone = () => {
    setWhatsAppPhone(tempPhone);
    setIsEditingPhone(false);
    showToast('WhatsApp contact number updated');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-zinc-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-emerald-800 text-white p-6 relative">
          <button
            onClick={() => setIsWhatsAppModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-emerald-700/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs border border-white/20">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">Fleex WhatsApp Concierge</h2>
              <p className="text-xs text-emerald-100 mt-0.5">
                Instant customer support &amp; order assistance · 7 days a week
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick Topic Chips */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-900 mb-2">
              Select inquiry topic
            </label>
            <div className="grid grid-cols-2 gap-2">
              {topics.map((topic) => {
                const isSelected = selectedTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic.id);
                      if (!customMessage) setCustomMessage(topic.prompt);
                    }}
                    className={`p-2.5 text-left text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold shadow-2xs'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {topic.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Message Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-900 mb-1.5">
              Your inquiry message
            </label>
            <textarea
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Type your question or specific garment request here..."
              className="w-full text-xs sm:text-sm bg-zinc-50 border border-zinc-200 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 resize-none"
            />
          </div>

          {/* Phone Config Setting Toggle */}
          <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-600">
                <PhoneCall className="w-3.5 h-3.5 text-zinc-500" />
                <span>
                  Business Line: <strong className="text-zinc-900 font-mono">{whatsAppPhone}</strong>
                </span>
              </div>
              <button
                onClick={() => setIsEditingPhone(!isEditingPhone)}
                className="text-xs text-emerald-700 font-medium hover:underline cursor-pointer"
              >
                {isEditingPhone ? 'Cancel' : 'Change Phone'}
              </button>
            </div>

            {isEditingPhone && (
              <div className="mt-3 pt-3 border-t border-zinc-200 space-y-2">
                <span className="text-[11px] text-zinc-500 block">
                  Enter your international phone number (with country code, e.g. +1 555 123 4567 or +44 7911 123456) to test redirect:
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    className="flex-1 bg-white border border-zinc-300 rounded px-2 py-1 text-xs font-mono"
                  />
                  <button
                    onClick={handleSavePhone}
                    className="px-3 py-1 bg-zinc-900 text-white rounded text-xs font-semibold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleStartChat}
            className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Open in WhatsApp &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
