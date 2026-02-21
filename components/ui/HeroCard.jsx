'use client';
import { motion } from 'framer-motion';

function formatMoney(v) {
  return `₺${Number(v || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function HeroCard({ monthlyTotal, budgetNum, budgetRemaining, budgetProgress, groupName, isDark }) {
  const pct = Math.min(100, Math.round(budgetProgress * 100));
  const barColor = budgetProgress > 0.9 ? '#FF453A' : budgetProgress > 0.7 ? '#FF9F0A' : 'rgba(255,255,255,0.85)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 180 }}
      className="mx-4 rounded-[24px] bg-[#007AFF] p-8 shadow-xl shadow-blue-500/25 text-white"
    >
      <p className="text-white/70 text-[12px] font-semibold uppercase tracking-widest">
        {groupName || 'Ortak Butce'}
      </p>
      <p className="text-white text-[42px] font-bold tracking-tight mt-2 leading-none">
        {formatMoney(monthlyTotal)}
      </p>
      <p className="text-white/60 text-[13px] mt-2">Bu ayki toplam harcama</p>

      {budgetNum > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-[13px]">Butce {formatMoney(budgetNum)}</span>
            <span
              className={`text-[13px] font-semibold ${
                budgetRemaining >= 0 ? 'text-white/90' : 'text-[#FF6B6B]'
              }`}
            >
              {budgetRemaining >= 0
                ? `${formatMoney(budgetRemaining)} kaldi`
                : `${formatMoney(-budgetRemaining)} asildi`}
            </span>
          </div>
          <div className="h-[5px] rounded-full bg-white/20 overflow-hidden">
            <motion.div
              initial={{ width: '2%' }}
              animate={{ width: `${Math.max(2, pct)}%` }}
              transition={{ type: 'spring', damping: 20, stiffness: 120, delay: 0.3 }}
              className="h-full rounded-full"
              style={{ backgroundColor: barColor }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
