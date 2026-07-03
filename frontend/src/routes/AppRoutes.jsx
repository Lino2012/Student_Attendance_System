import { Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/Login'
import ProtectedRoute from './ProtectedRoute'
import AdminDashboard from '../pages/admin/AdminDashboard'
import FacultyDashboard from '../pages/faculty/FacultyDashboard'
import StudentDashboard from '../pages/student/StudentDashboard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/*" element={
        <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="/faculty/*" element={
        <ProtectedRoute allowedRoles={['faculty']}><FacultyDashboard /></ProtectedRoute>
      } />
      <Route path="/student/*" element={
        <ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>
      } />
    </Routes>
  )
}