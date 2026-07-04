import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiPlus, FiEdit2, FiEye, FiLink } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import SearchInput from '../../components/common/SearchInput'
import toast from 'react-hot-toast'

// Mock data — replace with GET /api/faculty once backend is wired
const initialFaculty = [
  { id: 1, name: 'Dr. Sundaram K', empCode: 'FAC001', email: 'sundaram@college.edu', subjects: ['Data Structures', 'Algorithms'] },
  { id: 2, name: 'Prof. Lakshmi N', empCode: 'FAC002', email: 'lakshmi@college.edu', subjects: ['Database Systems'] },
  { id: 3, name: 'Dr. Ravi Shankar', empCode: 'FAC003', email: 'ravi@college.edu', subjects: ['Operating Systems', 'Computer Networks'] },
]

export default function Faculty() {
  const [faculty, setFaculty] = useState(initialFaculty)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const filtered = faculty.filter((f) => `${f.name} ${f.empCode} ${f.email}`.toLowerCase().includes(search.toLowerCase()))

  const openAdd = () => { setEditing(null); reset({ name: '', empCode: '', email: '' }); setModalOpen(true) }
  const openEdit = (f) => { setEditing(f); reset(f); setModalOpen(true) }

  const onSubmit = (data) => {
    // TODO: replace with POST /api/faculty or PUT /api/faculty/:id
    if (editing) {
      setFaculty((prev) => prev.map((f) => (f.id === editing.id ? { ...f, ...data } : f)))
      toast.success('Faculty updated')
    } else {
      setFaculty((prev) => [...prev, { id: Date.now(), subjects: [], ...data }])
      toast.success('Faculty added')
    }
    setModalOpen(false)
  }

  return (
    <DashboardLayout title="Faculty">
      <Card
        title={`All Faculty (${filtered.length})`}
        action={
          <div className="flex flex-wrap gap-2">
            <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search faculty..." />
            <Button onClick={openAdd}><FiPlus size={16} /> Add Faculty</Button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-soft border-b border-border">
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Employee Code</th>
                <th className="py-2 font-medium">Email</th>
                <th className="py-2 font-medium">Subjects</th>
                <th className="py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-ink font-medium">{f.name}</td>
                  <td className="py-3 text-ink-soft">{f.empCode}</td>
                  <td className="py-3 text-ink-soft">{f.email}</td>
                  <td className="py-3 text-ink-soft">{f.subjects.join(', ') || '—'}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-3 text-ink-soft">
                      <button title="View" className="hover:text-ink"><FiEye size={16} /></button>
                      <button title="Assign Subject" className="hover:text-camel"><FiLink size={16} /></button>
                      <button title="Edit" className="hover:text-ink" onClick={() => openEdit(f)}><FiEdit2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Faculty' : 'Add Faculty'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Full Name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <Input label="Employee Code" error={errors.empCode?.message} {...register('empCode', { required: 'Employee code is required' })} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Faculty'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}