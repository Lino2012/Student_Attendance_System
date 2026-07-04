import { useForm } from 'react-hook-form'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user } = useAuth()
  const profileForm = useForm({ defaultValues: { name: user?.name, email: user?.email, phone: '' } })
  const passwordForm = useForm()

  const onProfileSubmit = () => {
    // TODO: replace with PUT /api/profile
    toast.success('Profile updated')
  }

  const onPasswordSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      passwordForm.setError('confirmPassword', { message: 'Passwords do not match' })
      return
    }
    // TODO: replace with PUT /api/profile/password
    toast.success('Password changed')
    passwordForm.reset()
  }

  return (
    <DashboardLayout title="My Profile">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Profile Details">
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
            <Input label="Full Name" {...profileForm.register('name', { required: 'Name is required' })} error={profileForm.formState.errors.name?.message} />
            <Input label="Email" type="email" {...profileForm.register('email', { required: 'Email is required' })} error={profileForm.formState.errors.email?.message} />
            <Input label="Phone" type="tel" placeholder="10-digit phone number" {...profileForm.register('phone', {
              pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit phone number' },
            })} error={profileForm.formState.errors.phone?.message} />
            <div className="flex justify-end"><Button type="submit">Update Profile</Button></div>
          </form>
        </Card>

        <Card title="Change Password">
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            <Input label="Current Password" type="password" {...passwordForm.register('currentPassword', { required: 'Required' })} error={passwordForm.formState.errors.currentPassword?.message} />
            <Input label="New Password" type="password" {...passwordForm.register('newPassword', {
              required: 'Required', minLength: { value: 6, message: 'At least 6 characters' },
            })} error={passwordForm.formState.errors.newPassword?.message} />
            <Input label="Confirm New Password" type="password" {...passwordForm.register('confirmPassword', { required: 'Required' })} error={passwordForm.formState.errors.confirmPassword?.message} />
            <div className="flex justify-end"><Button type="submit">Change Password</Button></div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}