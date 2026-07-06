import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Table from '../../components/Table'
import { useApi } from '../../hooks/useApi'
import * as studentService from '../../services/studentService'
import toast from 'react-hot-toast'

export default function Students() {
  const { data: students, loading, error, reload } = useApi(studentService.listStudents)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const openAdd = () => { setEditing(null); reset({ roll_number: '', email: '', semester: '', section: '' }); setModalOpen(true) }
  const openEdit = (s) => { setEditing(s); reset(s); setModalOpen(true) }

  const onSubmit = async (formData) => {
    try {
      if (editing) {
        await studentService.updateStudent(editing.id, formData)
        toast.success('Student updated')
      } else {
        await studentService.createStudent(formData)
        toast.success('Student added')
      }
      setModalOpen(false)
      reload()
    } catch {
      toast.error('Could not save — check the backend endpoint')
    }
  }

  const handleDelete = async (id) => {
    try {
      await studentService.deleteStudent(id)
      toast.success('Student removed')
      reload()
    } catch {
      toast.error('Could not delete — check the backend endpoint')
    }
  }

  return (
    <DashboardLayout title="Students">
      <Card
        title={`Students${students ? ` (${students.length})` : ''}`}
        action={<Button onClick={openAdd}><FiPlus size={16} /> Add Student</Button>}
      >
        <Table loading={loading} error={error} empty={students && students.length === 0} emptyMessage="No students yet — add the first one.">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Roll No</th>
                <th className="py-2 font-medium">Email</th>
                <th className="py-2 font-medium">Semester</th>
                <th className="py-2 font-medium">Section</th>
                <th className="py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students?.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink font-medium">{s.roll_number}</td>
                  <td className="py-3 text-ink-soft">{s.email}</td>
                  <td className="py-3 text-ink-soft">{s.semester}</td>
                  <td className="py-3 text-ink-soft">{s.section}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-ink-soft">
                      <button className="hover:text-ink" onClick={() => openEdit(s)}><FiEdit2 size={16} /></button>
                      <button className="hover:text-danger" onClick={() => handleDelete(s.id)}><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Student' : 'Add Student'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Roll Number" error={errors.roll_number?.message} {...register('roll_number', { required: 'Roll number is required' })} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
          <Input label="Semester" type="number" error={errors.semester?.message} {...register('semester', { required: 'Semester is required' })} />
          <Input label="Section" error={errors.section?.message} {...register('section', { required: 'Section is required' })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Student'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}