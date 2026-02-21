'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  Users,
  Tags,
  User,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
  Copy,
  MessageCircle,
  Trash2,
  Check,
  Plus,
  LogOut,
} from 'lucide-react';

const CATEGORY_META = {
  'Market': { color: '#34C759' },
  'Fatura': { color: '#FF9500' },
  'Ulasim': { color: '#007AFF' },
  'Yemek': { color: '#FF3B30' },
  'Diger': { color: '#8E8E93' },
};

function getCategoryColor(name) {
  return CATEGORY_META[name]?.color || '#5856D6';
}

function formatMoney(v) {
  return `₺${Number(v || 0).toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getInitial(name) {
  return (name || 'U')[0].toUpperCase();
}

export default function SettingsTab({
  session,
  group,
  members,
  memberMap,
  memberOptions,
  effectiveCategories,
  categories,
  settingsSection,
  setSettingsSection,
  groupNameEdit,
  setGroupNameEdit,
  budgetTarget,
  setBudgetTarget,
  editName,
  setEditName,
  newCategory,
  setNewCategory,
  themeMode,
  setThemeMode,
  isDark,
  handleSaveUsername,
  handleUpdateGroupName,
  handleSaveBudget,
  handleAddCategory,
  handleDeleteCategory,
  handleRemoveMember,
  handleCopyCode,
  handleShareWhatsApp,
  handleLogout,
  monthlyTotal,
  budgetRemaining,
  budgetProgress,
  formatMoney: formatMoneyProp,
}) {
  const formatMoneyFn = formatMoneyProp || formatMoney;
  const cardBg = isDark ? 'bg-[#1C1C1E]' : 'bg-white';
  const border = isDark ? 'border-white/[0.06]' : 'border-black/[0.06]';
  const inputBg = isDark ? 'bg-[#2C2C2E]' : 'bg-[#F2F2F7]';
  const textColor = isDark ? 'text-white' : 'text-black';
  const dimColor = isDark ? 'text-white/60' : 'text-black/60';
  const bgColor = isDark ? 'bg-black' : 'bg-[#F2F2F7]';

  const userName = session?.user?.user_metadata?.display_name || session?.user?.email || 'User';
  const creatorId = group?.created_by;

  function renderRoot() {
    return (
      <div className={`h-full overflow-y-auto no-scrollbar pb-28 ${bgColor}`}>
        {/* Header */}
        <div className="px-5 pt-16 pb-6">
          <h1 className={`text-[34px] font-bold tracking-tight ${textColor}`}>Ayarlar</h1>
        </div>

        {/* Profile Card */}
        <div className="mx-4 mb-6 rounded-[20px] border p-5 flex items-center gap-4" style={{ backgroundColor: cardBg }}>
          <div className="w-12 h-12 rounded-full bg-[#007AFF] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-[18px]">{getInitial(userName)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-[16px] ${textColor} truncate`}>{userName}</p>
            <p className={`text-[13px] ${dimColor} truncate`}>{session?.user?.email}</p>
          </div>
        </div>

        {/* Budget Section */}
        <div className={`mx-4 mb-6 rounded-[16px] overflow-hidden border ${cardBg} ${border}`}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setSettingsSection('budget')}
            className={`flex items-center px-4 py-3.5 min-h-[52px] border-b ${border} w-full`}
          >
            <div className="w-[30px] h-[30px] rounded-[8px] bg-[#007AFF] flex items-center justify-center mr-3 flex-shrink-0">
              <Wallet size={16} color="white" strokeWidth={2} />
            </div>
            <div className="flex-1 text-left">
              <p className={`text-[16px] font-semibold ${textColor}`}>{group?.name || 'Budget'}</p>
              <p className={`text-[13px] ${dimColor}`}>
                {formatMoneyFn(monthlyTotal)} / {formatMoneyFn(budgetTarget)}
              </p>
            </div>
            <ChevronRight size={20} className={isDark ? 'text-white/40' : 'text-black/40'} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setSettingsSection('members')}
            className={`flex items-center px-4 py-3.5 min-h-[52px] border-b ${border} w-full`}
          >
            <div className="w-[30px] h-[30px] rounded-[8px] bg-[#34C759] flex items-center justify-center mr-3 flex-shrink-0">
              <Users size={16} color="white" strokeWidth={2} />
            </div>
            <div className="flex-1 text-left">
              <p className={`text-[16px] font-semibold ${textColor}`}>Üyeler</p>
              <p className={`text-[13px] ${dimColor}`}>{members?.length || 0} üye</p>
            </div>
            <ChevronRight size={20} className={isDark ? 'text-white/40' : 'text-black/40'} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setSettingsSection('categories')}
            className="flex items-center px-4 py-3.5 min-h-[52px] w-full"
          >
            <div className="w-[30px] h-[30px] rounded-[8px] bg-[#FF9500] flex items-center justify-center mr-3 flex-shrink-0">
              <Tags size={16} color="white" strokeWidth={2} />
            </div>
            <div className="flex-1 text-left">
              <p className={`text-[16px] font-semibold ${textColor}`}>Kategoriler</p>
              <p className={`text-[13px] ${dimColor}`}>{effectiveCategories?.length || 0} kategori</p>
            </div>
            <ChevronRight size={20} className={isDark ? 'text-white/40' : 'text-black/40'} />
          </motion.button>
        </div>

        {/* Account Section */}
        <div className={`mx-4 mb-6 rounded-[16px] overflow-hidden border ${cardBg} ${border}`}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setSettingsSection('profile')}
            className={`flex items-center px-4 py-3.5 min-h-[52px] border-b ${border} w-full`}
          >
            <div className="w-[30px] h-[30px] rounded-[8px] bg-[#5856D6] flex items-center justify-center mr-3 flex-shrink-0">
              <User size={16} color="white" strokeWidth={2} />
            </div>
            <div className="flex-1 text-left">
              <p className={`text-[16px] font-semibold ${textColor}`}>Profil</p>
            </div>
            <ChevronRight size={20} className={isDark ? 'text-white/40' : 'text-black/40'} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setSettingsSection('theme')}
            className="flex items-center px-4 py-3.5 min-h-[52px] w-full"
          >
            <div
              className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center mr-3 flex-shrink-0"
              style={{ backgroundColor: isDark ? '#FF9500' : '#FFD60A' }}
            >
              {isDark ? <Moon size={16} color="white" strokeWidth={2} /> : <Sun size={16} color="white" strokeWidth={2} />}
            </div>
            <div className="flex-1 text-left">
              <p className={`text-[16px] font-semibold ${textColor}`}>Tema</p>
              <p className={`text-[13px] ${dimColor}`}>{isDark ? 'Koyu' : 'Açık'}</p>
            </div>
            <ChevronRight size={20} className={isDark ? 'text-white/40' : 'text-black/40'} />
          </motion.button>
        </div>

        {/* Logout Section */}
        <div className="mx-4 mb-20">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleLogout}
            className="w-full py-4 rounded-[20px] flex items-center justify-center gap-2.5 font-bold text-[17px]"
            style={{
              backgroundColor: '#FF3B30',
              color: 'white',
              boxShadow: '0 2px 8px rgba(255,59,48,0.25)',
            }}
          >
            <LogOut size={20} strokeWidth={2} />
            Çıkış Yap
          </motion.button>
        </div>
      </div>
    );
  }

  function renderProfile() {
    return (
      <div className={`h-full overflow-y-auto no-scrollbar pb-28 ${bgColor}`}>
        {/* Header */}
        <div className="px-5 pt-16 pb-6 flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setSettingsSection('root')}
            className="p-2"
          >
            <ChevronLeft size={24} className={textColor} strokeWidth={3} />
          </motion.button>
          <h1 className={`text-[34px] font-bold tracking-tight ${textColor}`}>Profil</h1>
        </div>

        {/* Edit Form */}
        <div className={`mx-4 rounded-[20px] border ${cardBg} ${border} overflow-hidden`}>
          <div className="p-5">
            <p className={`text-[12px] font-semibold uppercase tracking-wider mb-3 ${dimColor}`}>
              Kullanıcı Adı
            </p>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className={`w-full rounded-[12px] px-4 py-3 text-[16px] outline-none ${inputBg} ${textColor} mb-4`}
            />
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleSaveUsername}
              className="w-full py-3 rounded-[12px] bg-[#007AFF] text-white font-semibold text-[16px]"
            >
              Kaydet
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  function renderBudget() {
    return (
      <div className={`h-full overflow-y-auto no-scrollbar pb-28 ${bgColor}`}>
        {/* Header */}
        <div className="px-5 pt-16 pb-6 flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setSettingsSection('root')}
            className="p-2"
          >
            <ChevronLeft size={24} className={textColor} strokeWidth={3} />
          </motion.button>
          <h1 className={`text-[34px] font-bold tracking-tight ${textColor}`}>Bütçe Ayarları</h1>
        </div>

        {/* Group Name */}
        <div className={`mx-4 mb-4 rounded-[20px] border ${cardBg} ${border} overflow-hidden`}>
          <div className="p-5">
            <p className={`text-[12px] font-semibold uppercase tracking-wider mb-3 ${dimColor}`}>
              Grup Adı
            </p>
            <input
              type="text"
              value={groupNameEdit}
              onChange={(e) => setGroupNameEdit(e.target.value)}
              className={`w-full rounded-[12px] px-4 py-3 text-[16px] outline-none ${inputBg} ${textColor} mb-4`}
            />
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleUpdateGroupName}
              className="w-full py-3 rounded-[12px] bg-[#007AFF] text-white font-semibold text-[16px]"
            >
              Güncelle
            </motion.button>
          </div>
        </div>

        {/* Budget Target */}
        <div className={`mx-4 rounded-[20px] border ${cardBg} ${border} overflow-hidden`}>
          <div className="p-5">
            <p className={`text-[12px] font-semibold uppercase tracking-wider mb-3 ${dimColor}`}>
              Aylık Bütçe Hedefi
            </p>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                value={budgetTarget}
                onChange={(e) => setBudgetTarget(e.target.value)}
                className={`flex-1 rounded-[12px] px-4 py-3 text-[16px] outline-none ${inputBg} ${textColor}`}
              />
              <span className={`flex items-center px-3 font-semibold ${dimColor}`}>₺</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleSaveBudget}
              className="w-full py-3 rounded-[12px] bg-[#007AFF] text-white font-semibold text-[16px]"
            >
              Kaydet
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  function renderMembers() {
    return (
      <div className={`h-full overflow-y-auto no-scrollbar pb-28 ${bgColor}`}>
        {/* Header */}
        <div className="px-5 pt-16 pb-6 flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setSettingsSection('root')}
            className="p-2"
          >
            <ChevronLeft size={24} className={textColor} strokeWidth={3} />
          </motion.button>
          <h1 className={`text-[34px] font-bold tracking-tight ${textColor}`}>Üyeler</h1>
        </div>

        {/* Invite Code */}
        <div className={`mx-4 mb-4 rounded-[20px] border ${cardBg} ${border} overflow-hidden`}>
          <div className="p-5">
            <p className={`text-[12px] font-semibold uppercase tracking-wider mb-3 ${dimColor}`}>
              Davet Kodu
            </p>
            <p
              className={`text-[28px] font-bold letter-spacing-widest mb-4 text-center ${textColor}`}
              style={{ letterSpacing: '0.2em' }}
            >
              {group?.invite_code || 'N/A'}
            </p>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleCopyCode}
                className="flex-1 py-3 rounded-[12px] bg-[#007AFF] text-white font-semibold text-[16px] flex items-center justify-center gap-2"
              >
                <Copy size={18} strokeWidth={2} />
                Kopyala
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleShareWhatsApp}
                className="flex-1 py-3 rounded-[12px] bg-[#34C759] text-white font-semibold text-[16px] flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} strokeWidth={2} />
                Paylaş
              </motion.button>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className={`mx-4 rounded-[16px] overflow-hidden border ${cardBg} ${border}`}>
          {(members || []).map((member, idx) => (
            <div key={member.id} className={`flex items-center px-4 py-3.5 min-h-[52px] ${idx < members.length - 1 ? `border-b ${border}` : ''}`}>
              <div className="w-10 h-10 rounded-full bg-[#007AFF] flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white font-bold text-[14px]">
                  {getInitial(memberMap?.[member.user_id]?.display_name || 'U')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[16px] font-semibold ${textColor} truncate`}>
                  {memberMap?.[member.user_id]?.display_name || 'Unknown'}
                </p>
                {creatorId === member.user_id && (
                  <p className={`text-[12px] ${dimColor}`}>Sahibi</p>
                )}
              </div>
              {session?.user?.id !== member.user_id && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveMember(member.user_id)}
                  className="p-2 rounded-[8px] ml-2 flex-shrink-0"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,59,48,0.15)' : 'rgba(255,59,48,0.1)',
                  }}
                >
                  <Trash2 size={18} color="#FF3B30" strokeWidth={2} />
                </motion.button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderCategories() {
    return (
      <div className={`h-full overflow-y-auto no-scrollbar pb-28 ${bgColor}`}>
        {/* Header */}
        <div className="px-5 pt-16 pb-6 flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setSettingsSection('root')}
            className="p-2"
          >
            <ChevronLeft size={24} className={textColor} strokeWidth={3} />
          </motion.button>
          <h1 className={`text-[34px] font-bold tracking-tight ${textColor}`}>Kategoriler</h1>
        </div>

        {/* Add New Category */}
        <div className={`mx-4 mb-4 rounded-[20px] border ${cardBg} ${border} overflow-hidden`}>
          <div className="p-5">
            <p className={`text-[12px] font-semibold uppercase tracking-wider mb-3 ${dimColor}`}>
              Yeni Kategori
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Kategori adı"
                className={`flex-1 rounded-[12px] px-4 py-3 text-[16px] outline-none ${inputBg} ${textColor} placeholder:${dimColor}`}
              />
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAddCategory}
                className="px-4 py-3 rounded-[12px] bg-[#007AFF] text-white font-semibold flex items-center"
              >
                <Plus size={20} strokeWidth={2.5} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className={`mx-4 rounded-[16px] overflow-hidden border ${cardBg} ${border}`}>
          {(effectiveCategories || []).map((cat, idx) => (
            <div key={cat} className={`flex items-center px-4 py-3.5 min-h-[52px] ${idx < effectiveCategories.length - 1 ? `border-b ${border}` : ''}`}>
              <div
                className="w-[30px] h-[30px] rounded-[8px] mr-3 flex-shrink-0"
                style={{ backgroundColor: getCategoryColor(cat) }}
              />
              <p className={`text-[16px] font-semibold ${textColor} flex-1`}>{cat}</p>
              {!['Market', 'Fatura', 'Ulasim', 'Yemek', 'Diger'].includes(cat) && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteCategory(cat)}
                  className="p-2 rounded-[8px]"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,59,48,0.15)' : 'rgba(255,59,48,0.1)',
                  }}
                >
                  <Trash2 size={18} color="#FF3B30" strokeWidth={2} />
                </motion.button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderTheme() {
    return (
      <div className={`h-full overflow-y-auto no-scrollbar pb-28 ${bgColor}`}>
        {/* Header */}
        <div className="px-5 pt-16 pb-6 flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setSettingsSection('root')}
            className="p-2"
          >
            <ChevronLeft size={24} className={textColor} strokeWidth={3} />
          </motion.button>
          <h1 className={`text-[34px] font-bold tracking-tight ${textColor}`}>Tema</h1>
        </div>

        {/* Theme Options */}
        <div className={`mx-4 rounded-[16px] overflow-hidden border ${cardBg} ${border}`}>
          {/* Light Mode */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setThemeMode('light')}
            className={`flex items-center px-4 py-3.5 min-h-[52px] border-b ${border} w-full`}
          >
            <div className="w-[30px] h-[30px] rounded-[8px] bg-[#FFD60A] flex items-center justify-center mr-3 flex-shrink-0">
              <Sun size={16} color="white" strokeWidth={2} />
            </div>
            <p className={`text-[16px] font-semibold ${textColor} flex-1 text-left`}>Açık Tema</p>
            {themeMode === 'light' && (
              <Check size={20} color="#007AFF" strokeWidth={3} />
            )}
          </motion.button>

          {/* Dark Mode */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setThemeMode('dark')}
            className="flex items-center px-4 py-3.5 min-h-[52px] w-full"
          >
            <div className="w-[30px] h-[30px] rounded-[8px] bg-[#FF9500] flex items-center justify-center mr-3 flex-shrink-0">
              <Moon size={16} color="white" strokeWidth={2} />
            </div>
            <p className={`text-[16px] font-semibold ${textColor} flex-1 text-left`}>Koyu Tema</p>
            {themeMode === 'dark' && (
              <Check size={20} color="#007AFF" strokeWidth={3} />
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  // Render based on settingsSection
  if (settingsSection === 'profile') return renderProfile();
  if (settingsSection === 'budget') return renderBudget();
  if (settingsSection === 'members') return renderMembers();
  if (settingsSection === 'categories') return renderCategories();
  if (settingsSection === 'theme') return renderTheme();

  return renderRoot();
}
