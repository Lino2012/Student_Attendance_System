import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Table from '../../components/Table'
import { useApi } from '../../hooks/useApi'
import * as facultyService from '../../services/facultyService'
import * as departmentService from '../../services/departmentService'
import toast from 'react-hot-toast'

export default function Faculty() {
  const { data: faculty, loading, error, reload } = useApi(facultyService.listFaculty)
  const { data: departments } = useApi(departmentService.listDepartments)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const openAdd = () => {
    setEditing(null)
    reset({
      full_name: '',
      employee_code: '',
      email: '',
      department: ''
    })
    setModalOpen(true)
  }

  const openEdit = (f) => {
    setEditing(f)
    reset({
      full_name: f.full_name || '',
      employee_code: f.employee_code,
      email: f.email,
      department: f.department || ''
    })
    setModalOpen(true)
  }

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      department: formData.department ? parseInt(formData.department) : null,
    }

    try {
      if (editing) {
        await facultyService.updateFaculty(editing.id, payload)
        toast.success('Faculty updated successfully')
      } else {
        await facultyService.createFaculty(payload)
        toast.success('Faculty added successfully')
      }
      setModalOpen(false)
      reload()
    } catch {
      toast.error('Could not save faculty member.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) return
    try {
      await facultyService.deleteFaculty(id)
      toast.success('Faculty removed')
      reload()
    } catch {
      toast.error('Could not delete faculty member.')
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
                <th className="py-3 font-medium">Employee Code</th>
                <th className="py-3 font-medium">Name</th>
                <th className="py-3 font-medium">Email</th>
                <th className="py-3 font-medium">Department</th>
                <th className="py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty?.map((f) => (
                <tr key={f.id} className="border-b border-border last:border-0 hover:bg-cream-soft/50 transition-colors">
                  <td className="py-3 text-ink font-mono">{f.employee_code}</td>
                  <td className="py-3 text-ink font-medium">{f.full_name || f.username}</td>
                  <td className="py-3 text-ink-soft">{f.email}</td>
                  <td className="py-3 text-ink-soft">{f.department_name || 'N/A'}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-ink-soft">
                      <button className="hover:text-ink transition-colors" onClick={() => openEdit(f)}><FiEdit2 size={16} /></button>
                      <button className="hover:text-danger transition-colors" onClick={() => handleDelete(f.id)}><FiTrash2 size={16} /></button>
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
          <Input label="Full Name" error={errors.full_name?.message} {...register('full_name', { required: 'Full name is required' })} />
          <Input label="Employee Code" error={errors.employee_code?.message} {...register('employee_code', { required: 'Employee code is required' })} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />

          <Select label="Department" error={errors.department?.message} {...register('department', { required: 'Department is required' })}>
            <option value="">Select Department</option>
            {departments?.map((d) => (
              <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
            ))}
          </Select>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Faculty'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}