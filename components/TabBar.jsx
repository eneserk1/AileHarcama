'use client';
import { motion } from 'framer-motion';
import { Home, Plus, Settings2 } from 'lucide-react';

export default function TabBar({ activeTab, onTabChange, isDark }) {
  const active = '#007AFF';
  const inactive = isDark ? 'rgba(235,235,245,0.4)' : 'rgba(60,60,67,0.4)';

  return (
    <div className={`absolute bottom-0 left-0 right-0 h-20 flex items-start justify-around px-2 pt-2 border-t z-40
      ${isDark ? 'bg-[#1C1C1E]/80 border-white/[0.12]' : 'bg-white/80 border-black/[0.12]'}
      backdrop-blur-xl`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* List tab */}
      <button
        onClick={() => onTabChange('list')}
        className="flex-1 flex flex-col items-center gap-1 pt-1"
      >
        <motion.div whileTap={{ scale: 0.85 }}>
          <Home size={24} color={activeTab === 'list' ? active : inactive} strokeWidth={activeTab === 'list' ? 2 : 1.5} />
        </motion.div>
        <span className="text-[10px] font-medium" style={{ color: activeTab === 'list' ? active : inactive }}>Ana Sayfa</span>
      </button>

      {/* Add tab - center */}
      <button
        onClick={() => onTabChange(activeTab === 'add' ? 'list' : 'add')}
        className="flex-1 flex items-start justify-center pt-0.5"
      >
        <motion.div
          animate={{ rotate: activeTab === 'add' ? 135 : 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          whileTap={{ scale: 0.88 }}
          className="w-[52px] h-[52px] rounded-full bg-[#007AFF] flex items-center justify-center shadow-lg shadow-blue-500/40"
          style={{ backgroundColor: activeTab === 'add' ? '#0055D4' : '#007AFF' }}
        >
          <Plus size={28} color="#fff" strokeWidth={2} />
        </motion.div>
      </button>

      {/* Settings tab */}
      <button
        onClick={() => onTabChange('settings')}
        className="flex-1 flex flex-col items-center gap-1 pt-1"
      >
        <motion.div whileTap={{ scale: 0.85 }}>
          <Settings2 size={24} color={activeTab === 'settings' ? active : inactive} strokeWidth={activeTab === 'settings' ? 2 : 1.5} />
        </motion.div>
        <span className="text-[10px] font-medium" style={{ color: activeTab === 'settings' ? active : inactive }}>Ayarlar</span>
      </button>
    </div>
  );
}
