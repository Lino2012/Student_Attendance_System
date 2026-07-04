import { FiCheckCircle, FiBookOpen, FiAlertTriangle } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/common/StatCard'
import Card from '../../components/common/Card'

const subjectAttendance = [
  { subject: 'Data Structures', percent: 92 },
  { subject: 'Operating Systems', percent: 78 },
  { subject: 'Computer Networks', percent: 65 },
  { subject: 'Database Systems', percent: 88 },
]

export default function StudentDashboard() {
  return (
    <DashboardLayout title="My Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Overall Attendance" value="81%" icon={FiCheckCircle} />
        <StatCard label="Subjects Enrolled" value="4" icon={FiBookOpen} />
        <StatCard label="Below 75%" value="1 subject" icon={FiAlertTriangle} />
      </div>

      <Card title="Subject-wise Attendance">
        <ul className="space-y-4">
          {subjectAttendance.map((s) => (
            <li key={s.subject}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-ink font-medium">{s.subject}</span>
                <span className={s.percent < 75 ? 'text-danger font-semibold' : 'text-ink-soft'}>{s.percent}%</span>
              </div>
              <div className="w-full h-2 bg-cream-dark rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${s.percent < 75 ? 'bg-danger' : 'bg-camel'}`}
                  style={{ width: `${s.percent}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </DashboardLayout>
  )
}