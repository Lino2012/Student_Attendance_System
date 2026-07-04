import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import toast from 'react-hot-toast'

// Mock data — replace with GET /api/courses once backend is wired
const initialCourses = [
  { id: 1, name: 'B.E. Computer Science', code: 'BE-CSE', department: 'CSE', duration: '4 years' },
  { id: 2, name: 'B.E. Electronics', code: 'BE-ECE', department: 'ECE', duration: '4 years' },
]

export default function Courses() {
  const [courses, setCourses] = useState(initialCourses)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const openAdd = () => { setEditing(null); reset({ name: '', code: '', department: 'CSE', duration: '' }); setModalOpen(true) }
  const openEdit = (c) => { setEditing(c); reset(c); setModalOpen(true) }

  const onSubmit = (data) => {
    // TODO: replace with POST /api/courses or PUT /api/courses/:id
    if (editing) {
      setCourses((prev) => prev.map((c) => (c.id === editing.id ? { ...c, ...data } : c)))
      toast.success('Course updated')
    } else {
      setCourses((prev) => [...prev, { id: Date.now(), ...data }])
      toast.success('Course added')
    }
    setModalOpen(false)
  }

  const remove = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id))
    toast.success('Course removed')
  }

  return (
    <DashboardLayout title="Courses">
      <Card title={`Courses (${courses.length})`} action={<Button onClick={openAdd}><FiPlus size={16} /> Add Course</Button>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Code</th>
                <th className="py-2 font-medium">Department</th>
                <th className="py-2 font-medium">Duration</th>
                <th className="py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink font-medium">{c.name}</td>
                  <td className="py-3 text-ink-soft">{c.code}</td>
                  <td className="py-3 text-ink-soft">{c.department}</td>
                  <td className="py-3 text-ink-soft">{c.duration}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-ink-soft">
                      <button className="hover:text-ink" onClick={() => openEdit(c)}><FiEdit2 size={16} /></button>
                      <button className="hover:text-danger" onClick={() => remove(c.id)}><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Course' : 'Add Course'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Course Name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <Input label="Code" error={errors.code?.message} {...register('code', { required: 'Code is required' })} />
          <Select label="Department" {...register('department')}>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
          </Select>
          <Input label="Duration" placeholder="e.g. 4 years" {...register('duration')} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Course'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}