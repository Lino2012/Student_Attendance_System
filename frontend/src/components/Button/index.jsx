export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-gradient-to-r from-blue to-blue-light text-white shadow-lg shadow-blue/25 hover:shadow-xl hover:shadow-blue/30 hover:-translate-y-0.5',
    secondary: 'bg-cream-soft hover:bg-border text-ink',
    outline: 'border border-border text-ink hover:bg-cream-soft',
    ghost: 'text-blue hover:bg-blue/5',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}