import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Dashboard from '../pages/Dashboard'

const PrivateRoutes = [
  <Route key="admin-dashboard" path="/admin" element={
    <ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>
  } />,
  <Route key="faculty-dashboard" path="/faculty" element={
    <ProtectedRoute allowedRoles={['faculty']}><Dashboard /></ProtectedRoute>
  } />,
  <Route key="student-dashboard" path="/student" element={
    <ProtectedRoute allowedRoles={['student']}><Dashboard /></ProtectedRoute>
  } />,
]

export default PrivateRoutes