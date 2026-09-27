import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler, MessageCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, setIsWhatsAppModalOpen } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [activeTab, setActiveTab] = useState<'tops' | 'bottoms'>('tops');

  if (!isSizeGuideOpen) return null;

  const topsData = [
    { size: 'S', chestIn: '40 - 42', lengthIn: '27.5', shoulderIn: '20.5', sleeveIn: '23.0', chestCm: '101 - 106', lengthCm: '70', shoulderCm: '52', sleeveCm: '58' },
    { size: 'M', chestIn: '42 - 44', lengthIn: '28.5', shoulderIn: '21.5', sleeveIn: '24.0', chestCm: '107 - 112', lengthCm: '72', shoulderCm: '54', sleeveCm: '61' },
    { size: 'L', chestIn: '44 - 46', lengthIn: '29.5', shoulderIn: '22.5', sleeveIn: '25.0', chestCm: '113 - 118', lengthCm: '75', shoulderCm: '57', sleeveCm: '63' },
    { size: 'XL', chestIn: '46 - 48', lengthIn: '30.5', shoulderIn: '23.5', sleeveIn: '25.5', chestCm: '119 - 124', lengthCm: '77', shoulderCm: '60', sleeveCm: '65' },
    { size: 'XXL', chestIn: '48 - 50', lengthIn: '31.5', shoulderIn: '24.5', sleeveIn: '26.0', chestCm: '125 - 130', lengthCm: '80', shoulderCm: '62', sleeveCm: '66' },
  ];

  const bottomsData = [
    { size: 'S (30)', waistIn: '29 - 31', inseamIn: '30.0', outseamIn: '40.5', thighIn: '25.0', waistCm: '74 - 79', inseamCm: '76', outseamCm: '103', thighCm: '63' },
    { size: 'M (32)', waistIn: '31 - 33', inseamIn: '30.5', outseamIn: '41.0', thighIn: '26.0', waistCm: '80 - 84', inseamCm: '77', outseamCm: '104', thighCm: '66' },
    { size: 'L (34)', waistIn: '33 - 35', inseamIn: '31.0', outseamIn: '41.5', thighIn: '27.0', waistCm: '85 - 89', inseamCm: '79', outseamCm: '105', thighCm: '69' },
    { size: 'XL (36)', waistIn: '35 - 38', inseamIn: '31.5', outseamIn: '42.0', thighIn: '28.0', waistCm: '90 - 96', inseamCm: '80', outseamCm: '107', thighCm: '71' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-zinc-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-zinc-900" />
            <h2 className="text-lg font-bold text-zinc-950 font-display">Fleex Sizing &amp; Fit Guide</h2>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-zinc-200">
            <button
              onClick={() => setActiveTab('tops')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'tops' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Hoodies &amp; Tops
            </button>
            <button
              onClick={() => setActiveTab('bottoms')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'bottoms' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Cargos &amp; Bottoms
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-600">
            <span>Unit:</span>
            <button
              onClick={() => setUnit('inches')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                unit === 'inches' ? 'bg-zinc-900 text-white font-bold' : 'bg-white border border-zinc-200'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                unit === 'cm' ? 'bg-zinc-900 text-white font-bold' : 'bg-white border border-zinc-200'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-6 overflow-x-auto">
          {activeTab === 'tops' ? (
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Chest ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th className="py-2.5 px-3">Body Length</th>
                  <th className="py-2.5 px-3">Shoulder</th>
                  <th className="py-2.5 px-3">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-800 font-mono">
                {topsData.map((row) => (
                  <tr key={row.size} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-zinc-950 font-sans">{row.size}</td>
                    <td className="py-2.5 px-3 tabular-nums">{unit === 'inches' ? row.chestIn : row.chestCm}</td>
                    <td className="py-2.5 px-3 tabular-nums">{unit === 'inches' ? row.lengthIn : row.lengthCm}</td>
                    <td className="py-2.5 px-3 tabular-nums">{unit === 'inches' ? row.shoulderIn : row.shoulderCm}</td>
                    <td className="py-2.5 px-3 tabular-nums">{unit === 'inches' ? row.sleeveIn : row.sleeveCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Waist ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th className="py-2.5 px-3">Inseam</th>
                  <th className="py-2.5 px-3">Outseam</th>
                  <th className="py-2.5 px-3">Thigh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-800 font-mono">
                {bottomsData.map((row) => (
                  <tr key={row.size} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-zinc-950 font-sans">{row.size}</td>
                    <td className="py-2.5 px-3 tabular-nums">{unit === 'inches' ? row.waistIn : row.waistCm}</td>
                    <td className="py-2.5 px-3 tabular-nums">{unit === 'inches' ? row.inseamIn : row.inseamCm}</td>
                    <td className="py-2.5 px-3 tabular-nums">{unit === 'inches' ? row.outseamIn : row.outseamCm}</td>
                    <td className="py-2.5 px-3 tabular-nums">{unit === 'inches' ? row.thighIn : row.thighCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-6 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-center justify-between gap-3 text-xs">
            <span className="text-emerald-900">
              Unsure which size fits best? Our team provides tailored fitting advice over WhatsApp.
            </span>
            <button
              onClick={() => {
                setIsSizeGuideOpen(false);
                setIsWhatsAppModalOpen(true);
              }}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
