'use client';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function formatMoney(v) {
  return `₺${Number(v || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const CustomTooltip = ({ active, payload, isDark }) => {
  if (active && payload && payload.length && payload[0].value > 0) {
    return (
      <div className={`rounded-xl px-3 py-2 text-sm font-semibold shadow-lg ${isDark ? 'bg-[#2C2C2E] text-white' : 'bg-white text-black'}`}>
        {formatMoney(payload[0].value)}
      </div>
    );
  }
  return null;
};

const CustomDot = ({ cx, cy, value }) => {
  if (!value) return null;
  return <circle cx={cx} cy={cy} r={4} fill="#007AFF" stroke="#fff" strokeWidth={2} />;
};

export default function WeeklyChart({ data, isDark }) {
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const labelColor = isDark ? 'rgba(235,235,245,0.4)' : 'rgba(60,60,67,0.4)';

  return (
    <ResponsiveContainer width="100%" height={140}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -32, bottom: 0 }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#007AFF" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#007AFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="0" stroke={gridColor} horizontal={true} vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fill: labelColor }}
          axisLine={false}
          tickLine={false}
          dy={4}
        />
        <YAxis hide />
        <Tooltip content={<CustomTooltip isDark={isDark} />} />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#007AFF"
          strokeWidth={2.5}
          fill="url(#chartGrad)"
          dot={<CustomDot />}
          activeDot={{ r: 5, fill: '#007AFF', stroke: '#fff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
