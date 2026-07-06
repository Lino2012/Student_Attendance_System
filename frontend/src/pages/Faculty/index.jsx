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
import * as facultyService from '../../services/facultyService'
import toast from 'react-hot-toast'

export default function Faculty() {
  const { data: faculty, loading, error, reload } = useApi(facultyService.listFaculty)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const openAdd = () => { setEditing(null); reset({ employee_code: '', email: '' }); setModalOpen(true) }
  const openEdit = (f) => { setEditing(f); reset(f); setModalOpen(true) }

  const onSubmit = async (formData) => {
    try {
      if (editing) {
        await facultyService.updateFaculty(editing.id, formData)
        toast.success('Faculty updated')
      } else {
        await facultyService.createFaculty(formData)
        toast.success('Faculty added')
      }
      setModalOpen(false)
      reload()
    } catch {
      toast.error('Could not save — check the backend endpoint')
    }
  }

  const handleDelete = async (id) => {
    try {
      await facultyService.deleteFaculty(id)
      toast.success('Faculty removed')
      reload()
    } catch {
      toast.error('Could not delete — check the backend endpoint')
    }
  }

  return (
    <DashboardLayout title="Faculty">
      <Card
        title={`Faculty${faculty ? ` (${faculty.length})` : ''}`}
        action={<Button onClick={openAdd}><FiPlus size={16} /> Add Faculty</Button>}
      >
        <Table loading={loading} error={error} empty={faculty && faculty.length === 0} emptyMessage="No faculty yet — add the first one.">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Employee Code</th>
                <th className="py-2 font-medium">Email</th>
                <th className="py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty?.map((f) => (
                <tr key={f.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink font-medium">{f.employee_code}</td>
                  <td className="py-3 text-ink-soft">{f.email}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-ink-soft">
                      <button className="hover:text-ink" onClick={() => openEdit(f)}><FiEdit2 size={16} /></button>
                      <button className="hover:text-danger" onClick={() => handleDelete(f.id)}><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Faculty' : 'Add Faculty'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Employee Code" error={errors.employee_code?.message} {...register('employee_code', { required: 'Employee code is required' })} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Faculty'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}