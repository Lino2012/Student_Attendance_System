import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import ProtectedRoute from './ProtectedRoute'

import AdminDashboard from '../pages/admin/AdminDashboard'
import Students from '../pages/admin/Students'
import Faculty from '../pages/admin/Faculty'
import Departments from '../pages/admin/Departments'
import Courses from '../pages/admin/Courses'
import Subjects from '../pages/admin/Subjects'
import Settings from '../pages/admin/Settings'

import FacultyDashboard from '../pages/faculty/FacultyDashboard'
import MarkAttendance from '../pages/faculty/MarkAttendance'

import StudentDashboard from '../pages/student/StudentDashboard'
import MyAttendance from '../pages/student/MyAttendance'

import Reports from '../pages/shared/Reports'
import Profile from '../pages/shared/Profile'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/students" element={<ProtectedRoute allowedRoles={['admin']}><Students /></ProtectedRoute>} />
      <Route path="/admin/faculty" element={<ProtectedRoute allowedRoles={['admin']}><Faculty /></ProtectedRoute>} />
      <Route path="/admin/departments" element={<ProtectedRoute allowedRoles={['admin']}><Departments /></ProtectedRoute>} />
      <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={['admin']}><Courses /></ProtectedRoute>} />
      <Route path="/admin/subjects" element={<ProtectedRoute allowedRoles={['admin']}><Subjects /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><Reports title="Reports" /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><Settings /></ProtectedRoute>} />
      <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><Profile /></ProtectedRoute>} />

      <Route path="/faculty" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyDashboard /></ProtectedRoute>} />
      <Route path="/faculty/attendance" element={<ProtectedRoute allowedRoles={['faculty']}><MarkAttendance /></ProtectedRoute>} />
      <Route path="/faculty/reports" element={<ProtectedRoute allowedRoles={['faculty']}><Reports title="My Reports" /></ProtectedRoute>} />
      <Route path="/faculty/profile" element={<ProtectedRoute allowedRoles={['faculty']}><Profile /></ProtectedRoute>} />

      <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={['student']}><MyAttendance /></ProtectedRoute>} />
      <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><Profile /></ProtectedRoute>} />
    </Routes>
  )
}