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
import * as departmentService from '../../services/departmentService'
import toast from 'react-hot-toast'

export default function Departments() {
  const { data: departments, loading, error, reload } = useApi(departmentService.listDepartments)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const openAdd = () => { setEditing(null); reset({ code: '', name: '' }); setModalOpen(true) }
  const openEdit = (d) => { setEditing(d); reset(d); setModalOpen(true) }

  const onSubmit = async (formData) => {
    try {
      if (editing) {
        await departmentService.updateDepartment(editing.id, formData)
        toast.success('Department updated')
      } else {
        await departmentService.createDepartment(formData)
        toast.success('Department added')
      }
      setModalOpen(false)
      reload()
    } catch {
      toast.error('Could not save — check the backend endpoint')
    }
  }

  const handleDelete = async (id) => {
    try {
      await departmentService.deleteDepartment(id)
      toast.success('Department removed')
      reload()
    } catch {
      toast.error('Could not delete — check the backend endpoint')
    }
  }

  return (
    <DashboardLayout title="Departments">
      <Card
        title={`Departments${departments ? ` (${departments.length})` : ''}`}
        action={<Button onClick={openAdd}><FiPlus size={16} /> Add Department</Button>}
      >
        <Table loading={loading} error={error} empty={departments && departments.length === 0} emptyMessage="No departments yet — add the first one.">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Code</th>
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments?.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink-soft">{d.code}</td>
                  <td className="py-3 text-ink font-medium">{d.name}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-ink-soft">
                      <button className="hover:text-ink" onClick={() => openEdit(d)}><FiEdit2 size={16} /></button>
                      <button className="hover:text-danger" onClick={() => handleDelete(d.id)}><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Department' : 'Add Department'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Code" error={errors.code?.message} {...register('code', { required: 'Code is required' })} />
          <Input label="Name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Department'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}