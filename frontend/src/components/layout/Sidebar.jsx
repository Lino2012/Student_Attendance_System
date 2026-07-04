import { NavLink } from 'react-router-dom'
import {
  FiHome, FiUsers, FiUserCheck, FiBookOpen, FiLayers, FiCalendar,
  FiBarChart2, FiSettings, FiUser, FiGrid
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const navByRole = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: FiHome, end: true },
    { to: '/admin/students', label: 'Students', icon: FiUsers },
    { to: '/admin/faculty', label: 'Faculty', icon: FiUserCheck },
    { to: '/admin/departments', label: 'Departments', icon: FiGrid },
    { to: '/admin/courses', label: 'Courses', icon: FiBookOpen },
    { to: '/admin/subjects', label: 'Subjects', icon: FiLayers },
    { to: '/admin/reports', label: 'Reports', icon: FiBarChart2 },
    { to: '/admin/settings', label: 'Settings', icon: FiSettings },
  ],
  faculty: [
    { to: '/faculty', label: 'Dashboard', icon: FiHome, end: true },
    { to: '/faculty/attendance', label: 'Mark Attendance', icon: FiCalendar },
    { to: '/faculty/reports', label: 'My Reports', icon: FiBarChart2 },
  ],
  student: [
    { to: '/student', label: 'Dashboard', icon: FiHome, end: true },
    { to: '/student/attendance', label: 'My Attendance', icon: FiCalendar },
  ],
}

export default function Sidebar() {
  const { user } = useAuth()
  const items = navByRole[user?.role] || []

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-cream-dark border-r border-border h-screen sticky top-0 px-4 py-6">
      <div className="px-2 mb-8">
        <span className="text-xl font-heading font-semibold text-ink">AttendEase</span>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive ? 'bg-camel text-white' : 'text-ink-soft hover:bg-surface hover:text-ink'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <NavLink
        to={`/${user?.role}/profile`}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
            isActive ? 'bg-camel text-white' : 'text-ink-soft hover:bg-surface hover:text-ink'
          }`
        }
      >
        <FiUser size={18} />
        Profile
      </NavLink>
    </aside>
  )
}