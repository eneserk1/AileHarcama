'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

export default function Toast({ message, type, visible }) {
  const bg = type === 'error' ? 'bg-[#FF3B30]' : type === 'success' ? 'bg-[#34C759]' : 'bg-[#1C1C1E]';
  const Icon = type === 'error' ? AlertCircle : type === 'success' ? CheckCircle2 : Info;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.92 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={`absolute top-14 left-4 right-4 z-[999] ${bg} rounded-[20px] px-5 py-4 flex items-center gap-3 shadow-lg`}
          style={{ pointerEvents: 'none' }}
        >
          <Icon size={18} color="#fff" strokeWidth={2} />
          <span className="text-white text-[15px] font-medium flex-1 leading-tight">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
