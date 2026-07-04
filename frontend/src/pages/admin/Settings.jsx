import { useForm } from 'react-hook-form'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import toast from 'react-hot-toast'

export default function Settings() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { institutionName: '', academicYear: '2025-2026', threshold: 75 },
  })

  const onSubmit = () => {
    // TODO: replace with PUT /api/settings
    toast.success('Settings saved')
  }

  return (
    <DashboardLayout title="Settings">
      <Card title="System Settings" className="max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Institution Name" {...register('institutionName', { required: 'Required' })} error={errors.institutionName?.message} />
          <Input label="Academic Year" {...register('academicYear', { required: 'Required' })} error={errors.academicYear?.message} />
          <Input
            label="Attendance Threshold (%)"
            type="number"
            {...register('threshold', {
              required: 'Required',
              min: { value: 0, message: 'Must be between 0 and 100' },
              max: { value: 100, message: 'Must be between 0 and 100' },
            })}
            error={errors.threshold?.message}
          />
          <div className="flex justify-end"><Button type="submit">Save Settings</Button></div>
        </form>
      </Card>
    </DashboardLayout>
  )
}