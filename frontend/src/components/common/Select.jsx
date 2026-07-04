export default function Select({ label, error, children, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-ink mb-1.5">{label}</label>}
      <select
        className={`w-full px-3 py-2.5 rounded-lg border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-camel/40 transition text-sm ${
          error ? 'border-danger' : 'border-border'
        }`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-danger text-xs mt-1.5">{error}</p>}
    </div>
  )
}