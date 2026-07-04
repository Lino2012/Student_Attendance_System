export default function StatCard({ label, value, icon: Icon, trend }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 flex items-start justify-between">
      <div>
        <p className="text-sm text-ink-soft mb-1">{label}</p>
        <p className="text-2xl font-heading font-semibold text-ink">{value}</p>
        {trend && <p className="text-xs text-success mt-1">{trend}</p>}
      </div>
      <div className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center text-camel">
        <Icon size={20} />
      </div>
    </div>
  )
}