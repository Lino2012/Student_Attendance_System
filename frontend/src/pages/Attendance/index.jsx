import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Select from '../../components/Select'
import Input from '../../components/Input'
import Alert from '../../components/Alert'
import Table from '../../components/Table'
import { useApi } from '../../hooks/useApi'
import * as subjectService from '../../services/subjectService'
import * as studentService from '../../services/studentService'
import * as attendanceService from '../../services/attendanceService'
import toast from 'react-hot-toast'
import { FiCalendar, FiPlus, FiCheck, FiX, FiClipboard } from 'react-icons/fi'

export default function Attendance() {
  const { user } = useAuth()
  const role = user?.role?.toLowerCase()

  // Faculty state
  const { data: subjects } = useApi(subjectService.listSubjects)
  const { data: allStudents } = useApi(studentService.listStudents)

  const [selectedSubject, setSelectedSubject] = useState('')
  const [semester, setSemester] = useState(1)
  const [section, setSection] = useState('A')
  const [sessionNum, setSessionNum] = useState(1)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [showMarkingSheet, setShowMarkingSheet] = useState(false)
  const [studentsToMark, setStudentsToMark] = useState([])
  const [saving, setSaving] = useState(false)

  // Student/Admin state
  const [sessions, setSessions] = useState([])
  const [loadingSessions, setLoadingSessions] = useState(true)

  useEffect(() => {
    if (role === 'student' || role === 'admin') {
      attendanceService.listSessions()
        .then(data => {
          setSessions(data)
          setLoadingSessions(false)
        })
        .catch(() => setLoadingSessions(false))
    }
  }, [role])

  const handleStartMarking = () => {
    if (!selectedSubject) {
      toast.error('Please select a subject')
      return
    }

    // Filter students by semester and section matching selection
    const filtered = allStudents?.filter(
      s => parseInt(s.semester) === parseInt(semester) && s.section.toLowerCase() === section.toLowerCase()
    ) || []

    if (filtered.length === 0) {
      toast.error('No students found matching this semester and section.')
      return
    }

    // Initialize all to PRESENT
    setStudentsToMark(filtered.map(s => ({
      studentId: s.id,
      roll_number: s.roll_number,
      name: s.full_name || s.username,
      status: 'PRESENT'
    })))
    setShowMarkingSheet(true)
  }

  const handleToggleStatus = (index) => {
    setStudentsToMark(prev => prev.map((item, idx) => {
      if (idx !== index) return item
      const nextStatus = item.status === 'PRESENT' ? 'ABSENT' : 'PRESENT'
      return { ...item, status: nextStatus }
    }))
  }

  const handleSubmitAttendance = async () => {
    setSaving(true)
    try {
      // Find subject course
      const subjectObj = subjects.find(s => s.id === parseInt(selectedSubject))
      if (!subjectObj) throw new Error('Subject not found')

      // Create attendance session
      const sessionPayload = {
        subject: parseInt(selectedSubject),
        faculty: user.id, // Assuming user.id corresponds to their Faculty profile id or we can resolve it
        course: subjectObj.course,
        semester: parseInt(semester),
        section,
        date,
        session_number: parseInt(sessionNum)
      }

      // Check if backend has the faculty ID.
      // Realistically we need a real faculty ID. If user.role is faculty, user profile might have faculty_profile.
      // Let's resolve the faculty ID from the faculty list if needed.
      let resolvedFacultyId = 1
      try {
        const facList = await facultyService.listFaculty()
        const myFac = facList.find(f => f.user === user.id)
        if (myFac) resolvedFacultyId = myFac.id
      } catch (e) {
        // Fallback
      }
      sessionPayload.faculty = resolvedFacultyId

      const newSession = await attendanceService.createSession(sessionPayload)

      // Create attendance records
      const recordPromises = studentsToMark.map(s =>
        attendanceService.createRecord({
          session: newSession.id,
          student: s.studentId,
          status: s.status,
          marked_by: user.id
        })
      )

      await Promise.all(recordPromises)

      toast.success('Attendance submitted successfully!')
      setShowMarkingSheet(false)
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.detail || 'Failed to submit attendance.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <DashboardLayout title="Attendance Management">
      {role === 'faculty' && (
        <div className="space-y-6">
          {!showMarkingSheet ? (
            <Card title="Start Attendance Session" icon={FiCalendar}>
              <div className="space-y-4 max-w-xl">
                <Select label="Subject" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                  <option value="">Select Subject</option>
                  {subjects?.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </Select>

                <div className="grid grid-cols-2 gap-4">
                  <Select label="Semester" value={semester} onChange={e => setSemester(e.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </Select>
                  <Select label="Section" value={section} onChange={e => setSection(e.target.value)}>
                    {['A', 'B', 'C', 'D'].map(sec => (
                      <option key={sec} value={sec}>Section {sec}</option>
                    ))}
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input label="Session Number" type="number" min={1} value={sessionNum} onChange={e => setSessionNum(e.target.value)} />
                  <Input label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>

                <Button onClick={handleStartMarking} className="w-full">
                  <FiPlus size={16} /> Get Student List
                </Button>
              </div>
            </Card>
          ) : (
            <Card
              title={`Mark Attendance - Sem ${semester} (Sec ${section})`}
              action={<Button variant="secondary" onClick={() => setShowMarkingSheet(false)}>Back</Button>}
            >
              <p className="text-sm text-ink-soft mb-6 flex items-center gap-1.5">
                <FiClipboard size={14} /> Total students: {studentsToMark.length}
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-ink-soft border-b border-border">
                      <th className="py-3 font-medium">Roll Number</th>
                      <th className="py-3 font-medium">Name</th>
                      <th className="py-3 font-medium text-center">Status</th>
                      <th className="py-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsToMark.map((s, idx) => (
                      <tr key={s.studentId} className="border-b border-border last:border-0 hover:bg-cream-soft/50">
                        <td className="py-3 text-ink font-mono">{s.roll_number}</td>
                        <td className="py-3 text-ink font-medium">{s.name}</td>
                        <td className="py-3 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.status === 'PRESENT' ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
                            }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleToggleStatus(idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${s.status === 'PRESENT'
                                ? 'bg-danger/5 border-danger/10 text-danger hover:bg-danger/10'
                                : 'bg-success/5 border-success/10 text-success hover:bg-success/10'
                              }`}
                          >
                            {s.status === 'PRESENT' ? 'Mark Absent' : 'Mark Present'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="secondary" onClick={() => setShowMarkingSheet(false)}>Cancel</Button>
                <Button onClick={handleSubmitAttendance} disabled={saving}>
                  {saving ? 'Saving...' : 'Submit Attendance'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {(role === 'student' || role === 'admin') && (
        <Card title="Attendance Sessions History">
          <Table loading={loadingSessions} empty={sessions.length === 0} emptyMessage="No attendance sessions recorded yet.">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-soft border-b border-border">
                  <th className="py-3 font-medium">Date</th>
                  <th className="py-3 font-medium">Subject</th>
                  <th className="py-3 font-medium">Course</th>
                  <th className="py-3 font-medium">Sem/Sec</th>
                  <th className="py-3 font-medium">Session No</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(s => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-cream-soft/50">
                    <td className="py-3 text-ink">{s.date}</td>
                    <td className="py-3 text-ink font-medium">{s.subject_name}</td>
                    <td className="py-3 text-ink-soft">{s.course_name}</td>
                    <td className="py-3 text-ink-soft">Sem {s.semester} ({s.section})</td>
                    <td className="py-3 text-ink-soft">Session {s.session_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Table>
        </Card>
      )}
    </DashboardLayout>
  )
}
