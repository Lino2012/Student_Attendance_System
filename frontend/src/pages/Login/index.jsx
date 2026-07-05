import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/Input'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (formData) => {
    setLoading(true)
    try {
      const user = await login(formData.email, formData.password)
      toast.success(`Welcome back, ${user.name || user.email}`)
      navigate(`/${user.role.toLowerCase()}`)
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid email or password'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue via-blue-light to-blue relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.15),transparent_45%)]" />

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue to-blue-light mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-heading font-bold text-lg">A</span>
          </div>
          <h1 className="text-2xl font-heading font-semibold text-ink">Welcome back</h1>
          <p className="text-ink-soft text-sm mt-1">Log in to your attendance dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Email"
            type="email"
            icon={FiMail}
            placeholder="you@college.edu"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
            })}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              icon={FiLock}
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', { required: 'Password is required' })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3.5 top-[42px] text-ink-soft"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <Button type="submit" disabled={loading} className="w-full !py-3.5">
            {loading ? 'Signing in...' : 'Log In'}
          </Button>
        </form>

        <p className="text-center text-sm text-ink-soft mt-6">
          Don't have login details? Contact your administrator, or{' '}
          <Link to="/signup" className="text-blue font-medium">preview the signup flow</Link>.
        </p>
      </div>
    </div>
  )
}