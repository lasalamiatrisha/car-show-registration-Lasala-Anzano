export default function KpiCard({ title, value, icon: Icon, subtitle, accentColor = "text-slate-900" }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        {Icon && (
          <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className={`text-2xl font-bold tracking-tight ${accentColor}`}>{value}</div>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}