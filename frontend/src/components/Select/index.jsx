import { forwardRef } from 'react'

const Select = forwardRef(function Select({ label, error, children, ...props }, ref) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-ink mb-1.5">{label}</label>}
      <select
        ref={ref}
        className={`w-full px-4 py-3 rounded-xl border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition text-sm ${
          error ? 'border-danger' : 'border-border'
        }`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-danger text-xs mt-1.5">{error}</p>}
    </div>
  )
})

export default Select