import { FiSearch } from 'react-icons/fi'

export default function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative w-full sm:w-64">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" size={16} />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-surface text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-camel/40 transition"
      />
    </div>
  )
}