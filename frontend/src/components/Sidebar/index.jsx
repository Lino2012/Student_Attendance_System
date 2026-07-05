import { NavLink } from 'react-router-dom'
import {
  FiHome, FiUsers, FiUserCheck, FiGrid, FiLayers, FiCalendar,
  FiBarChart2, FiBell, FiSettings, FiUser
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

const navByRole = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: FiHome, end: true },
    { to: '/admin/students', label: 'Students', icon: FiUsers },
    { to: '/admin/faculty', label: 'Faculty', icon: FiUserCheck },
    { to: '/admin/departments', label: 'Departments', icon: FiGrid },
    { to: '/admin/subjects', label: 'Subjects', icon: FiLayers },
    { to: '/admin/reports', label: 'Reports', icon: FiBarChart2 },
    { to: '/admin/notifications', label: 'Notifications', icon: FiBell },
    { to: '/admin/settings', label: 'Settings', icon: FiSettings },
  ],
  faculty: [
    { to: '/faculty', label: 'Dashboard', icon: FiHome, end: true },
    { to: '/faculty/attendance', label: 'Attendance', icon: FiCalendar },
    { to: '/faculty/reports', label: 'Reports', icon: FiBarChart2 },
    { to: '/faculty/notifications', label: 'Notifications', icon: FiBell },
  ],
  student: [
    { to: '/student', label: 'Dashboard', icon: FiHome, end: true },
    { to: '/student/attendance', label: 'My Attendance', icon: FiCalendar },
    { to: '/student/notifications', label: 'Notifications', icon: FiBell },
  ],
}

export default function Sidebar() {
  const { user } = useAuth()
  const role = user?.role?.toLowerCase()
  const items = navByRole[role] || []

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-surface border-r border-border h-screen sticky top-0 px-4 py-6">
      <div className="px-2 mb-8 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue to-blue-light flex items-center justify-center">
          <span className="text-white font-heading font-bold text-sm">A</span>
        </div>
        <span className="text-lg font-heading font-semibold text-ink">AttendEase</span>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'bg-gradient-to-r from-blue to-blue-light text-white shadow-md shadow-blue/20'
                  : 'text-ink-soft hover:bg-cream-soft hover:text-ink'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <NavLink
        to={`/${role}/profile`}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
            isActive ? 'bg-blue/10 text-blue' : 'text-ink-soft hover:bg-cream-soft hover:text-ink'
          }`
        }
      >
        <FiUser size={18} />
        Profile
      </NavLink>
    </aside>
  )
}