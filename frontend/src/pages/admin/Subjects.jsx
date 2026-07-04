import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import toast from 'react-hot-toast'

// Mock data — replace with GET /api/subjects once backend is wired
const initialSubjects = [
  { id: 1, name: 'Data Structures', code: 'CS201', course: 'BE-CSE', semester: 3 },
  { id: 2, name: 'Operating Systems', code: 'CS301', course: 'BE-CSE', semester: 5 },
  { id: 3, name: 'Computer Networks', code: 'CS302', course: 'BE-CSE', semester: 5 },
]

export default function Subjects() {
  const [subjects, setSubjects] = useState(initialSubjects)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const openAdd = () => { setEditing(null); reset({ name: '', code: '', course: '', semester: '' }); setModalOpen(true) }
  const openEdit = (s) => { setEditing(s); reset(s); setModalOpen(true) }

  const onSubmit = (data) => {
    // TODO: replace with POST /api/subjects or PUT /api/subjects/:id
    if (editing) {
      setSubjects((prev) => prev.map((s) => (s.id === editing.id ? { ...s, ...data } : s)))
      toast.success('Subject updated')
    } else {
      setSubjects((prev) => [...prev, { id: Date.now(), ...data }])
      toast.success('Subject added')
    }
    setModalOpen(false)
  }

  const remove = (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id))
    toast.success('Subject removed')
  }

  return (
    <DashboardLayout title="Subjects">
      <Card title={`Subjects (${subjects.length})`} action={<Button onClick={openAdd}><FiPlus size={16} /> Add Subject</Button>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Code</th>
                <th className="py-2 font-medium">Course</th>
                <th className="py-2 font-medium">Semester</th>
                <th className="py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink font-medium">{s.name}</td>
                  <td className="py-3 text-ink-soft">{s.code}</td>
                  <td className="py-3 text-ink-soft">{s.course}</td>
                  <td className="py-3 text-ink-soft">{s.semester}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-ink-soft">
                      <button className="hover:text-ink" onClick={() => openEdit(s)}><FiEdit2 size={16} /></button>
                      <button className="hover:text-danger" onClick={() => remove(s.id)}><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Subject' : 'Add Subject'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Subject Name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <Input label="Code" error={errors.code?.message} {...register('code', { required: 'Code is required' })} />
          <Input label="Course" {...register('course')} />
          <Input label="Semester" type="number" {...register('semester')} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Subject'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}