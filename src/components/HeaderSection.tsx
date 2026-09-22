import { useEffect, useState } from 'react';
import { Calendar, Sparkles, Heart } from 'lucide-react';

interface HeaderSectionProps {
  onCelebrate: () => void;
}

export function HeaderSection({ onCelebrate }: HeaderSectionProps) {
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(currentYear, 10, 23); // Month is 0-indexed, 10 = November
      
      // If Nov 23 has already passed this year, set to next year
      if (now.getTime() > targetDate.getTime() + 24 * 60 * 60 * 1000) {
        targetDate = new Date(currentYear + 1, 10, 23);
      }
      
      const diffTime = targetDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays > 0 ? diffDays : 0);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="text-center mb-8 relative">
      {/* Decorative Floating Sparkles */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-semibold mb-3 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
        <span>Celebration Countdown</span>
        <button
          type="button"
          onClick={onCelebrate}
          aria-label="Trigger confetti celebration"
          className="ml-1 cursor-pointer text-xs underline font-bold hover:text-rose-900 transition-colors"
        >
          ✨ Pop Confetti!
        </button>
      </div>

      {/* Main Heading */}
      <h1 
        id="main-heading"
        className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 drop-shadow-xs"
      >
        🎉 Happy Birthday in Advance! 🎉
      </h1>

      {/* Honoree Name */}
      <div className="my-3">
        <span 
          id="honoree-name"
          className="font-serif text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 inline-block drop-shadow-xs"
        >
          Lalee Patel
        </span>
      </div>

      {/* Date Badge */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-3">
        <div 
          id="date-badge" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 font-bold px-4 py-1.5 rounded-full border border-purple-200/70 shadow-xs text-sm sm:text-base"
        >
          <Calendar className="w-4 h-4 text-purple-700" />
          <span>📅 23rd November</span>
        </div>

        {daysRemaining !== null && daysRemaining > 0 && (
          <span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-700 font-medium px-3 py-1 rounded-full text-xs sm:text-sm border border-pink-200">
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            <span>{daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} to go</span>
          </span>
        )}
      </div>

      {/* Invitation Subtext */}
      <p 
        id="subtext-prompt" 
        className="text-slate-600 text-base sm:text-lg font-medium mt-3"
      >
        Drop your wishes below...
      </p>
    </header>
  );
}
