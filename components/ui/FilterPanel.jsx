'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

export default function FilterPanel({
  isDark,
  FILTER_ALL,
  effectiveCategories,
  memberOptions,
  filterCategory,
  setFilterCategory,
  filterUser,
  setFilterUser,
  filterStartDate,
  setFilterStartDate,
  filterEndDate,
  setFilterEndDate,
  searchText,
  setSearchText,
  presetDate,
  isOpen,
  isMounted,
}) {
  const inputBg = isDark ? 'bg-[#2C2C2E]' : 'bg-[#F2F2F7]';
  const textColor = isDark ? 'text-white' : 'text-black';
  const dimColor = isDark ? 'text-white/40' : 'text-black/40';
  const cardBg = isDark ? 'bg-[#1C1C1E]' : 'bg-white';
  const divider = isDark ? 'border-white/[0.08]' : 'border-black/[0.06]';

  const chipBase = 'rounded-[24px] px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap';

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="overflow-hidden"
        >
          <div
            className={`mt-2 rounded-[20px] border ${cardBg} ${divider} p-4 flex flex-col gap-4`}
          >
            {/* Search */}
            <div className={`flex items-center gap-2 ${inputBg} rounded-[12px] px-3 py-3`}>
              <Search size={16} className={dimColor} />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Harcama ara..."
                className={`flex-1 text-[16px] bg-transparent outline-none ${textColor} placeholder:${dimColor}`}
              />
              {searchText ? (
                <button onClick={() => setSearchText('')}>
                  <X size={16} className={dimColor} />
                </button>
              ) : null}
            </div>

            {/* Quick date presets */}
            <div className="flex gap-2">
              {[
                ['Bugun', 'today'],
                ['7 Gun', 'week'],
                ['Bu Ay', 'month'],
                ['Tumunu', 'clear'],
              ].map(([label, type]) => (
                <button
                  key={type}
                  onClick={() => presetDate(type)}
                  className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-semibold ${inputBg} ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Category chips */}
            <div>
              <p
                className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${dimColor}`}
              >
                Kategori
              </p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {[FILTER_ALL, ...(effectiveCategories || [])].map((c) => {
                  const active = filterCategory === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setFilterCategory(c)}
                      className={chipBase}
                      style={{
                        backgroundColor: active
                          ? '#007AFF1A'
                          : isDark
                            ? '#2C2C2E'
                            : '#F2F2F7',
                        color: active
                          ? '#007AFF'
                          : isDark
                            ? 'rgba(235,235,245,0.5)'
                            : 'rgba(60,60,67,0.5)',
                      }}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Member filter */}
            {memberOptions && memberOptions.length > 1 && (
              <div>
                <p
                  className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${dimColor}`}
                >
                  Kisi
                </p>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {[{ id: FILTER_ALL, label: 'Tumuu' }, ...memberOptions].map((m) => {
                    const active = filterUser === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setFilterUser(m.id)}
                        className={chipBase}
                        style={{
                          backgroundColor: active
                            ? '#007AFF1A'
                            : isDark
                              ? '#2C2C2E'
                              : '#F2F2F7',
                          color: active
                            ? '#007AFF'
                            : isDark
                              ? 'rgba(235,235,245,0.5)'
                              : 'rgba(60,60,67,0.5)',
                        }}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Date range */}
            <div>
              <p
                className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${dimColor}`}
              >
                Tarih Araligi
              </p>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  className={`flex-1 rounded-[12px] px-3 py-3 text-[14px] outline-none ${inputBg} ${textColor}`}
                />
                <input
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  className={`flex-1 rounded-[12px] px-3 py-3 text-[14px] outline-none ${inputBg} ${textColor}`}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
