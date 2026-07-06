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
import * as subjectService from '../../services/subjectService'
import toast from 'react-hot-toast'

export default function Subjects() {
  const { data: subjects, loading, error, reload } = useApi(subjectService.listSubjects)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const openAdd = () => { setEditing(null); reset({ code: '', name: '', course: '', semester: '' }); setModalOpen(true) }
  const openEdit = (s) => { setEditing(s); reset(s); setModalOpen(true) }

  const onSubmit = async (formData) => {
    try {
      if (editing) {
        await subjectService.updateSubject(editing.id, formData)
        toast.success('Subject updated')
      } else {
        await subjectService.createSubject(formData)
        toast.success('Subject added')
      }
      setModalOpen(false)
      reload()
    } catch {
      toast.error('Could not save — check the backend endpoint')
    }
  }

  const handleDelete = async (id) => {
    try {
      await subjectService.deleteSubject(id)
      toast.success('Subject removed')
      reload()
    } catch {
      toast.error('Could not delete — check the backend endpoint')
    }
  }

  return (
    <DashboardLayout title="Subjects">
      <Card
        title={`Subjects${subjects ? ` (${subjects.length})` : ''}`}
        action={<Button onClick={openAdd}><FiPlus size={16} /> Add Subject</Button>}
      >
        <Table loading={loading} error={error} empty={subjects && subjects.length === 0} emptyMessage="No subjects yet — add the first one.">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Code</th>
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Course</th>
                <th className="py-2 font-medium">Semester</th>
                <th className="py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects?.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink-soft">{s.code}</td>
                  <td className="py-3 text-ink font-medium">{s.name}</td>
                  <td className="py-3 text-ink-soft">{s.course}</td>
                  <td className="py-3 text-ink-soft">{s.semester}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Subject' : 'Add Subject'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Code" error={errors.code?.message} {...register('code', { required: 'Code is required' })} />
          <Input label="Name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <Input label="Course ID" error={errors.course?.message} {...register('course', { required: 'Course is required' })} />
          <Input label="Semester" type="number" error={errors.semester?.message} {...register('semester', { required: 'Semester is required' })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Subject'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}