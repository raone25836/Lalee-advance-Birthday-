import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { SurprisePortal3D } from './components/SurprisePortal3D';
import { NicknamesHub } from './components/NicknamesHub';
import { NicknameDetailModal } from './components/NicknameDetailModal';
import { FloatingHearts } from './components/FloatingHearts';
import { WishForm } from './components/WishForm';
import { WishesBoard } from './components/WishesBoard';
import { SuccessNotification } from './components/SuccessNotification';
import { NICKNAMES_DATA, type NicknameWish } from './data/nicknamesData';
import type { Wish } from './types';
import { ArrowLeft, Gift, Heart, Sparkles, MessageSquareHeart } from 'lucide-react';

type ViewMode = 'main' | 'hub' | 'detail' | 'wishes';

const INITIAL_WISHES: Wish[] = [
  {
    id: 'wish-featured-1',
    name: 'Dil Se Duayein ✨',
    message: 'Wishing our dearest Lalee (Miss Chai) the happiest birthday in advance! May your smile stay radiant, your life full of peace, and all your dreams come true! 🌸💖',
    createdAt: 'Featured',
    isDefault: true,
    likes: 24,
  },
  {
    id: 'wish-featured-2',
    name: 'Chai Lovers Squad ☕',
    message: 'Happy Birthday in Advance, Miss Chai! Har subah aapke jaisi meethi aur taazgi bhari ho! Advance me dher saara pyar aur blessings! 🎂👑',
    createdAt: 'Featured',
    isDefault: true,
    likes: 18,
  },
];

