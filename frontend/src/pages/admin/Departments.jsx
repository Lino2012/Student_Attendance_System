import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import toast from 'react-hot-toast'

// Mock data — replace with GET /api/departments once backend is wired
const initialDepartments = [
  { id: 1, name: 'Computer Science Engineering', code: 'CSE', hod: 'Dr. Sundaram K' },
  { id: 2, name: 'Electronics & Communication', code: 'ECE', hod: 'Dr. Meena P' },
  { id: 3, name: 'Mechanical Engineering', code: 'MECH', hod: 'Dr. Arjun S' },
]

export default function Departments() {
  const [departments, setDepartments] = useState(initialDepartments)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const openAdd = () => { setEditing(null); reset({ name: '', code: '', hod: '' }); setModalOpen(true) }
  const openEdit = (d) => { setEditing(d); reset(d); setModalOpen(true) }

  const onSubmit = (data) => {
    // TODO: replace with POST /api/departments or PUT /api/departments/:id
    if (editing) {
      setDepartments((prev) => prev.map((d) => (d.id === editing.id ? { ...d, ...data } : d)))
      toast.success('Department updated')
    } else {
      setDepartments((prev) => [...prev, { id: Date.now(), ...data }])
      toast.success('Department added')
    }
    setModalOpen(false)
  }

  const remove = (id) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id))
    toast.success('Department removed')
  }

  return (
    <DashboardLayout title="Departments">
      <Card title={`Departments (${departments.length})`} action={<Button onClick={openAdd}><FiPlus size={16} /> Add Department</Button>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Code</th>
                <th className="py-2 font-medium">HOD</th>
                <th className="py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink font-medium">{d.name}</td>
                  <td className="py-3 text-ink-soft">{d.code}</td>
                  <td className="py-3 text-ink-soft">{d.hod}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-ink-soft">
                      <button className="hover:text-ink" onClick={() => openEdit(d)}><FiEdit2 size={16} /></button>
                      <button className="hover:text-danger" onClick={() => remove(d.id)}><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Department' : 'Add Department'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Department Name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <Input label="Code" error={errors.code?.message} {...register('code', { required: 'Code is required' })} />
          <Input label="Head of Department" {...register('hod')} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Department'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}