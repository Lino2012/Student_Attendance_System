import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { FiUser, FiLock, FiEye, FiEyeOff, FiUsers, FiCheckCircle, FiBarChart2 } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/Input'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

// Embedded CSS styles for Login-specific 3D effects, animations, and zigzag divider
function LoginStyleInjector() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes border-pulse {
        0%, 100% { border-color: rgba(96, 165, 250, 0.3); }
        50% { border-color: rgba(96, 165, 250, 0.7); }
      }
      @keyframes float-light {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
        50% { transform: translateY(-15px) scale(1.1); opacity: 0.6; }
      }
      .perspective-1000 {
        perspective: 1000px;
      }
      .preserve-3d {
        transform-style: preserve-3d;
      }
      .backface-hidden {
        backface-visibility: hidden;
      }
      .glassmorphism-blue-light {
        background: rgba(239, 246, 255, 0.45);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 1px solid rgba(255, 255, 255, 0.85);
        box-shadow: 0 15px 45px 0 rgba(37, 99, 235, 0.08), inset 0 0 20px rgba(255, 255, 255, 0.65);
      }
      .glow-blue-light {
        box-shadow: 0 0 20px rgba(37, 99, 235, 0.15);
      }
    ` }} />
  )
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  // 3D Carousel Refs and state
  const ringRef = useRef(null)
  const isHovered = useRef(false)
  const mouseX = useRef(0)
  const targetAngle = useRef(0)
  const currentAngle = useRef(0)
  const [radius, setRadius] = useState(220)

  // Login Card 3D Tilt refs
  const cardRef = useRef(null)
  const [cardRotate, setCardRotate] = useState({ x: 0, y: 0 })
  const [cardHovered, setCardHovered] = useState(false)

  // Dynamically calculate 3D radius based on width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(160)
      } else {
        setRadius(220)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-rotation animation loop with inertia
  useEffect(() => {
    let frameId
    const updateRotation = () => {
      if (!isHovered.current) {
        targetAngle.current += 0.35 // Auto spin speed
      } else {
        targetAngle.current += mouseX.current * 1.2 // Steer on mouse enter
      }

      currentAngle.current += (targetAngle.current - currentAngle.current) * 0.08

      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${currentAngle.current}deg)`
      }
      frameId = requestAnimationFrame(updateRotation)
    }

    frameId = requestAnimationFrame(updateRotation)
    return () => cancelAnimationFrame(frameId)
  }, [])

  // Handle left side horizontal mouse steer
  const handleLeftMouseMove = (e) => {
    if (!ringRef.current) return
    const container = ringRef.current.parentElement
    const rect = container.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    mouseX.current = x / (rect.width / 2) // range -1 to 1
  }

  // Handle right side login card 3D tilt
  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5 // range -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setCardRotate({ x: x * 15, y: y * -15 })
  }

  const onSubmit = async ({ username, password }) => {
    setLoading(true)
    try {
      const user = await login(username, password)
      toast.success(`Welcome back, ${user.full_name || user.username}`)
      navigate(`/${user.role.toLowerCase()}`)
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error('Login endpoint not available yet — backend still in progress')
      } else if (err.response?.status === 401) {
        toast.error('Invalid username or password')
      } else {
        toast.error('Could not reach the server')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-slate-50 via-blue-50/50 to-blue/5 overflow-hidden relative select-none">
      <LoginStyleInjector />

      {/* Decorative Background Orbs for Deep Space feeling */}
      <div className="absolute top-[10%] right-[30%] w-[35rem] h-[35rem] bg-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-5%] w-[25rem] h-[25rem] bg-blue-light/10 rounded-full blur-[120px] pointer-events-none" />

      {/* LEFT SIDE: 3D Rotating Ring Carousel of Images */}
      <div 
        onMouseMove={handleLeftMouseMove}
        onMouseEnter={() => { isHovered.current = true }}
        onMouseLeave={() => { 
          isHovered.current = false
          mouseX.current = 0
        }}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 92% 35%, 98% 65%, 85% 100%, 0 100%)'
        }}
        className="hidden lg:flex w-[55%] h-screen relative bg-white border-r border-slate-200/50 flex-col justify-between p-12 overflow-hidden z-10"
      >
        {/* Glow grid helper for depth */}
        <div 
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Brand header */}
        <div className="relative flex items-center gap-3 z-20">
          <Link to="/" className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-dark via-blue to-blue-light flex items-center justify-center shadow-lg shadow-blue/20">
            <span className="text-white font-heading font-extrabold text-lg">A</span>
          </Link>
          <div>
            <h3 className="text-sm font-heading font-extrabold text-ink leading-tight">AttendEase</h3>
            <p className="text-[10px] text-ink-soft font-semibold uppercase tracking-wider">Educational ecosystem</p>
          </div>
        </div>

        {/* 3D Image Carousel Ring */}
        <div className="perspective-1000 w-full flex items-center justify-center h-[360px] relative z-20">
          <div 
            ref={ringRef}
            className="preserve-3d relative w-[200px] h-[260px] transition-transform duration-100"
          >
            {[
              { img: '/login_img_1.jpg', title: 'Student Progress', desc: 'Real-time analytics logs' },
              { img: '/login_img_2.jpg', title: 'Interactive Board', desc: 'Subject metrics tracker' },
              { img: '/login_img_3.jpg', title: 'Stress Analytics', desc: 'Classroom trends sync' },
              { img: '/login_img_4.jpg', title: 'Direct Exports', desc: 'Spreadsheet attendance files' }
            ].map((item, i) => {
              const angle = i * 90
              return (
                <div
                  key={i}
                  className="absolute inset-0 backface-hidden bg-white/70 border border-white backdrop-blur-md rounded-2xl p-3 shadow-lg flex flex-col justify-between hover:border-blue/30 transition-all duration-300"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  }}
                >
                  <div className="w-full h-[70%] rounded-xl overflow-hidden bg-slate-100 border border-slate-200/50">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback illustration
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<div class="w-full h-full bg-gradient-to-tr from-blue/10 to-blue-light/10 flex items-center justify-center text-blue"><FiBarChart2 size="28"/></div>`;
                      }}
                    />
                  </div>
                  <div className="pt-2">
                    <h5 className="text-[11px] font-heading font-extrabold text-ink leading-tight">{item.title}</h5>
                    <p className="text-[9px] text-ink-soft leading-normal font-semibold mt-0.5">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Info footer */}
        <div className="relative z-20 flex items-center gap-4 bg-white/40 border border-white/60 backdrop-blur-sm p-4 rounded-2xl w-fit">
          <div className="w-8 h-8 rounded-full bg-blue/15 text-blue flex items-center justify-center">
            <FiCheckCircle size={15} />
          </div>
          <div>
            <p className="text-xs font-bold text-ink">99.9% Sync Accuracy</p>
            <p className="text-[10px] text-ink-soft">Encrypted academic records ledger</p>
          </div>
        </div>

        {/* Zigzag Glowing Border SVG Overlay */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-20" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="glow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="45%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="65%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Neon path tracing the polygon edge */}
          <path 
            d="M 100,0 L 92,35 L 98,65 L 85,100" 
            fill="none" 
            stroke="url(#glow-grad)" 
            strokeWidth="0.5" 
            filter="url(#glow-blur)"
            className="drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]"
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />

          {/* Floating light particles traveling along the zigzag border */}
          <circle r="2.5" fill="#93C5FD" filter="url(#glow-blur)">
            <animateMotion dur="7s" repeatCount="indefinite" path="M 100,0 L 92,35 L 98,65 L 85,100" />
          </circle>
          <circle r="1.8" fill="#FFFFFF" filter="url(#glow-blur)">
            <animateMotion dur="7s" begin="3.5s" repeatCount="indefinite" path="M 100,0 L 92,35 L 98,65 L 85,100" />
          </circle>
        </svg>
      </div>

      {/* RIGHT SIDE: Interactive Login Panel with Light Blue Glassy Tilt Card */}
      <div className="flex-1 lg:w-[45%] flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div 
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseEnter={() => setCardHovered(true)}
          onMouseLeave={() => {
            setCardHovered(false)
            setCardRotate({ x: 0, y: 0 })
          }}
          style={{
            transform: cardHovered
              ? `perspective(1000px) rotateX(${cardRotate.y}deg) rotateY(${cardRotate.x}deg) translateZ(8px)`
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
            transition: cardHovered ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          className="w-full max-w-md glassmorphism-blue-light rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden"
        >
          {/* Subtle blue accent light in card corner */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue/10 rounded-full blur-2xl pointer-events-none" />

          {/* Form Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
              <span className="text-[10px] font-extrabold tracking-widest text-blue-dark uppercase">Access Portal</span>
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-ink mb-2 leading-tight">Welcome Back</h2>
            <p className="text-ink-soft text-xs font-semibold">Enter details below to access your attendance console.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="space-y-4">
              <Input
                label="Username"
                icon={FiUser}
                placeholder="Username code"
                error={errors.username?.message}
                className="bg-white/80 border-blue/15 text-ink placeholder:text-ink-soft/40 focus:border-blue/50 focus:bg-white focus:ring-4 focus:ring-blue/10 shadow-sm focus:shadow-[0_0_15px_rgba(37,99,235,0.25)] transition-all duration-300"
                {...register('username', { required: 'Username is required' })}
              />
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  icon={FiLock}
                  placeholder="••••••••"
                  error={errors.password?.message}
                  className="bg-white/80 border-blue/15 text-ink placeholder:text-ink-soft/40 focus:border-blue/50 focus:bg-white focus:ring-4 focus:ring-blue/10 shadow-sm focus:shadow-[0_0_15px_rgba(37,99,235,0.25)] transition-all duration-300"
                  {...register('password', { required: 'Password is required' })}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword((s) => !s)} 
                  className="absolute right-4 top-[40px] text-ink-soft hover:text-blue transition-colors"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Custom styled submit button with gradient */}
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full !py-4 rounded-xl text-white font-bold bg-gradient-to-r from-blue-dark via-blue to-blue-light hover:shadow-xl hover:shadow-blue/20 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Validating session...</span>
                </div>
              ) : (
                'Launch Console'
              )}
            </Button>
          </form>

          {/* Signup prompt */}
          <p className="text-center text-xs text-ink-soft font-semibold mt-8">
            Need organization access? <Link to="/signup" className="text-blue hover:text-blue-light font-bold transition-colors">Preview signup</Link>
          </p>
        </div>
      </div>
    </div>
  )
}