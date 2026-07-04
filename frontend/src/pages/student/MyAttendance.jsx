import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'

// Mock data — replace with GET /api/students/:id/attendance once backend is wired
const monthly = [
  { subject: 'Data Structures', present: 42, total: 48, percent: 88 },
  { subject: 'Operating Systems', present: 36, total: 46, percent: 78 },
  { subject: 'Computer Networks', present: 28, total: 43, percent: 65 },
  { subject: 'Database Systems', present: 40, total: 45, percent: 89 },
]

export default function MyAttendance() {
  return (
    <DashboardLayout title="My Attendance">
      <Card title="Subject-wise Breakdown">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Subject</th>
                <th className="py-2 font-medium">Present</th>
                <th className="py-2 font-medium">Total Classes</th>
                <th className="py-2 font-medium">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {monthly.map((m) => (
                <tr key={m.subject} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink font-medium">{m.subject}</td>
                  <td className="py-3 text-ink-soft">{m.present}</td>
                  <td className="py-3 text-ink-soft">{m.total}</td>
                  <td className={`py-3 font-semibold ${m.percent < 75 ? 'text-danger' : 'text-success'}`}>{m.percent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  )
}