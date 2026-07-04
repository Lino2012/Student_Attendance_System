export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-camel hover:bg-camel-dark text-white',
    secondary: 'bg-cream-dark hover:bg-border text-ink',
    outline: 'border border-border text-ink hover:bg-cream-dark',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}