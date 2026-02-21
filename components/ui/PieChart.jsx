'use client';
import { Cell, Pie, PieChart as RechartsPie, ResponsiveContainer, Tooltip } from 'recharts';

const PIE_COLORS = ['#007AFF','#FF9500','#34C759','#FF3B30','#AF52DE','#FF6B35','#5AC8FA'];

function formatMoney(v) {
  return `₺${Number(v || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const CustomTooltip = ({ active, payload, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`rounded-xl px-3 py-2 text-sm shadow-lg ${isDark ? 'bg-[#2C2C2E] text-white' : 'bg-white text-black'}`}>
        <div className="font-semibold">{payload[0].name}</div>
        <div className="text-xs mt-0.5 opacity-70">{formatMoney(payload[0].value)}</div>
      </div>
    );
  }
  return null;
};

const CenterLabel = ({ viewBox, total, isDark }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" fill={isDark ? '#fff' : '#000'} fontSize={13} fontWeight="700">
        {formatMoney(total)}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill={isDark ? 'rgba(235,235,245,0.4)' : 'rgba(60,60,67,0.4)'} fontSize={10}>
        Toplam
      </text>
    </g>
  );
};

export default function PieChart({ data, isDark }) {
  const total = data.reduce((a, b) => a + b.amount, 0);
  const top5 = data.slice(0, 5);

  return (
    <div className="flex items-center gap-4">
      <div className="w-[140px] h-[140px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPie>
            <Pie
              data={top5}
              cx="50%"
              cy="50%"
              innerRadius={44}
              outerRadius={64}
              dataKey="amount"
              nameKey="category"
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
            >
              {top5.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip isDark={isDark} />} />
          </RechartsPie>
        </ResponsiveContainer>
        {/* Center total text overlay */}
        <div className="relative" style={{ marginTop: -140 }}>
          <div className="h-[140px] flex flex-col items-center justify-center pointer-events-none">
            <span className={`text-[13px] font-bold ${isDark ? 'text-white' : 'text-black'}`}>{formatMoney(total)}</span>
            <span className={`text-[10px] mt-0.5 ${isDark ? 'text-white/40' : 'text-black/40'}`}>Toplam</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {top5.map((item, i) => (
          <div key={item.category} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
            <span className={`text-[13px] flex-1 truncate ${isDark ? 'text-white/60' : 'text-black/60'}`}>{item.category}</span>
            <span className={`text-[13px] font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{formatMoney(item.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
