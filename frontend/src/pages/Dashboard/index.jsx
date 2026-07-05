import { FiUsers, FiUserCheck, FiCheckCircle, FiAlertTriangle, FiBookOpen, FiCalendar, FiPlus, FiFileText } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/Card'
import Alert from '../../components/Alert'
import Chart from '../../components/Chart'
import Button from '../../components/Button'

// Mock data — no dedicated dashboard/summary endpoint exists in the docs yet.
// Real version should compose this from GET /students/, /faculty/, /reports/attendance, etc.
const weeklyAttendance = [
  { day: 'Mon', percent: 88 }, { day: 'Tue', percent: 91 }, { day: 'Wed', percent: 85 },
  { day: 'Thu', percent: 93 }, { day: 'Fri', percent: 89 }, { day: 'Sat', percent: 94 },
]

const lowAttendanceStudents = [
  { name: 'Karthik R', roll: 'CSE045', percent: 62 },
  { name: 'Divya S', roll: 'CSE012', percent: 58 },
]

const subjectAttendance = [
  { subject: 'Data Structures', percent: 92 },
  { subject: 'Operating Systems', percent: 78 },
  { subject: 'Computer Networks', percent: 65 },
]

function AdminView() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card><Stat label="Total Students" value="56" icon={FiUsers} /></Card>
        <Card><Stat label="Total Faculty" value="8" icon={FiUserCheck} /></Card>
        <Card><Stat label="Today's Attendance" value="91%" icon={FiCheckCircle} /></Card>
        <Card><Stat label="Low Attendance Alerts" value="2" icon={FiAlertTriangle} /></Card>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button><FiPlus size={16} /> Add Student</Button>
        <Button variant="secondary"><FiCalendar size={16} /> Mark Attendance</Button>
        <Button variant="outline"><FiFileText size={16} /> View Reports</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Weekly Attendance Trend" className="lg:col-span-2">
          <Chart data={weeklyAttendance} dataKey="percent" xKey="day" />
        </Card>
        <Card title="Students to Watch">
          <ul className="space-y-3">
            {lowAttendanceStudents.map((s) => (
              <li key={s.roll} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink">{s.name}</p>
                  <p className="text-xs text-ink-soft">{s.roll}</p>
                </div>
                <span className="text-sm font-semibold text-danger">{s.percent}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}

function FacultyView() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card><Stat label="My Subjects" value="3" icon={FiBookOpen} /></Card>
        <Card><Stat label="Classes Today" value="3" icon={FiCalendar} /></Card>
        <Card><Stat label="Avg. Attendance" value="89%" icon={FiCheckCircle} /></Card>
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        <Button><FiCalendar size={16} /> Mark Attendance</Button>
        <Button variant="outline"><FiFileText size={16} /> View Reports</Button>
      </div>
      <Card title="Weekly Attendance Trend">
        <Chart data={weeklyAttendance} dataKey="percent" xKey="day" />
      </Card>
    </>
  )
}

function StudentView() {
  const belowThreshold = subjectAttendance.some((s) => s.percent < 75)
  return (
    <>
      {belowThreshold && (
        <div className="mb-6">
          <Alert variant="warning">Your attendance in Computer Networks is below the required 75%.</Alert>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card><Stat label="Overall Attendance" value="81%" icon={FiCheckCircle} /></Card>
        <Card><Stat label="Subjects Enrolled" value={subjectAttendance.length} icon={FiBookOpen} /></Card>
        <Card><Stat label="Below 75%" value="1 subject" icon={FiAlertTriangle} /></Card>
      </div>
      <Card title="Subject-wise Attendance">
        <ul className="space-y-4">
          {subjectAttendance.map((s) => (
            <li key={s.subject}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-ink font-medium">{s.subject}</span>
                <span className={s.percent < 75 ? 'text-danger font-semibold' : 'text-ink-soft'}>{s.percent}%</span>
              </div>
              <div className="w-full h-2 bg-cream-soft rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${s.percent < 75 ? 'bg-danger' : 'bg-blue'}`}
                  style={{ width: `${s.percent}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-ink-soft mb-1">{label}</p>
        <p className="text-2xl font-heading font-semibold text-ink">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue">
        <Icon size={20} />
      </div>
    </div>
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