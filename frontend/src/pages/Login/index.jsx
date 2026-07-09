import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { FiUser, FiLock, FiEye, FiEyeOff, FiUsers, FiCheckCircle, FiBarChart2 } from 'react-icons/fi'
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

  const onSubmit = async ({ email, password }) => {
    setLoading(true)
    try {
      const user = await login(email, password)
      toast.success(`Welcome back, ${user.name}`)
      navigate(`/${user.role.toLowerCase()}`)
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error('Login endpoint not available yet — backend still in progress')
      } else if (err.response?.status === 401) {
        toast.error('Invalid email or password')
      } else {
        toast.error('Could not reach the server')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative bg-gradient-to-br from-blue-dark via-blue to-blue-light overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.12),transparent_40%)]" />
        <div className="relative z-10 max-w-md">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-8">
            <span className="text-white font-heading font-bold text-lg">A</span>
          </div>
          <h1 className="text-3xl font-heading font-semibold text-white leading-tight mb-4">
            One platform for every attendance record.
          </h1>
          <p className="text-white/75 text-base leading-relaxed mb-10">
            Departments, faculty, students, and reports — all in one place.
          </p>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 space-y-4">
            {[
              { icon: FiUsers, text: 'Role-based dashboards for every user' },
              { icon: FiCheckCircle, text: 'Mark attendance in seconds' },
              { icon: FiBarChart2, text: 'Instant, exportable reports' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-white shrink-0">
                  <Icon size={16} />
                </div>
                <p className="text-white text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-page">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h2 className="text-2xl font-heading font-semibold text-ink mb-1">Welcome back</h2>
            <p className="text-ink-soft text-sm">Log in to your attendance dashboard.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <Input
              label="Email"
              type="email"
              icon={FiUser}
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email', { required: 'Email is required' })}
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
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3.5 top-[42px] text-ink-soft">
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            <Button type="submit" disabled={loading} className="w-full !py-3.5">
              {loading ? 'Signing in...' : 'Log In'}
            </Button>
          </form>

          <p className="text-center text-sm text-ink-soft mt-6">
            Don't have login details? <Link to="/signup" className="text-blue font-medium">Preview signup</Link>
          </p>
        </div>
      </div>
    </div>
  )
}