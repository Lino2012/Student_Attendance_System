import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Dashboard from '../pages/Dashboard'
import Departments from '../pages/Departments'
import Subjects from '../pages/Subjects'
import Students from '../pages/Students'
import Faculty from '../pages/Faculty'

const PrivateRoutes = [
  <Route key="admin-dashboard" path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />,
  <Route key="admin-departments" path="/admin/departments" element={<ProtectedRoute allowedRoles={['admin']}><Departments /></ProtectedRoute>} />,
  <Route key="admin-subjects" path="/admin/subjects" element={<ProtectedRoute allowedRoles={['admin']}><Subjects /></ProtectedRoute>} />,
  <Route key="admin-students" path="/admin/students" element={<ProtectedRoute allowedRoles={['admin']}><Students /></ProtectedRoute>} />,
  <Route key="admin-faculty" path="/admin/faculty" element={<ProtectedRoute allowedRoles={['admin']}><Faculty /></ProtectedRoute>} />,

  <Route key="faculty-dashboard" path="/faculty" element={<ProtectedRoute allowedRoles={['faculty']}><Dashboard /></ProtectedRoute>} />,
  <Route key="student-dashboard" path="/student" element={<ProtectedRoute allowedRoles={['student']}><Dashboard /></ProtectedRoute>} />,
]

export default PrivateRoutes