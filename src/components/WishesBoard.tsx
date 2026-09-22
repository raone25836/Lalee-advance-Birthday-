import { motion, AnimatePresence } from 'motion/react';
import { Heart, UserCheck, Clock } from 'lucide-react';
import type { Wish } from '../types';

interface WishesBoardProps {
  wishes: Wish[];
  onToggleLike: (id: string) => void;
}

export function WishesBoard({ wishes, onToggleLike }: WishesBoardProps) {
  return (
    <section className="mt-4">
      {/* HEADING: "Recent Wishes" */}
      <div className="flex items-center justify-between mb-4 border-b border-pink-500/30 pb-3">
        <div className="flex items-center gap-2">
          <h2 id="recent-wishes-heading" className="text-xl sm:text-2xl font-bold font-serif text-white">
            Guest Birthday Wishes
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-pink-500/30 border border-pink-400/40 text-pink-200 font-bold text-xs">
            {wishes.length}
          </span>
        </div>
        <span className="text-xs text-pink-300/80 font-medium hidden sm:inline">
          Latest wishes appear at top
        </span>
      </div>

      {/* CONTAINER: 'Wishes_List' */}
      <div id="Wishes_List" className="space-y-3.5">
        <AnimatePresence initial={false}>
          {wishes.map((wish) => (
            <motion.article
              key={wish.id}
              id={`wish-card-${wish.id}`}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-gradient-to-r from-[#5a0827]/90 to-[#7a0f38]/85 backdrop-blur-md rounded-2xl border border-pink-400/35 border-l-4 border-l-pink-400 p-4 sm:p-5 shadow-xl shadow-pink-950/40 relative"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-md ${
                    wish.isDefault
                      ? 'bg-pink-600 text-white border border-pink-300/50'
                      : 'bg-gradient-to-tr from-rose-500 to-amber-500 text-white'
                  }`}>
                    {wish.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
                      <span>{wish.name}</span>
                      {wish.isDefault && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-pink-950/70 border border-pink-400/30 text-pink-300 text-[10px] font-semibold">
                          <UserCheck className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-pink-300/70">
                      <Clock className="w-3 h-3" />
                      <span>{wish.createdAt}</span>
                    </div>
                  </div>
                </div>

                {/* Like Button */}
                <button
                  type="button"
                  onClick={() => onToggleLike(wish.id)}
                  aria-label={`Like wish from ${wish.name}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-950/60 hover:bg-pink-900 text-pink-200 hover:text-white border border-pink-400/40 transition-colors text-xs font-semibold cursor-pointer min-h-[36px]"
                >
                  <Heart className={`w-3.5 h-3.5 ${(wish.likes ?? 0) > 0 ? 'fill-pink-400 text-pink-400' : 'text-pink-300'}`} />
                  <span>{wish.likes ?? 0}</span>
                </button>
              </div>

              {/* Message Content */}
              <p className="text-pink-100 text-sm sm:text-base leading-relaxed pl-11 whitespace-pre-line">
                {wish.message}
              </p>
            </motion.article>
          ))}
        </AnimatePresence>

        {wishes.length === 0 && (
          <div className="text-center py-10 text-pink-300/80 bg-pink-950/40 rounded-2xl border border-dashed border-pink-400/30">
            <p>No wishes yet. Be the first to wish Lalee Patel!</p>
          </div>
        )}
      </div>
    </section>
  );
}
