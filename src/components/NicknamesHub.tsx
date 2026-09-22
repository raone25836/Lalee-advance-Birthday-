import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Heart, Gift, ChevronRight } from 'lucide-react';
import { NICKNAMES_DATA, type NicknameWish } from '../data/nicknamesData';

interface NicknamesHubProps {
  onBack: () => void;
  onSelectNickname: (nickname: NicknameWish) => void;
}

export function NicknamesHub({ onBack, onSelectNickname }: NicknamesHubProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto flex flex-col pb-16"
    >
      {/* MOBILE-OPTIMIZED TOP BAR WITH BACK BUTTON */}
      <div className="sticky top-2 z-30 mb-5 flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-pink-950/85 backdrop-blur-lg border border-pink-500/40 shadow-xl">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to main surprise portal"
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-pink-900/90 hover:bg-pink-800 text-pink-100 font-bold text-sm border border-pink-400/40 shadow-sm active:scale-95 transition-all cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-5 h-5 text-pink-300" />
          <span>Back to Main</span>
        </button>

        <div className="text-right pr-2">
          <span className="text-[11px] font-bold text-pink-300 uppercase tracking-wider block">
            Special Surprise Box
          </span>
          <span className="text-xs sm:text-sm font-black text-white">
            8 Chapters for Her 💖
          </span>
        </div>
      </div>

      {/* HEADER HERO */}
      <div className="text-center mb-6 px-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs font-bold mb-2.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-spin" />
          <span>Personalized Surprise Gallery</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
          Surprise Wishes for <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-200 to-amber-200">{"{ Lalee ( Miss Chai ) }"}</span>
        </h1>

        <p className="text-pink-200/80 text-xs sm:text-sm mt-1.5 max-w-md mx-auto">
          Aapke har ek pyare naam ke peeche ek anmol ehsaas hai. Kisi bhi card par tap karke apna special surprise wish unlock karein!
        </p>
      </div>

      {/* NICKNAMES GRID (MOBILE RESPONSIVE 1-2 COLUMNS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 px-1">
        {NICKNAMES_DATA.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectNickname(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectNickname(item);
            }}
            className="group cursor-pointer text-left bg-gradient-to-br from-[#60092c]/95 to-[#831843]/90 hover:from-[#750b37] hover:to-[#9d174d] rounded-2xl p-4 sm:p-5 border border-pink-400/40 hover:border-pink-300 shadow-xl shadow-pink-950/40 transition-all select-none relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div 
              aria-hidden="true" 
              className="absolute -right-6 -bottom-6 w-24 h-24 bg-pink-500/15 rounded-full blur-xl pointer-events-none group-hover:bg-pink-400/25 transition-colors" 
            />

            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="w-12 h-12 rounded-xl bg-pink-950/60 border border-pink-400/40 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                {item.emoji}
              </div>

              <span className="text-[11px] font-bold text-pink-300/80 px-2 py-0.5 rounded-full bg-pink-950/40 border border-pink-500/30">
                #{index + 1}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold font-serif text-white group-hover:text-pink-100 transition-colors flex items-center gap-1.5">
              <span>{item.name}</span>
            </h2>

            <p className="text-xs text-pink-200/80 mt-1 line-clamp-2 leading-relaxed">
              {item.tagline}
            </p>

            {/* Bottom Open action badge */}
            <div className="mt-3.5 pt-2.5 border-t border-pink-500/25 flex items-center justify-between text-xs font-bold text-pink-300 group-hover:text-white transition-colors">
              <span className="flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-pink-400" />
                <span>Open Secret Wish</span>
              </span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER INFO */}
      <div className="mt-8 text-center text-xs text-pink-300/70">
        <p>Advance Birthday Portal for Lalee (Miss Chai) • 23rd November 🌸💖</p>
      </div>
    </motion.div>
  );
}
