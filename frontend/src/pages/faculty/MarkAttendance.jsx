import { useState } from 'react'
import { FiSave, FiRotateCcw } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Select from '../../components/common/Select'
import Input from '../../components/common/Input'
import toast from 'react-hot-toast'

// Mock data — replace with GET /api/students?subject=... once backend is wired
const mockStudents = [
  { id: 1, roll: 'CSE001', name: 'Aravind Kumar' },
  { id: 2, roll: 'CSE012', name: 'Divya S' },
  { id: 3, roll: 'CSE045', name: 'Karthik R' },
  { id: 4, roll: 'CSE028', name: 'Priya M' },
]

export default function MarkAttendance() {
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState('')
  const [session, setSession] = useState('1')
  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState({})

  const loadStudents = () => {
    if (!subject || !date) {
      toast.error('Select a subject and date first')
      return
    }
    // TODO: replace with real API call scoped to subject + date + session
    setStudents(mockStudents)
    setAttendance(Object.fromEntries(mockStudents.map((s) => [s.id, 'present'])))
  }

  const toggle = (id, status) => setAttendance((prev) => ({ ...prev, [id]: status }))

  const reset = () => {
    setStudents([])
    setAttendance({})
    setSubject('')
    setDate('')
  }

  const save = () => {
    // TODO: replace with POST /api/attendance
    const presentCount = Object.values(attendance).filter((v) => v === 'present').length
    toast.success(`Attendance saved — ${presentCount}/${students.length} present`)
  }

  return (
    <DashboardLayout title="Mark Attendance">
      <Card className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <Select label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Select subject</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Database Systems">Database Systems</option>
          </Select>
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Select label="Session" value={session} onChange={(e) => setSession(e.target.value)}>
            <option value="1">Session 1</option>
            <option value="2">Session 2</option>
          </Select>
          <Button onClick={loadStudents}>Load Students</Button>
        </div>
      </Card>

      {students.length > 0 && (
        <Card title={`${subject} · ${date} · Session ${session}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-soft border-b border-border">
                  <th className="py-2 font-medium">Roll No</th>
                  <th className="py-2 font-medium">Name</th>
                  <th className="py-2 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0">
                    <td className="py-3 text-ink-soft">{s.roll}</td>
                    <td className="py-3 text-ink font-medium">{s.name}</td>
                    <td className="py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggle(s.id, 'present')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${attendance[s.id] === 'present' ? 'bg-success text-white' : 'bg-cream-dark text-ink-soft'}`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => toggle(s.id, 'absent')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${attendance[s.id] === 'absent' ? 'bg-danger text-white' : 'bg-cream-dark text-ink-soft'}`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <Button variant="secondary" onClick={reset}><FiRotateCcw size={16} /> Reset</Button>
            <Button onClick={save}><FiSave size={16} /> Save Attendance</Button>
          </div>
        </Card>
      )}
    </DashboardLayout>
  )
}