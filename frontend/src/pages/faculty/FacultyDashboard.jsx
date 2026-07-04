import { FiBookOpen, FiCalendar, FiCheckCircle } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/common/StatCard'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

const todaysSchedule = [
  { subject: 'Data Structures', section: 'CSE-A', time: '9:00 AM', marked: true },
  { subject: 'Database Systems', section: 'CSE-B', time: '11:00 AM', marked: false },
  { subject: 'Data Structures', section: 'CSE-B', time: '2:00 PM', marked: false },
]

export default function FacultyDashboard() {
  return (
    <DashboardLayout title="Faculty Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="My Subjects" value="3" icon={FiBookOpen} />
        <StatCard label="Classes Today" value="3" icon={FiCalendar} />
        <StatCard label="Avg. Attendance" value="89%" icon={FiCheckCircle} />
      </div>

      <Card title="Today's Schedule">
        <ul className="divide-y divide-border">
          {todaysSchedule.map((c, i) => (
            <li key={i} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-ink">{c.subject} · {c.section}</p>
                <p className="text-xs text-ink-soft">{c.time}</p>
              </div>
              {c.marked ? (
                <span className="text-xs font-medium text-success bg-success/10 px-3 py-1 rounded-full">Marked</span>
              ) : (
                <Button variant="secondary">Mark Attendance</Button>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </DashboardLayout>
  )
}