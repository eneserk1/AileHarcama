'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import Toast from './Toast';

export default function AuthScreen({
  authMode, setAuthMode, email, setEmail, password, setPassword,
  usernameInput, setUsernameInput, busy, handleLogin, handleRegister,
  handleForgotPassword, handleGoogleLogin, isDark, toastMsg, toastType, toastVisible,
}) {
  const isRegister = authMode === 'register';
  const isForgot = authMode === 'forgot';

  return (
    <div className={`flex justify-center ${isDark ? 'bg-black' : 'bg-[#F2F2F7]'} min-h-screen`}>
      <div className="relative w-full max-w-[430px] min-h-screen overflow-y-auto no-scrollbar">
        <div className="px-6 py-16 flex flex-col">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 180 }}
            className="flex flex-col items-center mb-10 gap-3"
          >
            <div className="w-24 h-24 rounded-[28px] bg-[#007AFF] flex items-center justify-center shadow-xl shadow-blue-500/30">
              <Wallet size={44} color="#fff" strokeWidth={1.5} />
            </div>
            <h1 className={`text-[32px] font-bold tracking-tight mt-1 ${isDark ? 'text-white' : 'text-black'}`}>Aile Harcama</h1>
            <p className={`text-[15px] ${isDark ? 'text-white/50' : 'text-black/50'}`}>
              {isRegister ? 'Yeni hesap olustur' : isForgot ? 'Sifre sifirla' : 'Hesabina giris yap'}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 180, delay: 0.1 }}
            className={`rounded-[20px] p-6 shadow-sm border ${isDark ? 'bg-[#1C1C1E] border-white/[0.06]' : 'bg-white border-black/[0.06]'} flex flex-col gap-4`}
          >
            {isRegister && (
              <div className="flex flex-col gap-1.5">
                <label className={`text-[12px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-black/40'}`}>Ad Soyad</label>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={e => setUsernameInput(e.target.value)}
                  placeholder="Adiniz"
                  className={`w-full rounded-[12px] px-4 py-4 text-[17px] outline-none ${isDark ? 'bg-[#2C2C2E] text-white placeholder-white/30' : 'bg-[#F2F2F7] text-black placeholder-black/30'}`}
                />
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className={`text-[12px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-black/40'}`}>E-posta</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
                autoCapitalize="none"
                className={`w-full rounded-[12px] px-4 py-4 text-[17px] outline-none ${isDark ? 'bg-[#2C2C2E] text-white placeholder-white/30' : 'bg-[#F2F2F7] text-black placeholder-black/30'}`}
              />
            </div>
            {!isForgot && (
              <div className="flex flex-col gap-1.5">
                <label className={`text-[12px] font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-black/40'}`}>Sifre</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="En az 8 karakter"
                  className={`w-full rounded-[12px] px-4 py-4 text-[17px] outline-none ${isDark ? 'bg-[#2C2C2E] text-white placeholder-white/30' : 'bg-[#F2F2F7] text-black placeholder-black/30'}`}
                />
              </div>
            )}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={isForgot ? handleForgotPassword : isRegister ? handleRegister : handleLogin}
              disabled={busy}
              className="w-full py-4 bg-[#007AFF] text-white rounded-[14px] text-[17px] font-semibold flex items-center justify-center mt-1 shadow-lg shadow-blue-500/25 active:opacity-90"
            >
              {busy ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                isForgot ? 'Sifirlama Linki Gonder' : isRegister ? 'Hesap Olustur' : 'Giris Yap'
              )}
            </motion.button>

            {!isForgot && (
              <>
                <div className="flex items-center gap-3 my-1">
                  <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                  <span className={`text-[13px] ${isDark ? 'text-white/30' : 'text-black/30'}`}>veya</span>
                  <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                </div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleGoogleLogin}
                  className={`w-full py-4 rounded-[14px] text-[16px] font-semibold flex items-center justify-center gap-3 ${isDark ? 'bg-[#2C2C2E] text-white' : 'bg-[#F2F2F7] text-black'}`}
                >
                  <span className="text-[18px] font-bold text-[#4285F4]">G</span>
                  Google ile devam et
                </motion.button>
              </>
            )}
          </motion.div>

          {/* Switcher */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {!isRegister && <button onClick={() => setAuthMode('register')} className="text-[#007AFF] text-[15px] font-semibold">Hesap olustur</button>}
            {isRegister && <button onClick={() => setAuthMode('login')} className="text-[#007AFF] text-[15px] font-semibold">Zaten hesabim var</button>}
            {!isForgot && <span className={`text-[15px] ${isDark ? 'text-white/30' : 'text-black/30'}`}> · </span>}
            {!isForgot && <button onClick={() => setAuthMode('forgot')} className="text-[#007AFF] text-[15px] font-semibold">Sifremi unuttum</button>}
            {isForgot && <button onClick={() => setAuthMode('login')} className="text-[#007AFF] text-[15px] font-semibold">Giris yap</button>}
          </div>
        </div>
        <Toast message={toastMsg} type={toastType} visible={toastVisible} />
      </div>
    </div>
  );
}
