import { APP_URL, DEFAULT_CATEGORIES } from './constants';

export function formatMoney(v) {
  return `₺${Number(v || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function getRedirectUrl() {
  return APP_URL;
}

export function normalizeCategory(v) {
  return String(v || '').trim().replace(/\s+/g, ' ');
}

export function categoryKey(v) {
  return normalizeCategory(v).toLocaleLowerCase('tr-TR');
}

export function relativeDay(isoStr) {
  const d = new Date(isoStr);
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const yesterday = new Date(now - 86400000).toISOString().slice(0, 10);
  const day = d.toISOString().slice(0, 10);
  if (day === today) return 'Bugun';
  if (day === yesterday) return 'Dun';
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
}

export function mergeCategories(customCategories = [], expenseRows = []) {
  const out = [];
  const seen = new Set();
  const add = (name) => {
    const n = normalizeCategory(name);
    if (!n) return;
    const k = categoryKey(n);
    if (seen.has(k)) return;
    seen.add(k);
    out.push(n);
  };
  DEFAULT_CATEGORIES.forEach(add);
  customCategories.forEach(add);
  expenseRows.forEach((x) => add(x?.category));
  return out;
}

export function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('tr-TR', { weekday: 'short' }),
    };
  });
}
