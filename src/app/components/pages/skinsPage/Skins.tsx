import { Palette, CheckCircle2, Lock } from 'lucide-react';
import { useState } from 'react';

// Placeholder data for skins
const CARD_SKINS = [
  { id: 1, name: 'Classic Blue', type: 'Card Back', unlocked: true, active: true, color: 'bg-blue-600' },
  { id: 2, name: 'Crimson Red', type: 'Card Back', unlocked: true, active: false, color: 'bg-red-600' },
  { id: 3, name: 'Midnight Black', type: 'Card Back', unlocked: false, active: false, color: 'bg-slate-900' },
  { id: 4, name: 'Royal Gold', type: 'Card Back', unlocked: false, active: false, color: 'bg-amber-500' },
];

const TABLE_SKINS = [
  { id: 5, name: 'Standard Green', type: 'Table Felt', unlocked: true, active: true, color: 'bg-green-700' },
  { id: 6, name: 'Casino Red', type: 'Table Felt', unlocked: true, active: false, color: 'bg-rose-800' },
  { id: 7, name: 'Ocean Blue', type: 'Table Felt', unlocked: false, active: false, color: 'bg-cyan-800' },
];

const Skins = () => {
  const [activeTab, setActiveTab] = useState<'cards' | 'tables'>('cards');

  const renderSkinsGrid = (skins: typeof CARD_SKINS) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {skins.map((skin) => (
        <div 
          key={skin.id}
          className={`relative group bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-2xl p-4 shadow-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
            skin.active 
              ? 'border-brand-burnt dark:border-brand-gold' 
              : 'border-brand-softgray/30 dark:border-white/10'
          }`}
        >
          {/* Skin Preview Box */}
          <div className={`w-full aspect-square rounded-xl mb-4 ${skin.color} shadow-inner relative overflow-hidden flex items-center justify-center`}>
            {!skin.unlocked && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <Lock className="w-8 h-8 text-white/70" />
              </div>
            )}
            {skin.active && (
              <div className="absolute top-3 right-3">
                <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" />
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-brand-charcoal dark:text-white">{skin.name}</h3>
            <p className="text-sm font-medium text-brand-charcoal/60 dark:text-brand-softgray/60 uppercase tracking-wider">{skin.type}</p>
          </div>

          <button 
            disabled={!skin.unlocked || skin.active}
            className={`w-full mt-4 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
              skin.active
                ? 'bg-brand-burnt/10 dark:bg-brand-gold/10 text-brand-burnt dark:text-brand-gold cursor-default'
                : skin.unlocked
                  ? 'bg-brand-charcoal dark:bg-white text-white dark:text-brand-charcoal hover:bg-brand-burnt dark:hover:bg-brand-gold hover:text-white cursor-pointer'
                  : 'bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-white/20 cursor-not-allowed'
            }`}
          >
            {skin.active ? 'Equipped' : skin.unlocked ? 'Equip' : 'Locked'}
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 flex flex-col items-center bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-6xl space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-brand-offwhite/90 dark:bg-brand-charcoal/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-brand-softgray dark:border-white/10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-brand-burnt/10 dark:bg-brand-gold/10 text-brand-burnt dark:text-brand-gold rounded-2xl flex items-center justify-center">
              <Palette className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-brand-charcoal dark:text-white tracking-tight">Cosmetics</h1>
              <p className="text-brand-charcoal/60 dark:text-brand-softgray/80">Customize your playing experience.</p>
            </div>
          </div>
          
          {/* Custom Tabs */}
          <div className="flex p-1 bg-brand-softgray/20 dark:bg-black/20 rounded-xl">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'cards'
                  ? 'bg-white dark:bg-brand-charcoal text-brand-charcoal dark:text-white shadow-md'
                  : 'text-brand-charcoal/60 dark:text-brand-softgray/60 hover:text-brand-charcoal dark:hover:text-white cursor-pointer'
              }`}
            >
              Card Backs
            </button>
            <button
              onClick={() => setActiveTab('tables')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'tables'
                  ? 'bg-white dark:bg-brand-charcoal text-brand-charcoal dark:text-white shadow-md'
                  : 'text-brand-charcoal/60 dark:text-brand-softgray/60 hover:text-brand-charcoal dark:hover:text-white cursor-pointer'
              }`}
            >
              Table Felts
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'cards' ? renderSkinsGrid(CARD_SKINS) : renderSkinsGrid(TABLE_SKINS)}
        </div>

      </div>
    </div>
  );
};

export default Skins;
