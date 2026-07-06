import { forwardRef } from 'react'

const Input = forwardRef(function Input({ label, error, icon: Icon, ...props }, ref) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-ink mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" size={18} />}
        <input
          ref={ref}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 rounded-xl border bg-surface text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition text-sm ${
            error ? 'border-danger' : 'border-border'
          }`}
          {...props}
        />
      </div>
      {error && <p className="text-danger text-xs mt-1.5">{error}</p>}
    </div>
  )
})

export default Input