import { FiUsers, FiUserCheck, FiCheckCircle, FiAlertTriangle, FiPlus, FiCalendar, FiFileText } from 'react-icons/fi'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/common/StatCard'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

// Mock data — replace with real API calls once backend endpoints are ready
const weeklyAttendance = [
  { day: 'Mon', percent: 88 }, { day: 'Tue', percent: 91 }, { day: 'Wed', percent: 85 },
  { day: 'Thu', percent: 93 }, { day: 'Fri', percent: 89 }, { day: 'Sat', percent: 94 },
]

const recentAttendance = [
  { subject: 'Data Structures', section: 'CSE-A', date: 'Jul 4', present: 52, total: 56 },
  { subject: 'Operating Systems', section: 'CSE-B', date: 'Jul 4', present: 48, total: 54 },
  { subject: 'Computer Networks', section: 'CSE-A', date: 'Jul 3', present: 50, total: 56 },
]

const lowAttendance = [
  { name: 'Karthik R', roll: 'CSE045', percent: 62 },
  { name: 'Divya S', roll: 'CSE012', percent: 58 },
  { name: 'Mohan V', roll: 'CSE033', percent: 65 },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Students" value="56" icon={FiUsers} />
        <StatCard label="Total Faculty" value="8" icon={FiUserCheck} />
        <StatCard label="Today's Attendance" value="91%" icon={FiCheckCircle} trend="+3% vs yesterday" />
        <StatCard label="Low Attendance Alerts" value="3" icon={FiAlertTriangle} />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button><FiPlus size={16} /> Add Student</Button>
        <Button variant="secondary"><FiCalendar size={16} /> Mark Attendance</Button>
        <Button variant="outline"><FiFileText size={16} /> View Reports</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Weekly Attendance Trend" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyAttendance}>
              <CartesianGrid stroke="#E7DAC5" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B5946' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6B5946' }} axisLine={false} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E7DAC5' }} />
              <Line type="monotone" dataKey="percent" stroke="#BC8A54" strokeWidth={2.5} dot={{ r: 4, fill: '#BC8A54' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Students to Watch">
          <ul className="space-y-3">
            {lowAttendance.map((s) => (
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

      <Card title="Recent Attendance" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Subject</th>
                <th className="py-2 font-medium">Section</th>
                <th className="py-2 font-medium">Date</th>
                <th className="py-2 font-medium">Present</th>
              </tr>
            </thead>
            <tbody>
              {recentAttendance.map((r, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink">{r.subject}</td>
                  <td className="py-3 text-ink-soft">{r.section}</td>
                  <td className="py-3 text-ink-soft">{r.date}</td>
                  <td className="py-3 text-ink">{r.present}/{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  )
}