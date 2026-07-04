import { FiX } from 'react-icons/fi'

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative bg-surface rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-semibold text-ink text-lg">{title}</h3>
          <button onClick={onClose} className="text-ink-soft hover:text-ink">
            <FiX size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}