import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

interface SuccessNotificationProps {
  message: string | null;
  onDismiss: () => void;
}

export function SuccessNotification({ message, onDismiss }: SuccessNotificationProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          id="success-alert-toast"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-white border border-emerald-300 text-emerald-950 px-4 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/10 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold text-emerald-900">
                {message}
              </p>
              <p className="text-xs text-emerald-700">
                Your wish is now featured at the top of the board!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Close notification"
            className="p-1 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
