'use client';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Toast from './Toast';

export default function GroupSetup({
  joinCode, setJoinCode, handleCreateGroup, handleJoinGroup,
  handleLogout, busy, isDark, toastMsg, toastType, toastVisible,
}) {
  return (
    <div className={`flex justify-center ${isDark ? 'bg-black' : 'bg-[#F2F2F7]'} min-h-screen`}>
      <div className="relative w-full max-w-[430px] min-h-screen overflow-y-auto no-scrollbar">
        <div className="px-6 py-16 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 180 }}
            className="flex flex-col items-center mb-10 gap-3"
          >
            <div className="w-24 h-24 rounded-[28px] bg-[#007AFF] flex items-center justify-center shadow-xl shadow-blue-500/30">
              <Users size={44} color="#fff" strokeWidth={1.5} />
            </div>
            <h1 className={`text-[32px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>Ortak Butce</h1>
            <p className={`text-[15px] text-center ${isDark ? 'text-white/50' : 'text-black/50'}`}>Ailenle butce olustur ya da mevcut butceye katil</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 180, delay: 0.12 }}
            className={`rounded-[20px] p-6 shadow-sm border flex flex-col gap-5 ${isDark ? 'bg-[#1C1C1E] border-white/[0.06]' : 'bg-white border-black/[0.06]'}`}
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleCreateGroup}
              disabled={busy}
              className="w-full py-4 bg-[#007AFF] text-white rounded-[14px] text-[17px] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
            >
              {busy ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <>+ Yeni Butce Olustur</>}
            </motion.button>

            <div className="flex items-center gap-3">
              <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
              <span className={`text-[13px] ${isDark ? 'text-white/30' : 'text-black/30'}`}>ya da mevcut butceye katil</span>
              <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={`text-[12px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-black/40'}`}>Davet Kodu</label>
              <input
                type="text"
                value={joinCode}
                onChange={e => setJoinCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                maxLength={8}
                className={`w-full rounded-[12px] px-4 py-4 text-[22px] font-bold tracking-[0.3em] outline-none text-center uppercase ${isDark ? 'bg-[#2C2C2E] text-white placeholder-white/20' : 'bg-[#F2F2F7] text-black placeholder-black/20'}`}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleJoinGroup}
              disabled={busy || !joinCode.trim()}
              className={`w-full py-4 rounded-[14px] text-[17px] font-semibold border-2 border-[#007AFF] text-[#007AFF] flex items-center justify-center ${(!joinCode.trim() || busy) ? 'opacity-40' : ''}`}
            >
              Kod ile Katil
            </motion.button>
          </motion.div>

          <button onClick={handleLogout} className="mt-6 text-[#FF3B30] text-[15px] font-semibold text-center">
            Cikis Yap
          </button>
        </div>
        <Toast message={toastMsg} type={toastType} visible={toastVisible} />
      </div>
    </div>
  );
}
