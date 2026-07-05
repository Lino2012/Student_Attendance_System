import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import Input from '../../components/Input'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

export default function Signup() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async () => {
    setLoading(true)
    // NOTE: no signup endpoint exists in the backend docs.
    // Real accounts are created by an Admin via Student/Faculty management.
    // This is a UI-only preview until/unless a real endpoint is added.
    await new Promise((r) => setTimeout(r, 600))
    toast('This is a UI preview — account creation happens via your Admin, not self-signup.', { icon: 'ℹ️' })
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cream">
      <div className="w-full max-w-md bg-surface border border-border rounded-3xl shadow-xl p-8 md:p-10">
        <div className="mb-6 px-4 py-3 rounded-xl bg-warning/10 text-warning text-sm">
          Demo preview only — this form isn't connected to a real account creation endpoint yet.
        </div>

        <h1 className="text-2xl font-heading font-semibold text-ink mb-1">Create an account</h1>
        <p className="text-ink-soft text-sm mb-8">Preview of the signup flow.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input label="Full Name" icon={FiUser} placeholder="Your name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
          <Input label="Email" type="email" icon={FiMail} placeholder="you@college.edu" error={errors.email?.message} {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })} />
          <Input label="Password" type="password" icon={FiLock} placeholder="••••••••" error={errors.password?.message} {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'At least 6 characters' },
          })} />
          <Button type="submit" disabled={loading} className="w-full !py-3.5">
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-ink-soft mt-6">
          Already have an account? <Link to="/login" className="text-blue font-medium">Log in</Link>
        </p>
      </div>
    </div>
  )
}