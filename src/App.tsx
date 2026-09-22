import { useState, useEffect, useCallback } from 'react';
import { SurprisePortal3D } from './components/SurprisePortal3D';
import { NicknamesHub } from './components/NicknamesHub';
import { NicknameDetailModal } from './components/NicknameDetailModal';
import { FloatingHearts } from './components/FloatingHearts';
import { NICKNAMES_DATA, type NicknameWish } from './data/nicknamesData';

type ViewMode = 'main' | 'hub' | 'detail';

export default function App() {
  const [view, setView] = useState<ViewMode>('main');
  const [selectedNickname, setSelectedNickname] = useState<NicknameWish | null>(null);

  // Handle browser & phone hardware back button smoothly
  useEffect(() => {
    // Set initial history state if not set
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
  const goToHub = useCallback(() => {
    window.history.pushState({ view: 'hub' }, '');
    setView('hub');
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
    } else if (view === 'hub') {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#45051e] via-[#700b33] to-[#9d174d] text-white py-4 px-3 sm:px-6 flex flex-col justify-start items-center relative overflow-x-hidden selection:bg-pink-300 selection:text-pink-950 font-sans">
      
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
      <header className="w-full max-w-xl mx-auto flex items-center justify-between py-2 px-1 mb-2 relative z-20 text-xs text-pink-200/90">
        <div className="flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Advance Birthday Portal</span>
        </div>
        <div className="font-semibold text-[11px] bg-pink-950/60 px-2.5 py-1 rounded-full border border-pink-400/30">
          23rd Nov • {'{ Lalee ( Miss Chai ) }'}
        </div>
      </header>

      {/* MAIN VIEWPORT SWITCHER */}
      <main className="w-full max-w-xl flex-1 flex flex-col items-center justify-start relative z-10">
        {/* VIEW 1: Main 3D Surprise Portal */}
        {view === 'main' && (
          <SurprisePortal3D onOpenNicknamesHub={goToHub} />
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
      </main>

      {/* BOTTOM MOBILE BRANDING BAR */}
      <footer className="w-full max-w-xl text-center py-3 text-[11px] text-pink-300/60 border-t border-pink-500/20 mt-auto relative z-20">
        <p>Crafted with love for Lalee (Miss Chai) • 23rd November Celebration ☕💖</p>
      </footer>
    </div>
  );
}
