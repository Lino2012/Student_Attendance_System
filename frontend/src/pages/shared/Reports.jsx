import { useState } from 'react'
import { FiDownload, FiFileText, FiRotateCcw } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Select from '../../components/common/Select'
import Input from '../../components/common/Input'
import { exportToPDF } from '../../utils/exportPDF'
import { exportToExcel } from '../../utils/exportExcel'

// Mock data — replace with GET /api/reports once backend is wired
const mockReport = [
  { roll: 'CSE001', name: 'Aravind Kumar', present: 42, total: 48, percent: 88 },
  { roll: 'CSE012', name: 'Divya S', present: 38, total: 48, percent: 79 },
  { roll: 'CSE045', name: 'Karthik R', present: 30, total: 48, percent: 62 },
  { roll: 'CSE028', name: 'Priya M', present: 44, total: 48, percent: 92 },
]

export default function Reports({ title = 'Reports' }) {
  const [subject, setSubject] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [rows, setRows] = useState(mockReport)

  const generate = () => {
    // TODO: replace with GET /api/reports?subject=&from=&to=
    setRows(mockReport)
  }

  const resetFilters = () => {
    setSubject(''); setFrom(''); setTo(''); setRows(mockReport)
  }

  const columns = ['Roll No', 'Name', 'Present', 'Total', 'Percentage']
  const tableRows = rows.map((r) => [r.roll, r.name, r.present, r.total, `${r.percent}%`])

  return (
    <DashboardLayout title={title}>
      <Card className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <Select label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">All subjects</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Database Systems">Database Systems</option>
          </Select>
          <Input label="From" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <Input label="To" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={generate}>Generate</Button>
            <Button variant="secondary" onClick={resetFilters}><FiRotateCcw size={16} /></Button>
          </div>
        </div>
      </Card>

      <Card
        title={`Report (${rows.length} students)`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportToPDF({ title: 'Attendance Report', columns, rows: tableRows })}>
              <FiFileText size={16} /> PDF
            </Button>
            <Button variant="outline" onClick={() => exportToExcel({ columns, rows: tableRows })}>
              <FiDownload size={16} /> Excel
            </Button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Roll No</th>
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Present</th>
                <th className="py-2 font-medium">Total</th>
                <th className="py-2 font-medium">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.roll} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink-soft">{r.roll}</td>
                  <td className="py-3 text-ink font-medium">{r.name}</td>
                  <td className="py-3 text-ink-soft">{r.present}</td>
                  <td className="py-3 text-ink-soft">{r.total}</td>
                  <td className={`py-3 font-semibold ${r.percent < 75 ? 'text-danger' : 'text-success'}`}>{r.percent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  )
}