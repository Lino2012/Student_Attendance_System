import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiPlus, FiEdit2, FiEye, FiUserX, FiDownload } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Badge from '../../components/common/Badge'
import SearchInput from '../../components/common/SearchInput'
import { exportToExcel } from '../../utils/exportExcel'
import toast from 'react-hot-toast'

// Mock data — replace with GET /api/students once backend is wired
const initialStudents = [
  { id: 1, name: 'Aravind Kumar', roll: 'CSE001', email: 'aravind@college.edu', department: 'CSE', status: 'active' },
  { id: 2, name: 'Divya S', roll: 'CSE012', email: 'divya@college.edu', department: 'CSE', status: 'active' },
  { id: 3, name: 'Karthik R', roll: 'CSE045', email: 'karthik@college.edu', department: 'CSE', status: 'active' },
  { id: 4, name: 'Priya M', roll: 'CSE028', email: 'priya@college.edu', department: 'CSE', status: 'inactive' },
]

export default function Students() {
  const [students, setStudents] = useState(initialStudents)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const filtered = students.filter((s) =>
    `${s.name} ${s.roll} ${s.email}`.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setEditing(null); reset({ name: '', roll: '', email: '', department: 'CSE' }); setModalOpen(true) }
  const openEdit = (student) => { setEditing(student); reset(student); setModalOpen(true) }

  const onSubmit = (data) => {
    // TODO: replace with POST /api/students or PUT /api/students/:id
    if (editing) {
      setStudents((prev) => prev.map((s) => (s.id === editing.id ? { ...s, ...data } : s)))
      toast.success('Student updated')
    } else {
      setStudents((prev) => [...prev, { id: Date.now(), status: 'active', ...data }])
      toast.success('Student added')
    }
    setModalOpen(false)
  }

  const toggleStatus = (id) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s)))
  }

  const handleExport = () => {
    exportToExcel({
      columns: ['Name', 'Roll No', 'Email', 'Department', 'Status'],
      rows: filtered.map((s) => [s.name, s.roll, s.email, s.department, s.status]),
      filename: 'students.xlsx',
    })
  }

  return (
    <DashboardLayout title="Students">
      <Card
        title={`All Students (${filtered.length})`}
        action={
          <div className="flex flex-wrap gap-2">
            <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." />
            <Button variant="outline" onClick={handleExport}><FiDownload size={16} /> Export</Button>
            <Button onClick={openAdd}><FiPlus size={16} /> Add Student</Button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Roll No</th>
                <th className="py-2 font-medium">Email</th>
                <th className="py-2 font-medium">Department</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink font-medium">{s.name}</td>
                  <td className="py-3 text-ink-soft">{s.roll}</td>
                  <td className="py-3 text-ink-soft">{s.email}</td>
                  <td className="py-3 text-ink-soft">{s.department}</td>
                  <td className="py-3"><Badge variant={s.status === 'active' ? 'success' : 'neutral'}>{s.status}</Badge></td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-ink-soft">
                      <button title="View" className="hover:text-ink"><FiEye size={16} /></button>
                      <button title="Edit" className="hover:text-ink" onClick={() => openEdit(s)}><FiEdit2 size={16} /></button>
                      <button title="Deactivate" className="hover:text-danger" onClick={() => toggleStatus(s.id)}><FiUserX size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="py-8 text-center text-ink-soft">No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Student' : 'Add Student'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Full Name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <Input label="Roll Number" error={errors.roll?.message} {...register('roll', { required: 'Roll number is required' })} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })} />
          <Select label="Department" {...register('department')}>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
          </Select>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Student'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}