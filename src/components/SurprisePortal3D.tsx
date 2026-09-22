import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, Volume2, RefreshCw, Flame, ArrowRight, Star, Coffee } from 'lucide-react';
import { playSurpriseMelody, playCandleBlowSound } from '../utils/audioCelebration';

interface SurprisePortal3DProps {
  onOpenNicknamesHub: () => void;
}

export function SurprisePortal3D({ onOpenNicknamesHub }: SurprisePortal3DProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlown, setIsBlown] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt calculation based on touch/mouse position
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isOpen) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 24, y: -y * 24 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Trigger grand celebration blast
  const triggerHeartConfetti = () => {
    try {
      // Deep pink & fuchsia burst
      confetti({
        particleCount: 75,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#db2777', '#be185d', '#ec4899', '#f43f5e', '#fb7185', '#fef08a'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#db2777', '#f472b6', '#e11d48'],
        });
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#ec4899', '#be185d', '#ffd700'],
        });
      }, 250);
    } catch {
      // Confetti fallback
    }
  };

  const handleOpenPortal = () => {
    setIsOpen(true);
    triggerHeartConfetti();
    playSurpriseMelody();
  };

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    playCandleBlowSound();
    triggerHeartConfetti();
  };

  const handleReplay = () => {
    setIsOpen(false);
    setIsBlown(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative z-10 py-2 sm:py-4">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ============================================================
             STATE 1: 3D SURPRISE PORTAL (UNOPENED 3D HEART GIFT BOX)
             ============================================================ */
          <motion.div
            key="portal-gate"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.12, rotateY: 90 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-md sm:max-w-lg perspective-1000 px-2"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleOpenPortal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpenPortal();
              }}
              style={{
                transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
                transition: 'transform 0.12s ease-out',
              }}
              className="group cursor-pointer relative bg-gradient-to-b from-[#5c0828] via-[#831843] to-[#4a0420] rounded-3xl p-7 sm:p-10 text-center shadow-2xl border-2 border-pink-500/70 animate-glow-pulse preserve-3d select-none overflow-hidden"
            >
              {/* Internal Glowing Heart Grid */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/25 via-transparent to-transparent pointer-events-none" 
              />
              
              {/* Floating Sparkles around Portal */}
              <div className="absolute top-4 left-4 text-pink-300/70 animate-float text-lg">✨</div>
              <div className="absolute top-6 right-6 text-pink-300/70 animate-float [animation-delay:1s] text-xl">☕</div>
              <div className="absolute bottom-6 left-6 text-pink-300/70 animate-float [animation-delay:2s] text-lg">💖</div>
              <div className="absolute bottom-4 right-5 text-pink-300/70 animate-float [animation-delay:0.5s] text-xl">👑</div>

              {/* Portal Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-semibold mb-5 shadow-inner">
                <Sparkles className="w-4 h-4 text-pink-300 animate-spin" />
                <span>Special Surprise Box</span>
              </div>

              {/* 3D Heart Centerpiece */}
              <div className="relative my-4 flex justify-center items-center">
                <div className="absolute w-40 h-40 rounded-full bg-pink-600/30 blur-xl animate-pulse pointer-events-none" />
                <div className="absolute w-32 h-32 rounded-full border border-pink-400/40 animate-spin [animation-duration:12s] pointer-events-none" />

                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-400 flex items-center justify-center shadow-2xl shadow-pink-600/60 border-2 border-pink-200/60 animate-heartbeat transform group-hover:scale-110 transition-transform duration-300">
                  <div className="relative flex flex-col items-center justify-center">
                    <Heart className="w-14 h-14 sm:w-16 sm:h-16 text-white fill-white drop-shadow-md" />
                    <Gift className="w-6 h-6 text-pink-100 absolute -bottom-1" />
                  </div>
                </div>
              </div>

              {/* Target Name as requested */}
              <h2 className="text-xl sm:text-2xl font-bold text-pink-200 mt-4 tracking-tight">
                A Grand Surprise for
              </h2>
              <div className="text-2xl sm:text-3xl font-black text-white font-serif tracking-tight mt-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-200 to-amber-200">
                  {'{ Lalee ( Miss Chai ) }'}
                </span>
              </div>

              <p className="text-pink-200/90 text-xs sm:text-sm mt-3 font-medium max-w-xs mx-auto">
                Ek baar tap karke apna advance birthday surprise portal unlock karein! 🎁
              </p>

              {/* Open Action Button Indicator */}
              <div className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-pink-600/50 group-hover:shadow-pink-500/80 group-hover:scale-105 active:scale-95 transition-all min-h-[44px]">
                <Heart className="w-4 h-4 fill-white animate-pulse" />
                <span>Open Surprise Portal ✨</span>
              </div>

              <p className="text-[11px] text-pink-300/70 mt-3">
                Tap anywhere to unlock
              </p>
            </div>
          </motion.div>
        ) : (
          /* ============================================================
             STATE 2: UNLOCKED SURPRISE PORTAL WITH 3D EFFECTS
             "Miss Chai Happy birthday Advance"
             ============================================================ */
          <motion.div
            key="portal-content"
            initial={{ opacity: 0, scale: 0.85, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-xl px-2"
          >
            <div className="bg-gradient-to-br from-[#500724] via-[#750b37] to-[#42041a] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-400/60 relative overflow-hidden text-center text-white">
              {/* Background ambient lighting */}
              <div 
                aria-hidden="true" 
                className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" 
              />
              <div 
                aria-hidden="true" 
                className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/25 rounded-full blur-3xl pointer-events-none" 
              />

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/25 border border-pink-300/50 text-pink-200 text-xs sm:text-sm font-bold mb-4 shadow-sm">
                <Coffee className="w-3.5 h-3.5 text-amber-300" />
                <span>Special Advance Surprise Unlocked</span>
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-spin" />
              </div>

              {/* Grand Advance Birthday Title as requested */}
              <div className="relative my-2">
                <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-200 to-amber-200 font-serif leading-tight">
                  Miss Chai Happy Birthday in Advance! ☕🎉
                </h1>
                <p className="text-pink-300 text-xs sm:text-sm font-bold uppercase tracking-widest mt-1">
                  Dedicated with all love & care
                </p>
              </div>

              {/* Name Display */}
              <div className="my-3">
                <span className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_14px_rgba(236,72,153,0.6)]">
                  {'{ Lalee ( Miss Chai ) }'} 👑💖
                </span>
              </div>

              {/* Date Badge */}
              <div className="inline-flex items-center gap-2 bg-pink-950/80 border border-pink-400/40 text-pink-200 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm my-2 shadow-inner">
                <span>📅 23rd November</span>
                <span className="text-pink-400">•</span>
                <span className="text-amber-200">The Grand Day!</span>
              </div>

              {/* Heartfelt Advance Note */}
              <div className="bg-pink-950/60 border border-pink-500/30 rounded-2xl p-4 sm:p-5 my-4 text-left text-pink-100 text-sm sm:text-base leading-relaxed relative shadow-inner">
                <div className="flex items-center gap-2 text-pink-300 font-bold text-xs uppercase tracking-wider mb-2">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                  <span>Special Birthday Message for You:</span>
                </div>
                <p className="font-serif italic text-base sm:text-lg text-pink-50 mb-2">
                  &ldquo;Aapke aane wale birthday par aapki zindagi me dher saari khushiyan, kamyabi aur sukoon ho! Chai ki tarah har subah taazgi se bhari ho aur aapki muskaan hamesha aisi hi chamakti rahe.&rdquo;
                </p>
                <p className="text-pink-200/90 text-xs sm:text-sm">
                  Advance birthday wishes sent with warm hugs, pure blessings, and lots of love. You are truly one of a kind! ✨
                </p>
              </div>

              {/* Interactive Birthday Cake & Candle */}
              <div className="bg-gradient-to-r from-pink-900/50 via-rose-800/50 to-pink-900/50 border border-pink-400/30 rounded-2xl p-4 my-3 flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-pink-200">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Interactive Birthday Cake</span>
                </div>

                <div 
                  onClick={handleBlowCandle}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleBlowCandle();
                  }}
                  className="cursor-pointer group flex flex-col items-center justify-center p-2 rounded-xl hover:bg-pink-800/30 transition-colors select-none min-h-[44px]"
                >
                  {/* Candle & Flame */}
                  <div className="flex flex-col items-center mb-1">
                    {!isBlown ? (
                      <div className="relative">
                        <div className="w-3 h-5 bg-amber-400 rounded-full animate-pulse blur-[1px]" />
                        <div className="w-2 h-3 bg-white rounded-full absolute inset-0 m-auto" />
                      </div>
                    ) : (
                      <div className="text-xs text-slate-300 italic flex items-center gap-1">
                        <span>💨 (Wish Made!)</span>
                      </div>
                    )}
                    <div className="w-1.5 h-4 bg-pink-200 rounded-xs mt-0.5" />
                  </div>

                  {/* Cake Icon */}
                  <div className="text-4xl sm:text-5xl transform group-hover:scale-110 transition-transform">
                    🎂
                  </div>

                  <p className="text-xs font-medium text-pink-200 mt-2">
                    {isBlown ? (
                      <span className="text-amber-200 font-bold">
                        ✨ Candle blown! May all your dreams come true, Miss Chai! ✨
                      </span>
                    ) : (
                      <span className="underline decoration-pink-400 decoration-dotted">
                        Click the candle to make a secret wish & blow! 🕯️
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* POPUP / NEXT STEP BUTTON FOR NICKNAME SECTIONS */}
              <div className="my-5 p-1">
                <button
                  type="button"
                  onClick={onOpenNicknamesHub}
                  className="w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-400 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-pink-600/50 hover:shadow-pink-500/70 active:scale-98 transition-all cursor-pointer border border-pink-200/40 min-h-[50px]"
                >
                  <Gift className="w-5 h-5 text-amber-200 animate-bounce" />
                  <span>Open 8 Nickname Surprise Chapters 💖</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-[11px] text-pink-300/80 mt-2">
                  Special personalized wishes for Miss Chai, Silky, Cutie, Lalee ji & more!
                </p>
              </div>

              {/* Auxiliary Controls */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 border-t border-pink-500/20">
                <button
                  type="button"
                  onClick={() => {
                    triggerHeartConfetti();
                    playSurpriseMelody();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-900/80 hover:bg-pink-800 text-pink-100 font-semibold text-xs border border-pink-400/40 transition-colors cursor-pointer min-h-[44px]"
                >
                  <Volume2 className="w-4 h-4 text-pink-300" />
                  <span>Play Birthday Melody</span>
                </button>

                <button
                  type="button"
                  onClick={handleReplay}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-pink-950/80 hover:bg-pink-900 text-pink-300 hover:text-white font-medium text-xs border border-pink-500/20 transition-colors cursor-pointer min-h-[44px]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-lock Portal</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
