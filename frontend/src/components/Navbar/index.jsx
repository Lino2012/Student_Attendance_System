import { FiLogOut, FiBell } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ title }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between px-6 md:px-8 py-4 bg-surface/80 backdrop-blur-md border-b border-border sticky top-0 z-10">
      <h1 className="text-lg font-heading font-semibold text-ink">{title}</h1>

      <div className="flex items-center gap-4">
        <button className="text-ink-soft hover:text-ink transition relative">
          <FiBell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue to-blue-light text-white flex items-center justify-center text-sm font-medium">
            {(user?.full_name || user?.username)?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-ink leading-tight">{user?.full_name || user?.username}</p>
            <p className="text-xs text-ink-soft capitalize leading-tight">{user?.role?.toLowerCase()}</p>
          </div>
          <button onClick={handleLogout} className="text-ink-soft hover:text-danger transition ml-2">
            <FiLogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}