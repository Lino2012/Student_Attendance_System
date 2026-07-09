import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, ShieldCheck, CalendarCheck, BarChart3, Building2, FileDown,
  ArrowRight, CheckCircle2, TrendingUp, Menu, X, Twitter, Linkedin, Github,
  Sparkles, Cpu, Award, Bell, RefreshCw, Lock, Send, Check
} from 'lucide-react'

// Custom CSS styles injected to enable 3D effects and custom animations
function StyleInjector() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-12px) rotate(1deg); }
      }
      @keyframes float-medium {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(-1.5deg); }
      }
      @keyframes float-fast {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-8px) rotate(0.5deg); }
      }
      @keyframes scan-line {
        0% { top: 0%; opacity: 0.8; }
        50% { opacity: 1; }
        100% { top: 100%; opacity: 0.8; }
      }
      @keyframes pulse-ring {
        0% { transform: scale(0.95); opacity: 0.5; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(0.95); opacity: 0.5; }
      }
      .glassmorphism {
        background: rgba(255, 255, 255, 0.45);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.6);
        box-shadow: 0 8px 32px 0 rgba(37, 99, 235, 0.05);
      }
      .glassmorphism-blue {
        background: rgba(37, 99, 235, 0.06);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(37, 99, 235, 0.15);
        box-shadow: 0 8px 32px 0 rgba(37, 99, 235, 0.08);
      }
      .perspective-1500 {
        perspective: 1500px;
      }
      .preserve-3d {
        transform-style: preserve-3d;
      }
      .backface-hidden {
        backface-visibility: hidden;
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(37, 99, 235, 0.2);
        border-radius: 10px;
      }
    ` }} />
  )
}

function GlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-50/50">
      {/* High-tech blueprint/grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Floating radial neon light orbs */}
      <div className="absolute top-10 left-10 w-[45rem] h-[45rem] bg-blue/10 rounded-full blur-[140px] mix-blend-multiply animate-[float-medium_12s_infinite_ease-in-out]" />
      <div className="absolute top-[40%] right-[-10rem] w-[40rem] h-[40rem] bg-blue-light/15 rounded-full blur-[160px] mix-blend-screen animate-[float-slow_15s_infinite_ease-in-out]" />
      <div className="absolute bottom-[-10rem] left-[20%] w-[35rem] h-[35rem] bg-blue/80 opacity-[0.06] rounded-full blur-[130px] animate-[float-fast_9s_infinite_ease-in-out]" />
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/50 backdrop-blur-2xl border-b border-blue/10 shadow-lg shadow-blue/5 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-dark via-blue to-blue-light flex items-center justify-center shadow-lg shadow-blue/30 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-heading font-extrabold text-lg">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-heading font-extrabold text-ink leading-tight tracking-wide">AttendEase</span>
            <span className="text-[10px] font-semibold text-blue-dark/70 tracking-widest uppercase">System</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-9 text-sm font-semibold text-ink-soft">
          <a href="#features" className="hover:text-blue transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue hover:after:w-full after:transition-all">Features</a>
          <a href="#carousel" className="hover:text-blue transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue hover:after:w-full after:transition-all">3D Explore</a>
          <a href="#about" className="hover:text-blue transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue hover:after:w-full after:transition-all">About</a>
          <a href="#contact" className="hover:text-blue transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue hover:after:w-full after:transition-all">Contact</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-ink hover:text-blue px-4 py-2 transition duration-300">
            Login
          </Link>
          <Link 
            to="/signup" 
            className="text-sm font-semibold text-white bg-gradient-to-r from-blue-dark via-blue to-blue-light px-6 py-2.5 rounded-xl shadow-lg shadow-blue/20 hover:shadow-xl hover:shadow-blue/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>

        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center text-ink rounded-lg bg-blue/5 border border-blue/10" 
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full inset-x-0 bg-white/95 backdrop-blur-2xl border-b border-blue/10 px-6 py-6 flex flex-col gap-4 shadow-xl"
          >
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-ink hover:text-blue py-1.5 border-b border-slate-100">Features</a>
            <a href="#carousel" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-ink hover:text-blue py-1.5 border-b border-slate-100">3D Explore</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-ink hover:text-blue py-1.5 border-b border-slate-100">About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-ink hover:text-blue py-1.5 border-b border-slate-100">Contact</a>
            <div className="flex gap-4 pt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-semibold text-ink bg-slate-100 py-2.5 rounded-xl border border-slate-200">Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-semibold text-white bg-blue py-2.5 rounded-xl shadow-md">Sign Up</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function DashboardMockup() {
  const stats = [
    { label: 'Total Students', value: '1,240', color: 'from-blue to-blue-light' },
    { label: 'Faculty Members', value: '86', color: 'from-blue-dark to-blue' },
    { label: 'Departments', value: '12', color: 'from-indigo-500 to-blue-light' },
    { label: 'Attendance', value: '94%', color: 'from-success to-emerald-400' },
  ]
  return (
    <div className="relative bg-white/40 border border-white/70 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-6 md:p-8">
      {/* Glow highlight inside */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue/5 to-transparent rounded-[2rem] pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/50">
        <div className="flex gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-danger/70 shadow-md shadow-danger/20" />
          <span className="w-3.5 h-3.5 rounded-full bg-warning/70 shadow-md shadow-warning/20" />
          <span className="w-3.5 h-3.5 rounded-full bg-success/70 shadow-md shadow-success/20" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue/10 border border-blue/20">
          <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
          <span className="text-[10px] text-blue-dark font-extrabold tracking-wider uppercase">Console Active</span>
        </div>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/70 border border-slate-100 hover:border-blue/20 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg shadow-sm">
            <p className="text-[11px] text-ink-soft font-semibold mb-1 uppercase tracking-wider">{s.label}</p>
            <p className="text-2xl font-heading font-extrabold text-ink bg-gradient-to-r from-blue-dark to-blue bg-clip-text text-transparent">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Analytics Graph with active animating bars */}
      <div className="bg-white/80 border border-slate-100 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-ink font-semibold flex items-center gap-2">
            <TrendingUp size={14} className="text-blue" /> Attendance Analytics
          </p>
          <span className="text-[10px] font-semibold text-success bg-success/15 px-2 py-0.5 rounded-full">+4.2% this wk</span>
        </div>
        <div className="flex items-end gap-3.5 h-20 px-2 justify-between">
          {[42, 68, 55, 88, 62, 95, 78].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.08, duration: 1.2, ease: 'easeOut' }}
                className="w-full bg-gradient-to-t from-blue-dark via-blue to-blue-light rounded-t-lg relative group"
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-white text-[9px] px-1.5 py-0.5 rounded shadow transition-all duration-300">
                  {h}%
                </div>
              </motion.div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-ink-soft font-medium px-1">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      {/* Recent Activity List */}
      <div>
        <p className="text-xs text-ink font-bold mb-3 uppercase tracking-wider">System Live Feed</p>
        <div className="space-y-2.5">
          {[
            { text: 'Attendance logged for CSE Dept - Sec A', time: 'Just now' },
            { text: 'New Faculty registered (Dr. Roberts)', time: '2m ago' },
            { text: 'Weekly automated reports compiled', time: '15m ago' }
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between text-xs border-b border-slate-100 pb-2 last:border-0 last:pb-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-ink-soft font-medium">{a.text}</span>
              </div>
              <span className="text-[10px] text-ink-soft/70 font-semibold italic">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const containerRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  // Track cursor position to create 3D interactive tilting
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5 // range -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setCoords({ x, y })
  }

  // Smooth out coordinate tracking using interpolation variables
  const transformStyle = hovered
    ? {
        transform: `perspective(1000px) rotateY(${coords.x * 25}deg) rotateX(${coords.y * -25}deg) translateZ(10px)`,
        transition: 'transform 0.1s ease-out'
      }
    : {
        transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
        transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }

  // Floating offset for individual cards
  const getFloatingStyle = (intensity) => {
    if (!hovered) return { transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' }
    return {
      transform: `translate3d(${coords.x * intensity}px, ${coords.y * intensity}px, ${intensity}px)`,
      transition: 'transform 0.1s ease-out'
    }
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setCoords({ x: 0, y: 0 })
      }}
      className="relative pt-36 pb-28 px-6 md:px-10 max-w-7xl mx-auto overflow-visible select-none"
    >
      <GlowBackground />
      <div className="grid lg:grid-cols-12 gap-16 items-center">
        {/* Left Copy block */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue bg-blue/10 px-4 py-2 rounded-full mb-6 w-fit border border-blue/20">
            <Sparkles size={13} className="text-blue" />
            Smart Attendance Management Platform
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-ink leading-[1.08] mb-6">
            Digitize Attendance <br />
            <span className="bg-gradient-to-r from-blue-dark via-blue to-blue-light bg-clip-text text-transparent">
              Empower Learning
            </span>
          </h1>
          <p className="text-ink-soft text-lg leading-relaxed mb-9 max-w-lg font-medium">
            Transform manual registers into instant, interactive dashboard insight reports. Empower faculty and keep students informed via real-time attendance syncing.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/signup" 
              className="inline-flex items-center gap-2.5 text-white bg-gradient-to-r from-blue-dark via-blue to-blue-light px-8 py-4 rounded-2xl shadow-xl shadow-blue/20 hover:shadow-2xl hover:shadow-blue/30 hover:-translate-y-1 transition-all duration-300 font-bold"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link 
              to="/login" 
              className="text-ink font-bold px-8 py-4 rounded-2xl border border-slate-200 bg-white/60 hover:bg-slate-100/80 transition-all duration-300"
            >
              Login Panel
            </Link>
          </div>
        </motion.div>

        {/* Right 3D Interactive Mockup with Floating Glass cards */}
        <div className="lg:col-span-6 perspective-1500 relative flex justify-center items-center h-[520px] md:h-[580px] w-full">
          {/* Central Main Dashboard */}
          <motion.div 
            style={transformStyle}
            className="w-full max-w-[460px] preserve-3d cursor-pointer z-20"
          >
            <DashboardMockup />
          </motion.div>

          {/* Floating Glassmorphism Card 1 (Top Left) */}
          <motion.div
            style={getFloatingStyle(-40)}
            className="absolute -top-6 -left-6 z-30 glassmorphism p-4 rounded-2xl w-48 shadow-xl animate-[float-slow_8s_infinite_ease-in-out]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue/10 text-blue flex items-center justify-center">
                <Bell size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue uppercase tracking-wider">Alerts Hub</p>
                <p className="text-xs font-bold text-ink">9 Attendance Flagged</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Glassmorphism Card 2 (Top Right) */}
          <motion.div
            style={getFloatingStyle(50)}
            className="absolute top-12 -right-8 z-30 glassmorphism-blue p-4 rounded-2xl w-52 shadow-xl border border-blue/15 animate-[float-medium_9s_infinite_ease-in-out]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold text-blue-dark tracking-widest uppercase">Live Class Scanner</span>
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>
            <div className="relative h-20 bg-blue/5 rounded-lg overflow-hidden flex items-center justify-center border border-blue/10">
              {/* Radar sweep lines */}
              <div className="absolute inset-x-0 h-0.5 bg-blue/40 shadow-lg shadow-blue animate-[scan-line_3s_infinite_linear]" />
              <Cpu size={28} className="text-blue animate-pulse" />
            </div>
          </motion.div>

          {/* Floating Glassmorphism Card 3 (Bottom Left) */}
          <motion.div
            style={getFloatingStyle(60)}
            className="absolute bottom-10 -left-12 z-30 glassmorphism p-4 rounded-2xl w-52 shadow-xl animate-[float-medium_10s_infinite_ease-in-out]"
          >
            <div className="flex items-center gap-3.5 mb-2.5">
              <div className="w-9 h-9 rounded-full bg-blue/10 flex items-center justify-center text-blue">
                <Users size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-ink">Active Students</p>
                <p className="text-[10px] text-ink-soft">12 Classes In Session</p>
              </div>
            </div>
            {/* Tiny progress bars */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] font-bold text-ink-soft">
                <span>CS-B</span>
                <span>94%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue to-blue-light h-full w-[94%]" />
              </div>
            </div>
          </motion.div>

          {/* Floating Glassmorphism Card 4 (Bottom Right) */}
          <motion.div
            style={getFloatingStyle(-50)}
            className="absolute -bottom-2 right-[-2rem] z-30 glassmorphism p-4 rounded-2xl w-48 shadow-xl animate-[float-fast_7s_infinite_ease-in-out]"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-success flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-success uppercase tracking-widest">Platform Status</p>
                <p className="text-xs font-extrabold text-ink">99.9% Accuracy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const features = [
  { icon: ShieldCheck, title: 'Role-Based Access', text: 'Granular controls with specific dashboards tailored for Admins, Instructors, and Students.' },
  { icon: CalendarCheck, title: 'Instant Check-in', text: 'Digitally mark lectures, coordinate attendance metrics, and view real-time class data sheets.' },
  { icon: BarChart3, title: 'Trend Analytics', text: 'Observe performance patterns and subjects that require attention, using clean data visualizations.' },
  { icon: Building2, title: 'Department Sync', text: 'Efficiently configure classrooms, faculty lines, schedules, and courses in a central workspace.' },
  { icon: FileDown, title: 'Instant Export', text: 'Export attendance logs as spreadsheets, templates, and compliant PDF forms at the click of a button.' },
  { icon: TrendingUp, title: 'Real-time Metrics', text: 'Stay updated with dynamic visual reports that track accuracy indicators and student activity.' },
]

function Features() {
  return (
    <section id="features" className="relative py-28 px-6 md:px-10 max-w-7xl mx-auto border-t border-slate-100">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="inline-block text-xs font-extrabold tracking-widest uppercase text-blue bg-blue/10 px-4 py-1.5 rounded-full mb-4">
          Core Workflows
        </span>
        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-ink mb-4">
          Everything Your College Needs
        </h2>
        <p className="text-ink-soft text-lg font-medium">
          Built custom for higher education to reduce admin overhead and boost lecture attendance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group glassmorphism hover:bg-gradient-to-br hover:from-white hover:to-blue/5 border border-white/80 hover:border-blue/20 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-blue/5 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
          >
            {/* Soft backdrop blur highlight */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue/5 rounded-full blur-2xl group-hover:bg-blue/10 transition-colors" />

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-dark via-blue to-blue-light flex items-center justify-center text-white mb-6 shadow-lg shadow-blue/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Icon size={24} />
            </div>
            <h3 className="text-lg font-heading font-extrabold text-ink mb-3">{title}</h3>
            <p className="text-sm text-ink-soft leading-relaxed font-medium">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function CarouselSection() {
  const [radius, setRadius] = useState(380)
  const ringRef = useRef(null)
  const isHovered = useRef(false)
  const mouseX = useRef(0)
  const targetAngle = useRef(0)
  const currentAngle = useRef(0)

  // Carousel item structure
  const carouselItems = [
    { icon: CalendarCheck, title: 'Auto Schedules', desc: 'Sync times and lectures' },
    { icon: ShieldCheck, title: 'Identity Shield', desc: 'Secure verification' },
    { icon: BarChart3, title: 'Insight Matrix', desc: 'Trend forecasting maps' },
    { icon: Users, title: 'Staff Gateway', desc: 'Instructor tools' },
    { icon: FileDown, title: 'Speed Exports', desc: 'PDF, CSV logs instantly' },
    { icon: Cpu, title: 'NFC Scan Hub', desc: 'Seamless contact logs' },
    { icon: Bell, title: 'Sync Trigger', desc: 'Instant student pings' },
    { icon: Lock, title: 'Logs Vault', desc: 'Immutable compliance' },
  ]

  // Recalculate 3D spacing radius based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(200) // Compact mobile
      } else if (window.innerWidth < 1024) {
        setRadius(290) // Medium tablet
      } else {
        setRadius(390) // Desktop spacing
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto spin loops with interpolation (LERP)
  useEffect(() => {
    let frameId
    const updateRotation = () => {
      if (!isHovered.current) {
        targetAngle.current += 0.25; // Slow automatic spin speed
      } else {
        // Rotate smoothly towards direction of mouse cursor
        targetAngle.current += mouseX.current * 0.9
      }

      currentAngle.current += (targetAngle.current - currentAngle.current) * 0.08 // smooth damping

      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${currentAngle.current}deg)`
      }
      frameId = requestAnimationFrame(updateRotation)
    }

    frameId = requestAnimationFrame(updateRotation)
    return () => cancelAnimationFrame(frameId)
  }, [])

  const handleMouseMove = (e) => {
    if (!ringRef.current) return
    const container = ringRef.current.parentElement
    const rect = container.getBoundingClientRect()
    // normalized horizontal coordinate from center
    const x = e.clientX - (rect.left + rect.width / 2)
    mouseX.current = x / (rect.width / 2) // yields range -1 to 1
  }

  return (
    <section 
      id="carousel" 
      className="relative py-28 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden border-t border-slate-100 select-none"
    >
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block text-xs font-extrabold tracking-widest uppercase text-blue bg-blue/10 px-4 py-1.5 rounded-full mb-4">
          3D Interactive Ring
        </span>
        <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-ink mb-4">
          Hover to Control the Rotation
        </h2>
        <p className="text-ink-soft text-lg font-medium">
          Spin the interactive ring horizontally. Hover on either side of the console to steer the direction and speed.
        </p>
      </div>

      {/* 3D Scene Wrapper */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { isHovered.current = true }}
        onMouseLeave={() => { 
          isHovered.current = false
          mouseX.current = 0
        }}
        className="perspective-1500 w-full flex items-center justify-center h-[420px] md:h-[500px] relative cursor-grab active:cursor-grabbing overflow-visible"
      >
        {/* Glow behind the ring */}
        <div className="absolute w-[20rem] h-[20rem] bg-blue/10 rounded-full blur-[100px] pointer-events-none" />

        {/* 3D Ring */}
        <div 
          ref={ringRef}
          className="preserve-3d relative w-[240px] h-[300px] transition-transform duration-100"
        >
          {carouselItems.map(({ icon: Icon, title, desc }, i) => {
            const angle = i * (360 / carouselItems.length)
            return (
              <div
                key={title}
                className="absolute inset-0 backface-hidden glassmorphism border border-white/60 shadow-xl rounded-3xl p-6 flex flex-col justify-between hover:border-blue/40 hover:shadow-2xl hover:shadow-blue/10 transition-all duration-300"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                <div className="w-12 h-12 rounded-2xl bg-blue/10 border border-blue/20 text-blue flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="text-base font-heading font-extrabold text-ink mb-1">{title}</h4>
                  <p className="text-xs text-ink-soft leading-normal font-medium">{desc}</p>
                </div>
                <div className="h-1 w-1/3 bg-blue rounded-full" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  const points = [
    'Faster automated check-ins',
    'Reduced printouts and registers',
    'Subject-wise accuracy scoring',
    'Total transparency for students',
    'Seamless administrator dashboard controls',
  ]
  
  return (
    <section id="about" className="py-28 px-6 md:px-10 max-w-7xl mx-auto border-t border-slate-100">
      <div className="grid lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Graphics illustration with hover effects */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 relative h-[420px] md:h-[460px] w-full"
        >
          {/* Base gradient card */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-dark via-blue to-blue-light rounded-[2.5rem] rotate-2 scale-[0.98] blur-[2px] opacity-20" />
          
          {/* Main glass frame showing image or gorgeous visual dashboard */}
          <div className="absolute inset-0 bg-white/40 border border-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-4 flex flex-col -rotate-1 hover:rotate-0 transition-transform duration-500 overflow-hidden group">
            {/* The user requested real image, we use their path with a beautiful CSS fallback if it doesn't exist */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
              <img 
                src="src/assets/images/features/features.jpg" 
                alt="Attendance Panel Mockup" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  // Fallback in case image file is not found
                  e.target.style.display = 'none';
                  e.target.parentNode.classList.add('fallback-active');
                }}
              />
              {/* CSS fallback visual representation */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-tr from-blue-dark via-blue/80 to-transparent pointer-events-none opacity-0 group-[.fallback-active]:opacity-100 transition-opacity">
                <div className="flex justify-between items-center">
                  <span className="text-white text-xs font-bold tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">FACULTY CONSOLE</span>
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-heading font-extrabold mb-2">Lecture Active Scanner</h3>
                  <p className="text-xs text-white/80 max-w-sm">Interactive dashboard monitoring student attendances in real time.</p>
                </div>
              </div>
              
              {/* Holographic scanning grids overlay */}
              <div className="absolute inset-x-0 h-0.5 bg-blue-light/50 shadow-lg shadow-blue animate-[scan-line_4s_infinite_linear] pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Right Column: Key benefit checkmarks */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6"
        >
          <span className="inline-block text-xs font-extrabold tracking-widest uppercase text-blue bg-blue/10 px-4 py-1.5 rounded-full mb-4">
            Platform Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-ink mb-6 leading-tight">
            Built For Modern <br />Educational Institutions
          </h2>
          <ul className="space-y-4">
            {points.map((p, idx) => (
              <motion.li 
                key={p} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center text-success shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <span className="text-ink font-semibold leading-relaxed group-hover:text-blue transition-colors">{p}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1500
          const start = performance.now()
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="font-heading font-extrabold text-4xl md:text-5xl bg-gradient-to-r from-white to-blue-light bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

function Quote() {
  const stats = [
    { label: 'Classes Monitored', target: 2450, suffix: '+' },
    { label: 'Active Students', target: 12000, suffix: '+' },
    { label: 'Total Logs Synced', target: 98, suffix: 'K+' },
    { label: 'Accuracy Rating', target: 99, suffix: '.9%' },
  ]

  return (
    <section className="py-24 px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto bg-gradient-to-br from-blue-dark via-blue to-blue-dark rounded-[2.5rem] p-12 md:p-16 text-center overflow-hidden shadow-2xl shadow-blue/20"
      >
        {/* Futuristic glowing spheres background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_50%)] pointer-events-none" />
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-blue-light/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <Award size={48} className="text-blue-light mb-6 animate-bounce" />
          <p className="text-2xl md:text-3xl font-heading font-medium text-white leading-relaxed mb-12 italic">
            "Attendance is not just a records metric. It's the primary indicator of classroom interaction and academic success."
          </p>

          {/* Platform Performance metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-10 border-t border-white/10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <AnimatedCounter target={s.target} suffix={s.suffix} />
                <span className="text-[11px] font-bold text-blue-light uppercase tracking-wider mt-2">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function FinalCTA() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API dispatch logic
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    }, 1200)
  }

  return (
    <section id="contact" className="py-28 px-6 md:px-10 max-w-7xl mx-auto border-t border-slate-100">
      <div className="grid lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Heading copy and direct options */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 flex flex-col"
        >
          <span className="inline-block text-xs font-extrabold tracking-widest uppercase text-blue bg-blue/10 px-4 py-1.5 rounded-full mb-4 w-fit">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-ink mb-6">
            Ready to Modernize Your <br />Lectures Portal?
          </h2>
          <p className="text-ink-soft text-lg mb-8 font-medium">
            Join educational institutions moving beyond physical rosters. Log in or reach out to setup an organization demo account.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/signup" 
              className="inline-flex items-center gap-2.5 text-white bg-gradient-to-r from-blue-dark via-blue to-blue-light px-8 py-4 rounded-2xl shadow-xl shadow-blue/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-bold"
            >
              Start Free Trial <ArrowRight size={17} />
            </Link>
            <Link 
              to="/login" 
              className="text-ink font-bold px-8 py-4 rounded-2xl border border-slate-200 bg-white/60 hover:bg-slate-50 transition-all duration-300"
            >
              Login Console
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Glassmorphism Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6"
        >
          <div className="glassmorphism p-8 rounded-[2rem] border border-white/60 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue/5 rounded-full blur-2xl" />
            <h3 className="text-lg font-heading font-extrabold text-ink mb-6">Inquire For Demo</h3>
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-slate-200/80 focus:border-blue/50 focus:ring-1 focus:ring-blue/30 outline-none text-sm transition-all font-medium text-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">Work Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@academy.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-slate-200/80 focus:border-blue/50 focus:ring-1 focus:ring-blue/30 outline-none text-sm transition-all font-medium text-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">How can we help?</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Tell us about your institution..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-slate-200/80 focus:border-blue/50 focus:ring-1 focus:ring-blue/30 outline-none text-sm transition-all font-medium text-ink resize-none custom-scrollbar"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-dark to-blue px-6 py-4 rounded-xl shadow-lg shadow-blue/15 hover:shadow-xl hover:shadow-blue/20 hover:-translate-y-0.5 transition-all duration-300 font-bold disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" /> Sending Request...
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center text-success mb-4 shadow-lg shadow-success/10 animate-[pulse-ring_2s_infinite]">
                    <Check size={28} className="stroke-[3]" />
                  </div>
                  <h4 className="text-base font-heading font-extrabold text-ink mb-1">Message Dispatched</h4>
                  <p className="text-xs text-ink-soft max-w-xs font-medium">Thank you. An AttendEase academic advisor will get back to your email within 24 hours.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-xs font-bold text-blue hover:text-blue-dark transition-colors"
                  >
                    Send another query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white/40 backdrop-blur-md px-6 md:px-10 py-16 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-dark to-blue flex items-center justify-center shadow shadow-blue/20">
            <span className="text-white font-heading font-bold text-sm">A</span>
          </div>
          <span className="font-heading font-extrabold text-ink leading-none">AttendEase</span>
        </div>

        {/* Middle navigation links */}
        <div className="flex items-center gap-6 text-sm font-semibold text-ink-soft">
          <a href="#features" className="hover:text-blue transition duration-300">Features</a>
          <a href="#carousel" className="hover:text-blue transition duration-300">Explore</a>
          <a href="#about" className="hover:text-blue transition duration-300">About</a>
          <a href="#contact" className="hover:text-blue transition duration-300">Contact</a>
        </div>

        {/* Right social handles */}
        <div className="flex items-center gap-4 text-ink-soft">
          <a href="#" className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue/10 hover:text-blue flex items-center justify-center transition duration-300"><Twitter size={16} /></a>
          <a href="#" className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue/10 hover:text-blue flex items-center justify-center transition duration-300"><Linkedin size={16} /></a>
          <a href="#" className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue/10 hover:text-blue flex items-center justify-center transition duration-300"><Github size={16} /></a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-slate-200/50 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-center text-xs text-ink-soft/70 font-semibold uppercase tracking-wider">
          © {new Date().getFullYear()} AttendEase · Smart Education Ecosystem · Team Fab Four
        </p>
        <div className="flex gap-4 text-[11px] font-bold text-ink-soft/60 uppercase tracking-widest">
          <a href="#" className="hover:text-blue transition-colors">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-blue transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-ink overflow-x-hidden select-none">
      <StyleInjector />
      <Navbar />
      <Hero />
      <Features />
      <CarouselSection />
      <Showcase />
      <Quote />
      <FinalCTA />
      <Footer />
    </div>
  )
}