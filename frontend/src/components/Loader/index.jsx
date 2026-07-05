export default function Loader({ full = false }) {
  const spinner = (
    <div className="w-8 h-8 border-3 border-border border-t-blue rounded-full animate-spin" />
  )
  if (!full) return spinner
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      {spinner}
    </div>
  )
}