export const DEFAULT_CATEGORIES = ['Market', 'Fatura', 'Ulasim', 'Yemek', 'Diger'];
export const FILTER_ALL = 'Tumu';
export const APP_URL = 'https://aile-harcama.vercel.app/';

export const CATEGORY_META = {
  'Market':  { icon: 'ShoppingCart',   color: '#34C759', bg: '#E8F9ED' },
  'Fatura':  { icon: 'Zap',            color: '#FF9500', bg: '#FFF3E0' },
  'Ulasim':  { icon: 'Car',            color: '#007AFF', bg: '#E3F2FD' },
  'Yemek':   { icon: 'Utensils',       color: '#FF3B30', bg: '#FFEBEE' },
  'Diger':   { icon: 'MoreHorizontal', color: '#8E8E93', bg: '#F2F2F7' },
};

export const PIE_COLORS = ['#007AFF','#FF9500','#34C759','#FF3B30','#AF52DE','#FF6B35','#5AC8FA'];

export function getCategoryMeta(name) {
  return CATEGORY_META[name] || { icon: 'Tag', color: '#5856D6', bg: '#EDECFB' };
}
