import { motion, AnimatePresence } from 'motion/react';
import { Heart, UserCheck, Clock } from 'lucide-react';
import type { Wish } from '../types';

interface WishesBoardProps {
  wishes: Wish[];
  onToggleLike: (id: string) => void;
}

export function WishesBoard({ wishes, onToggleLike }: WishesBoardProps) {
  return (
    <section className="mt-8">
      {/* HEADING: "Recent Wishes" */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2">
          <h2 id="recent-wishes-heading" className="text-xl sm:text-2xl font-bold text-slate-800">
            Recent Wishes
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-semibold text-xs">
            {wishes.length}
          </span>
        </div>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Latest wishes appear at the top
        </span>
      </div>

      {/* CONTAINER: 'Wishes_List' */}
      <div id="Wishes_List" className="space-y-4">
        <AnimatePresence initial={false}>
          {wishes.map((wish) => (
            <motion.article
              key={wish.id}
              id={`wish-card-${wish.id}`}
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              /* SECTION 2 Rule: Wish_Card = White box, red border on the left side, fade-in animation */
              className="bg-white rounded-r-xl rounded-l-xs border-y border-r border-slate-200/80 border-l-4 border-l-red-600 p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow relative"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                    wish.isDefault
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white'
                  }`}>
                    {wish.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                      <span>{wish.name}</span>
                      {wish.isDefault && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-[11px] font-semibold">
                          <UserCheck className="w-3 h-3" /> Admin
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{wish.createdAt}</span>
                    </div>
                  </div>
                </div>

                {/* Optional Like Button */}
                <button
                  type="button"
                  onClick={() => onToggleLike(wish.id)}
                  aria-label={`Like wish from ${wish.name}`}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200/70 hover:border-rose-200 transition-colors text-xs font-medium cursor-pointer"
                >
                  <Heart className={`w-3.5 h-3.5 ${(wish.likes ?? 0) > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{wish.likes ?? 0}</span>
                </button>
              </div>

              {/* Message Content */}
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-10 whitespace-pre-line">
                {wish.message}
              </p>
            </motion.article>
          ))}
        </AnimatePresence>

        {wishes.length === 0 && (
          <div className="text-center py-10 text-slate-400 bg-white/50 rounded-xl border border-dashed border-slate-200">
            <p>No wishes yet. Be the first to wish Lalee Patel!</p>
          </div>
        )}
      </div>
    </section>
  );
}
