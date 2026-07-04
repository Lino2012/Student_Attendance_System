import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // TODO: replace with real API call once backend login endpoint is ready
      // const res = await api.post('/auth/login', data)
      const role = data.email.startsWith('admin')
        ? 'admin'
        : data.email.startsWith('faculty')
        ? 'faculty'
        : 'student'

      const mockUser = { name: data.email.split('@')[0], email: data.email, role }
      await new Promise((resolve) => setTimeout(resolve, 500))

      login(mockUser, 'demo-token')
      toast.success(`Welcome back, ${mockUser.name}`)
      navigate(`/${role}`)
    } catch (err) {
      toast.error('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-cream">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-camel to-camel-dark flex-col justify-between p-12 text-white">
        <span className="text-2xl font-heading font-semibold tracking-tight">AttendEase</span>
        <div className="max-w-md">
          <h1 className="text-4xl font-heading font-semibold leading-tight mb-4">
            One place for every attendance record.
          </h1>
          <p className="text-white/80 text-base leading-relaxed">
            Track classes, manage students, and generate reports — built for the CSE department.
          </p>
        </div>
        <p className="text-white/60 text-sm">Fab Four · Student Attendance Management System</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-heading font-semibold text-ink mb-1">Sign in</h2>
          <p className="text-ink-soft text-sm mb-8">Enter your credentials to access your dashboard.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" size={18} />
                <input
                  type="email"
                  placeholder="you@college.edu"
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg border bg-surface text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-camel/40 transition ${
                    errors.email ? 'border-danger' : 'border-border'
                  }`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                  })}
                />
              </div>
              {errors.email && <p className="text-danger text-xs mt-1.5">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg border bg-surface text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-camel/40 transition ${
                    errors.password ? 'border-danger' : 'border-border'
                  }`}
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-danger text-xs mt-1.5">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-camel hover:bg-camel-dark text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="text-xs text-ink-soft mt-8">
            Demo mode — no backend yet: any password works. Use an email starting with "admin", "faculty", or "student" (e.g. admin@college.edu) to preview each dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}