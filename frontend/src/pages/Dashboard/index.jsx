import { FiUsers, FiUserCheck, FiAlertTriangle } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/Card'
import Alert from '../../components/Alert'
import { useApi } from '../../hooks/useApi'
import * as studentService from '../../services/studentService'
import * as facultyService from '../../services/facultyService'

function Stat({ label, value, icon: Icon, loading, error }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-ink-soft mb-1">{label}</p>
        <p className="text-2xl font-heading font-semibold text-ink">
          {loading ? '—' : error ? 'N/A' : value}
        </p>
      </div>
      <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue">
        <Icon size={20} />
      </div>
    </div>
  )
}

function AdminView() {
  const { data: students, loading: studentsLoading, error: studentsError } = useApi(studentService.listStudents)
  const { data: faculty, loading: facultyLoading, error: facultyError } = useApi(facultyService.listFaculty)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card><Stat label="Total Students" value={students?.length} icon={FiUsers} loading={studentsLoading} error={studentsError} /></Card>
      <Card><Stat label="Total Faculty" value={faculty?.length} icon={FiUserCheck} loading={facultyLoading} error={facultyError} /></Card>
      <Card><Stat label="Attendance Overview" value="Not available yet" icon={FiAlertTriangle} /></Card>
    </div>
  )
}

function FacultyView() {
  return (
    <Alert variant="info">
      Your subject and attendance summary will appear here once the attendance endpoints are connected.
    </Alert>
  )
}

function StudentView() {
  return (
    <Alert variant="info">
      Your attendance summary will appear here once the attendance endpoints are connected.
    </Alert>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const role = user?.role?.toLowerCase()
  const titles = { admin: 'Admin Dashboard', faculty: 'Faculty Dashboard', student: 'My Dashboard' }

  return (
    <DashboardLayout title={titles[role] || 'Dashboard'}>
      {role === 'admin' && <AdminView />}
      {role === 'faculty' && <FacultyView />}
      {role === 'student' && <StudentView />}
    </DashboardLayout>
  )
}