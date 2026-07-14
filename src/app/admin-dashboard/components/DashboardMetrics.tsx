import React from 'react';

const metrics = [
  {
    label: 'Total Bookings',
    value: '24',
    sub: '+3 this week',
    trend: 'up',
    icon: 'calendar',
    color: 'accent',
  },
  {
    label: 'Revenue (GHS)',
    value: '186,400',
    sub: 'This month',
    trend: 'up',
    icon: 'money',
    color: 'green',
  },
  {
    label: 'Occupancy Rate',
    value: '87%',
    sub: 'Both units avg.',
    trend: 'up',
    icon: 'chart',
    color: 'blue',
  },
  {
    label: 'Pending Requests',
    value: '3',
    sub: 'Awaiting confirmation',
    trend: 'neutral',
    icon: 'clock',
    color: 'orange',
  },
];

const iconPaths: Record<string, React.ReactNode> = {
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  money: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
  chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
};

const colorMap: Record<string, string> = {
  accent: '#C9A227',
  green: '#10B981',
  blue: '#3B82F6',
  orange: '#F59E0B',
};

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      {metrics.map((m) => (
        <div key={m.label} className="bg-card border border-border rounded-2xl p-5 card-hover">
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `${colorMap[m.color]}18`, border: `1px solid ${colorMap[m.color]}30` }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colorMap[m.color]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                {iconPaths[m.icon]}
              </svg>
            </div>
            {m.trend === 'up' && (
              <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m18 15-6-6-6 6"/></svg>
                Up
              </div>
            )}
          </div>
          <p className="font-display text-2xl font-medium text-foreground mb-1">{m.value}</p>
          <p className="text-sm font-semibold text-foreground">{m.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{m.sub}</p>
        </div>
      ))}
    </div>
  );
}