import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../Loader'

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()

  if (loading) return <Loader full />
  if (!user) return <Navigate to="/login" />

  const role = user.role?.toString().toLowerCase()
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={role ? `/${role}` : '/login'} replace />
  }

  return children
}