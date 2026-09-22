import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Volume2, 
  ChevronRight, 
  ChevronLeft, 
  Share2, 
  Copy, 
  Check, 
  PartyPopper 
} from 'lucide-react';
import { useState } from 'react';
import type { NicknameWish } from '../data/nicknamesData';
import { playSurpriseMelody } from '../utils/audioCelebration';

interface NicknameDetailModalProps {
  nickname: NicknameWish;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalCount: number;
}

export function NicknameDetailModal({
  nickname,
  onBack,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
}: NicknameDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on open
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    // Trigger welcoming confetti for this nickname
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#db2777', '#f43f5e', '#ec4899', '#fef08a'],
      });
    } catch {
      // Fallback
    }
  }, [nickname.id]);

  const handleBurstConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#db2777', '#be185d', '#ec4899', '#ffd700'],
      });
    } catch {
      // Fallback
    }
  };

  const handleCopyWish = async () => {
    try {
      const textToCopy = `Special Birthday Wish for ${nickname.name}:\n\n${nickname.wishes}\n\n— ${nickname.specialNote}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <motion.div
      key={nickname.id}
      initial={{ opacity: 0, x: 25, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -25, scale: 0.96 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-xl mx-auto flex flex-col pb-16"
      ref={containerRef}
    >
      {/* MOBILE-OPTIMIZED TOP BAR WITH BACK BUTTON */}
      <div className="sticky top-2 z-30 mb-4 flex items-center justify-between gap-2 p-2 rounded-2xl bg-pink-950/80 backdrop-blur-lg border border-pink-500/40 shadow-xl">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back to Nicknames list"
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-pink-900/90 hover:bg-pink-800 text-pink-100 font-bold text-sm border border-pink-400/40 shadow-sm active:scale-95 transition-all cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-5 h-5 text-pink-300" />
          <span>Back</span>
        </button>

        <div className="text-center">
          <span className="text-xs font-bold text-pink-300 uppercase tracking-widest block">
            Chapter {currentIndex + 1} of {totalCount}
          </span>
          <span className="text-sm font-extrabold text-white truncate max-w-[140px] block">
            {nickname.name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous nickname wish"
            className="p-2.5 rounded-xl bg-pink-900/60 hover:bg-pink-800 text-pink-200 border border-pink-500/30 active:scale-95 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next nickname wish"
            className="p-2.5 rounded-xl bg-pink-900/60 hover:bg-pink-800 text-pink-200 border border-pink-500/30 active:scale-95 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3D SURPRISE CARD */}
      <div className="bg-gradient-to-b from-[#5c0828] via-[#831843] to-[#4a0420] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-400/60 text-white relative overflow-hidden">
        {/* Ambient Glows */}
        <div 
          aria-hidden="true" 
          className="absolute -top-16 -right-16 w-52 h-52 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" 
        />
        <div 
          aria-hidden="true" 
          className="absolute -bottom-16 -left-16 w-52 h-52 bg-rose-600/30 rounded-full blur-3xl pointer-events-none" 
        />

        {/* Floating Icons & Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-500/30 border border-pink-300/40 text-pink-200 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-spin" />
            <span>Dedicated Persona #{currentIndex + 1}</span>
          </span>

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-2xl shadow-lg shadow-pink-600/50 border border-pink-200/50 animate-heartbeat">
            {nickname.emoji}
          </div>
        </div>

        {/* Title of Nickname */}
        <div className="text-left mb-3">
          <p className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-1">
            Surprise Wish For
          </p>
          <h1 className="text-3xl sm:text-4xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-100 to-amber-200 tracking-tight">
            {nickname.name}
          </h1>
          <p className="text-pink-200/90 text-sm font-medium mt-1">
            {nickname.tagline}
          </p>
        </div>

        {/* Badges List */}
        <div className="flex flex-wrap gap-1.5 my-3">
          {nickname.badges.map((badge, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-pink-950/60 border border-pink-400/30 text-pink-200"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* THE DEEP PERSONALIZED BIRTHDAY WISH */}
        <div className="my-5 p-5 rounded-2xl bg-pink-950/70 border border-pink-500/40 shadow-inner text-left">
          <div className="flex items-center gap-2 text-pink-300 font-bold text-xs uppercase tracking-wider mb-3">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
            <span>Heartfelt Advance Message</span>
          </div>

          <div className="text-pink-50 text-sm sm:text-base leading-relaxed space-y-3 font-sans whitespace-pre-line">
            {nickname.wishes}
          </div>
        </div>

        {/* SPECIAL QUOTE / SHAYARI BOX */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-900/80 via-rose-900/80 to-purple-900/80 border-l-4 border-l-pink-400 border-y border-r border-pink-400/30 text-left my-4 shadow-sm">
          <p className="text-xs font-bold text-pink-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Special Dedicated Note</span>
          </p>
          <p className="font-serif italic text-sm sm:text-base text-pink-100">
            &ldquo;{nickname.specialNote}&rdquo;
          </p>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              handleBurstConfetti();
              playSurpriseMelody();
            }}
            className="flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-transform cursor-pointer min-h-[44px]"
          >
            <PartyPopper className="w-4 h-4 text-amber-200" />
            <span>Pop Confetti & Melody</span>
          </button>

          <button
            type="button"
            onClick={handleCopyWish}
            className="flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-pink-900/80 hover:bg-pink-800 text-pink-100 font-semibold text-xs sm:text-sm border border-pink-400/40 active:scale-95 transition-transform cursor-pointer min-h-[44px]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-pink-300" />
                <span>Copy Wish</span>
              </>
            )}
          </button>
        </div>

        {/* BOTTOM STEP CONTROLS FOR MOBILE */}
        <div className="mt-6 pt-4 border-t border-pink-500/30 flex items-center justify-between text-xs text-pink-300">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-1 text-pink-200 hover:text-white underline cursor-pointer p-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Persona</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1 text-pink-200 hover:text-white underline cursor-pointer p-1"
          >
            <span>Next Persona</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