export default function App() {
  const [view, setView] = useState<ViewMode>('main');
  const [selectedNickname, setSelectedNickname] = useState<NicknameWish | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Initialize wishes from localStorage
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const saved = localStorage.getItem('lalee_birthday_wishes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // LocalStorage access fallback
    }
    return INITIAL_WISHES;
  });

  // Persist wishes
  const saveWishes = useCallback((updated: Wish[]) => {
    setWishes(updated);
    try {
      localStorage.setItem('lalee_birthday_wishes', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }, []);

  // Handle browser & phone hardware back button smoothly
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ view: 'main' }, '');
    }

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (!state || state.view === 'main') {
        setView('main');
        setSelectedNickname(null);
      } else if (state.view === 'hub') {
        setView('hub');
        setSelectedNickname(null);
      } else if (state.view === 'wishes') {
        setView('wishes');
        setSelectedNickname(null);
      } else if (state.view === 'detail' && state.id) {
        const found = NICKNAMES_DATA.find((n) => n.id === state.id);
        if (found) {
          setSelectedNickname(found);
          setView('detail');
        } else {
          setView('hub');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Safe navigation handlers that push to browser history
  const goToMain = useCallback(() => {
    window.history.pushState({ view: 'main' }, '');
    setView('main');
    setSelectedNickname(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToHub = useCallback(() => {
    window.history.pushState({ view: 'hub' }, '');
    setView('hub');
    setSelectedNickname(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToWishes = useCallback(() => {
    window.history.pushState({ view: 'wishes' }, '');
    setView('wishes');
    setSelectedNickname(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToDetail = useCallback((nickname: NicknameWish) => {
    window.history.pushState({ view: 'detail', id: nickname.id }, '');
    setSelectedNickname(nickname);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBackOneStep = useCallback(() => {
    if (view === 'detail') {
      window.history.pushState({ view: 'hub' }, '');
      setView('hub');
      setSelectedNickname(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'hub' || view === 'wishes') {
      window.history.pushState({ view: 'main' }, '');
      setView('main');
      setSelectedNickname(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [view]);

  // Next / Prev handlers inside detail view
  const handleNextNickname = useCallback(() => {
    if (!selectedNickname) return;
    const currentIndex = NICKNAMES_DATA.findIndex((n) => n.id === selectedNickname.id);
    const nextIndex = (currentIndex + 1) % NICKNAMES_DATA.length;
    const nextItem = NICKNAMES_DATA[nextIndex];
    window.history.replaceState({ view: 'detail', id: nextItem.id }, '');
    setSelectedNickname(nextItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedNickname]);

  const handlePrevNickname = useCallback(() => {
    if (!selectedNickname) return;
    const currentIndex = NICKNAMES_DATA.findIndex((n) => n.id === selectedNickname.id);
    const prevIndex = (currentIndex - 1 + NICKNAMES_DATA.length) % NICKNAMES_DATA.length;
    const prevItem = NICKNAMES_DATA[prevIndex];
    window.history.replaceState({ view: 'detail', id: prevItem.id }, '');
    setSelectedNickname(prevItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedNickname]);

  // Add new wish from guest
  const handleAddWish = useCallback((name: string, message: string) => {
    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      name,
      message,
      createdAt: 'Just now',
      likes: 1,
    };

    const updated = [newWish, ...wishes];
    saveWishes(updated);

    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#db2777', '#f43f5e', '#ec4899', '#fef08a'],
      });
    } catch {
      // Fallback
    }

    setSuccessToast(`Thank you, ${name}! Your wish was posted successfully 💖`);
  }, [wishes, saveWishes]);

  // Toggle like
  const handleToggleLike = useCallback((id: string) => {
    const updated = wishes.map((w) => {
      if (w.id === id) {
        return { ...w, likes: (w.likes ?? 0) + 1 };
      }
      return w;
    });
    saveWishes(updated);
  }, [wishes, saveWishes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#45051e] via-[#700b33] to-[#9d174d] text-white py-3 px-3 sm:px-6 flex flex-col justify-start items-center relative overflow-x-hidden selection:bg-pink-300 selection:text-pink-950 font-sans">
      
      {/* Toast alert for wish submission */}
      <SuccessNotification
        message={successToast}
        onDismiss={() => setSuccessToast(null)}
      />

      {/* 3D Floating Hearts Background Layer */}
      <FloatingHearts />

      {/* Decorative ambient deep pink blur orbs */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-rose-600/25 rounded-full blur-3xl pointer-events-none -z-0" 
      />

      {/* Top Mobile Status Header */}
      <header className="w-full max-w-xl mx-auto flex flex-col gap-2 py-2 px-1 mb-2 relative z-20 text-xs text-pink-200/90">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Advance Birthday Portal</span>
          </div>
          <div className="font-semibold text-[11px] bg-pink-950/70 px-2.5 py-1 rounded-full border border-pink-400/30">
            23rd Nov • {'{ Lalee ( Miss Chai ) }'}
          </div>
        </div>

        {/* Navigation Switcher Bar */}
        <nav aria-label="Portal Navigation" className="flex items-center justify-center gap-1.5 bg-pink-950/60 p-1 rounded-2xl border border-pink-500/30 backdrop-blur-md">
          <button
            type="button"
            onClick={goToMain}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              view === 'main'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'text-pink-200 hover:text-white hover:bg-pink-900/50'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Portal</span>
          </button>

          <button
            type="button"
            onClick={goToHub}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              view === 'hub' || view === 'detail'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'text-pink-200 hover:text-white hover:bg-pink-900/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>8 Nicknames</span>
          </button>

          <button
            type="button"
            onClick={goToWishes}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              view === 'wishes'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'text-pink-200 hover:text-white hover:bg-pink-900/50'
            }`}
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Wishes ({wishes.length})</span>
          </button>
        </nav>
      </header>

      {/* MAIN VIEWPORT SWITCHER */}
      <main className="w-full max-w-xl flex-1 flex flex-col items-center justify-start relative z-10">
        {/* VIEW 1: Main 3D Surprise Portal */}
        {view === 'main' && (
          <SurprisePortal3D 
            onOpenNicknamesHub={goToHub} 
            onOpenWishesBoard={goToWishes}
          />
        )}

        {/* VIEW 2: Nicknames Hub (All 8 Nickname Surprise Chapters) */}
        {view === 'hub' && (
          <NicknamesHub
            onBack={goBackOneStep}
            onSelectNickname={goToDetail}
          />
        )}

        {/* VIEW 3: Dedicated Nickname Surprise Card & Long Wish */}
        {view === 'detail' && selectedNickname && (
          <NicknameDetailModal
            nickname={selectedNickname}
            onBack={goBackOneStep}
            onNext={handleNextNickname}
            onPrev={handlePrevNickname}
            currentIndex={NICKNAMES_DATA.findIndex((n) => n.id === selectedNickname.id)}
            totalCount={NICKNAMES_DATA.length}
          />
        )}

        {/* VIEW 4: Guest Wishes Board & Wish Form */}
        {view === 'wishes' && (
          <div className="w-full flex flex-col pb-16">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={goBackOneStep}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-900/90 hover:bg-pink-800 text-pink-100 font-bold text-xs sm:text-sm border border-pink-400/40 shadow-sm active:scale-95 transition-all cursor-pointer min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4 text-pink-300" />
                <span>Back</span>
              </button>

              <div className="text-right">
                <span className="text-[11px] font-bold text-pink-300 uppercase tracking-wider block">
                  Guest Wishes
                </span>
                <span className="text-xs sm:text-sm font-black text-white">
                  For Miss Chai ☕💖
                </span>
              </div>
            </div>

            <WishForm onAddWish={handleAddWish} />
            <WishesBoard wishes={wishes} onToggleLike={handleToggleLike} />
          </div>
        )}
      </main>

      {/* BOTTOM MOBILE BRANDING BAR */}
      <footer className="w-full max-w-xl text-center py-3 text-[11px] text-pink-300/60 border-t border-pink-500/20 mt-auto relative z-20">
        <p>Crafted with love for Lalee (Miss Chai) • 23rd November Celebration ☕💖</p>
      </footer>
    </div>
  );
}
