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
import * as studentService from '../../services/studentService'
import * as departmentService from '../../services/departmentService'
import * as courseService from '../../services/courseService'
import toast from 'react-hot-toast'

export default function Students() {
  const { data: students, loading, error, reload } = useApi(studentService.listStudents)
  const { data: departments } = useApi(departmentService.listDepartments)
  const { data: courses } = useApi(courseService.listCourses)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const openAdd = () => {
    setEditing(null)
    reset({
      full_name: '',
      roll_number: '',
      email: '',
      semester: 1,
      section: 'A',
      department: '',
      course: ''
    })
    setModalOpen(true)
  }

  const openEdit = (s) => {
    setEditing(s)
    reset({
      full_name: s.full_name || '',
      roll_number: s.roll_number,
      email: s.email,
      semester: s.semester,
      section: s.section,
      department: s.department || '',
      course: s.course || ''
    })
    setModalOpen(true)
  }

  const onSubmit = async (formData) => {
    // Convert department and course IDs to integers if selected
    const payload = {
      ...formData,
      department: formData.department ? parseInt(formData.department) : null,
      course: formData.course ? parseInt(formData.course) : null,
      semester: parseInt(formData.semester),
    }

    try {
      if (editing) {
        await studentService.updateStudent(editing.id, payload)
        toast.success('Student updated successfully')
      } else {
        await studentService.createStudent(payload)
        toast.success('Student added successfully')
      }
      setModalOpen(false)
      reload()
    } catch (err) {
      console.error(err)
      toast.error('Could not save student. Check backend fields.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return
    try {
      await studentService.deleteStudent(id)
      toast.success('Student removed')
      reload()
    } catch {
      toast.error('Could not delete student.')
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
                <th className="py-3 font-medium">Roll No</th>
                <th className="py-3 font-medium">Name</th>
                <th className="py-3 font-medium">Email</th>
                <th className="py-3 font-medium">Department</th>
                <th className="py-3 font-medium">Course</th>
                <th className="py-3 font-medium">Semester / Sec</th>
                <th className="py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students?.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-cream-soft/50 transition-colors">
                  <td className="py-3 text-ink font-mono">{s.roll_number}</td>
                  <td className="py-3 text-ink font-medium">{s.full_name || s.username}</td>
                  <td className="py-3 text-ink-soft">{s.email}</td>
                  <td className="py-3 text-ink-soft">{s.department_name || 'N/A'}</td>
                  <td className="py-3 text-ink-soft">{s.course_name || 'N/A'}</td>
                  <td className="py-3 text-ink-soft">Sem {s.semester} (Sec {s.section})</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Student' : 'Add Student'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Full Name" error={errors.full_name?.message} {...register('full_name', { required: 'Full name is required' })} />
          <Input label="Roll Number" error={errors.roll_number?.message} {...register('roll_number', { required: 'Roll number is required' })} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />

          <Select label="Department" error={errors.department?.message} {...register('department', { required: 'Department is required' })}>
            <option value="">Select Department</option>
            {departments?.map((d) => (
              <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
            ))}
          </Select>

          <Select label="Course" error={errors.course?.message} {...register('course', { required: 'Course is required' })}>
            <option value="">Select Course</option>
            {courses?.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
            ))}
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Semester" type="number" error={errors.semester?.message} {...register('semester', { required: 'Semester is required', min: 1 })} />
            <Input label="Section" error={errors.section?.message} {...register('section', { required: 'Section is required' })} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Student'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}