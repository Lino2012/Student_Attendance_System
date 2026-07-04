export default function Input({ label, error, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-ink mb-1.5">{label}</label>}
      <input
        className={`w-full px-3 py-2.5 rounded-lg border bg-surface text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-camel/40 transition text-sm ${
          error ? 'border-danger' : 'border-border'
        }`}
        {...props}
      />
      {error && <p className="text-danger text-xs mt-1.5">{error}</p>}
    </div>
  )
}