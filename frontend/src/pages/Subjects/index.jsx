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
import * as subjectService from '../../services/subjectService'
import * as courseService from '../../services/courseService'
import toast from 'react-hot-toast'

export default function Subjects() {
  const { data: subjects, loading, error, reload } = useApi(subjectService.listSubjects)
  const { data: courses } = useApi(courseService.listCourses)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const openAdd = () => {
    setEditing(null)
    reset({
      code: '',
      name: '',
      course: '',
      semester: 1
    })
    setModalOpen(true)
  }

  const openEdit = (s) => {
    setEditing(s)
    reset({
      code: s.code,
      name: s.name,
      course: s.course || '',
      semester: s.semester
    })
    setModalOpen(true)
  }

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      course: formData.course ? parseInt(formData.course) : null,
      semester: parseInt(formData.semester)
    }

    try {
      if (editing) {
        await subjectService.updateSubject(editing.id, payload)
        toast.success('Subject updated successfully')
      } else {
        await subjectService.createSubject(payload)
        toast.success('Subject added successfully')
      }
      setModalOpen(false)
      reload()
    } catch {
      toast.error('Could not save subject.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) return
    try {
      await subjectService.deleteSubject(id)
      toast.success('Subject removed')
      reload()
    } catch {
      toast.error('Could not delete subject.')
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
                <th className="py-3 font-medium">Code</th>
                <th className="py-3 font-medium">Name</th>
                <th className="py-3 font-medium">Course</th>
                <th className="py-3 font-medium">Semester</th>
                <th className="py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects?.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-cream-soft/50 transition-colors">
                  <td className="py-3 text-ink font-mono">{s.code}</td>
                  <td className="py-3 text-ink font-medium">{s.name}</td>
                  <td className="py-3 text-ink-soft">{s.course_name || 'N/A'}</td>
                  <td className="py-3 text-ink-soft">Sem {s.semester}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-ink-soft">
                      <button className="hover:text-ink transition-colors" onClick={() => openEdit(s)}><FiEdit2 size={16} /></button>
                      <button className="hover:text-danger transition-colors" onClick={() => handleDelete(s.id)}><FiTrash2 size={16} /></button>
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
          
          <Select label="Course" error={errors.course?.message} {...register('course', { required: 'Course is required' })}>
            <option value="">Select Course</option>
            {courses?.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
            ))}
          </Select>

          <Input label="Semester" type="number" error={errors.semester?.message} {...register('semester', { required: 'Semester is required', min: 1 })} />

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Subject'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}