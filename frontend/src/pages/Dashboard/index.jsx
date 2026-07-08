import { FiUsers, FiUserCheck, FiGrid, FiLayers, FiTrendingUp } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/Card'
import Alert from '../../components/Alert'
import Chart from '../../components/Chart'
import { useApi } from '../../hooks/useApi'
import * as studentService from '../../services/studentService'
import * as facultyService from '../../services/facultyService'
import * as departmentService from '../../services/departmentService'
import * as subjectService from '../../services/subjectService'

function Stat({ label, value, icon: Icon, loading, error, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue/10 text-blue',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
  }
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-ink-soft mb-1">{label}</p>
        <p className="text-2xl font-heading font-semibold text-ink">
          {loading ? '—' : error ? 'N/A' : value}
        </p>
      </div>
      <div className={`w-10 h-10 rounded-full ${colorMap[color]} flex items-center justify-center`}>
        <Icon size={20} />
      </div>
    </div>
  )
}

function AdminView() {
  const { data: students, loading: sL, error: sE } = useApi(studentService.listStudents)
  const { data: faculty, loading: fL, error: fE } = useApi(facultyService.listFaculty)
  const { data: departments, loading: dL, error: dE } = useApi(departmentService.listDepartments)
  const { data: subjects, loading: subL, error: subE } = useApi(subjectService.listSubjects)

  // Mock attendance trend data for the chart
  const trendData = [
    { month: 'Jan', attendance: 92 },
    { month: 'Feb', attendance: 88 },
    { month: 'Mar', attendance: 95 },
    { month: 'Apr', attendance: 91 },
    { month: 'May', attendance: 89 },
    { month: 'Jun', attendance: 94 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><Stat label="Total Students" value={students?.length ?? 0} icon={FiUsers} loading={sL} error={sE} color="blue" /></Card>
        <Card><Stat label="Total Faculty" value={faculty?.length ?? 0} icon={FiUserCheck} loading={fL} error={fE} color="success" /></Card>
        <Card><Stat label="Departments" value={departments?.length ?? 0} icon={FiGrid} loading={dL} error={dE} color="warning" /></Card>
        <Card><Stat label="Subjects" value={subjects?.length ?? 0} icon={FiLayers} loading={subL} error={subE} color="danger" /></Card>
      </div>

      <Card title="Attendance Trend" className="mt-2">
        <div className="flex items-center gap-2 text-xs text-ink-soft mb-4">
          <FiTrendingUp size={14} />
          <span>Monthly attendance overview (sample data)</span>
        </div>
        <Chart data={trendData} dataKey="attendance" xKey="month" height={240} />
      </Card>

      {students && students.length > 0 && (
        <Card title="Recent Students">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-soft border-b border-border">
                  <th className="py-2 font-medium">Name</th>
                  <th className="py-2 font-medium">Roll No</th>
                  <th className="py-2 font-medium">Department</th>
                  <th className="py-2 font-medium">Semester</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 5).map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0">
                    <td className="py-3 text-ink font-medium">{s.full_name || s.username}</td>
                    <td className="py-3 text-ink-soft">{s.roll_number}</td>
                    <td className="py-3 text-ink-soft">{s.department_name}</td>
                    <td className="py-3 text-ink-soft">{s.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
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