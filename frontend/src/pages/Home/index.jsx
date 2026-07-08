import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, ShieldCheck, CalendarCheck, BarChart3, Building2, FileDown,
  ArrowRight, CheckCircle2, TrendingUp, Menu, X, Twitter, Linkedin, Github
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function GlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-blue/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-blue-light/25 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] bg-blue/15 rounded-full blur-[120px]" />
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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/70 backdrop-blur-xl border-b border-border shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-18 flex items-center justify-between py-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue to-blue-light flex items-center justify-center shadow-lg shadow-blue/30">
            <span className="text-white font-heading font-bold">A</span>
          </div>
          <span className="text-lg font-heading font-semibold text-ink">AttendEase</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-soft">
          <a href="#features" className="hover:text-ink transition">Features</a>
          <a href="#about" className="hover:text-ink transition">About</a>
          <a href="#contact" className="hover:text-ink transition">Contact</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-ink-soft hover:text-ink px-4 py-2 transition">Login</Link>
          <Link to="/signup" className="text-sm font-medium text-white bg-gradient-to-r from-blue to-blue-light px-5 py-2.5 rounded-xl shadow-lg shadow-blue/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Sign Up
          </Link>
        </div>

        <button className="md:hidden text-ink" onClick={() => setMenuOpen((o) => !o)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-border px-6 py-5 flex flex-col gap-4">
          <a href="#features" className="text-sm font-medium text-ink-soft">Features</a>
          <a href="#about" className="text-sm font-medium text-ink-soft">About</a>
          <a href="#contact" className="text-sm font-medium text-ink-soft">Contact</a>
          <Link to="/login" className="text-sm font-medium text-ink-soft">Login</Link>
          <Link to="/signup" className="text-sm font-medium text-white bg-gradient-to-r from-blue to-blue-light px-5 py-2.5 rounded-xl text-center">Sign Up</Link>
        </div>
      )}
    </header>
  )
}

function DashboardMockup() {
  const stats = [
    { label: 'Total Students', value: '1,240' },
    { label: 'Faculty Members', value: '86' },
    { label: 'Departments', value: '12' },
    { label: 'Attendance', value: '94%' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue to-blue-light rounded-3xl rotate-3 scale-[0.98] blur-sm opacity-40" />
      <div className="relative bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl p-6 -rotate-2">
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-danger/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
          </div>
          <span className="text-xs text-ink-soft font-medium">Admin Dashboard</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-blue/5 border border-blue/10 rounded-2xl p-4">
              <p className="text-xs text-ink-soft mb-1">{s.label}</p>
              <p className="text-xl font-heading font-semibold text-ink">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue/10 to-blue-light/10 rounded-2xl p-4 mb-4">
          <p className="text-xs text-ink-soft mb-3 flex items-center gap-1.5"><TrendingUp size={13} /> Analytics Overview</p>
          <div className="flex items-end gap-2 h-16">
            {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-blue to-blue-light rounded-md"
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-ink-soft font-medium mb-2">Recent Activity</p>
          {['Attendance marked — CSE-A', 'New student added', 'Report exported'].map((a) => (
            <div key={a} className="flex items-center gap-2 text-xs text-ink-soft">
              <CheckCircle2 size={13} className="text-success shrink-0" />
              {a}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute -bottom-6 -left-8 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
      >
        <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center text-success">
          <CheckCircle2 size={18} />
        </div>
        <div>
          <p className="text-xs text-ink-soft">Accuracy</p>
          <p className="text-sm font-heading font-semibold text-ink">99.9%</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="relative pt-36 pb-24 px-6 md:px-10 max-w-7xl mx-auto">
      <GlowBackground />
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-blue bg-blue/10 px-4 py-1.5 rounded-full mb-6">
            Smart Attendance Management Platform
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-heading font-semibold text-ink leading-[1.08] mb-6">
            Transform Attendance Into Actionable Insights
          </h1>
          <p className="text-ink-soft text-lg leading-relaxed mb-9 max-w-lg">
            Digitize attendance, empower faculty, and provide students with real-time attendance tracking through one centralized platform.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/signup" className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-blue to-blue-light px-6 py-3.5 rounded-xl shadow-lg shadow-blue/25 hover:shadow-xl hover:-translate-y-0.5 transition-all font-medium">
              Get Started <ArrowRight size={17} />
            </Link>
            <Link to="/login" className="text-ink font-medium px-6 py-3.5 rounded-xl border border-border hover:bg-cream-soft transition">
              Login
            </Link>
          </div>
        </motion.div>

        <DashboardMockup />
      </div>
    </section>
  )
}

const features = [
  { icon: ShieldCheck, title: 'Role-Based Access', text: 'Admin, Faculty and Student dashboards.' },
  { icon: CalendarCheck, title: 'Smart Attendance Tracking', text: 'Mark attendance instantly and accurately.' },
  { icon: BarChart3, title: 'Real-Time Reports', text: 'Generate subject-wise and monthly reports.' },
  { icon: Building2, title: 'Department Management', text: 'Manage departments, courses and subjects.' },
  { icon: FileDown, title: 'Export Reports', text: 'Download attendance reports as PDF and Excel.' },
  { icon: TrendingUp, title: 'Analytics Dashboard', text: 'Visualize attendance trends and performance.' },
]

function Features() {
  return (
    <section id="features" className="relative py-24 px-6 md:px-10 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-ink mb-4">Everything Your Institution Needs</h2>
        <p className="text-ink-soft text-lg">Built specifically for colleges and universities to simplify attendance management.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: i * 0.08 }}
            className="group bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-7 shadow-sm hover:shadow-2xl hover:shadow-blue/10 hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue to-blue-light flex items-center justify-center text-white mb-5 shadow-lg shadow-blue/20 group-hover:scale-110 transition-transform">
              <Icon size={22} />
            </div>
            <h3 className="font-heading font-semibold text-ink mb-2">{title}</h3>
            <p className="text-sm text-ink-soft leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Showcase() {
  const points = [
    'Faster attendance',
    'Reduced paperwork',
    'Accurate reporting',
    'Better transparency',
    'Centralized management',
  ]
  return (
    <section id="about" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative h-96">
          <div className="absolute inset-0 bg-gradient-to-br from-blue to-blue-light rounded-3xl rotate-2" />
          <div className="absolute inset-4 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl flex flex-col items-center justify-center gap-4 -rotate-1">
            <img src="src\assets\images\features\features.jpg" alt="Attendance Dashboard" className="w-full h-full object-cover rounded-2xl shadow-xl"
/>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-ink mb-6 leading-tight">
            Built For Modern Educational Institutions
          </h2>
          <ul className="space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                  <CheckCircle2 size={15} />
                </div>
                <span className="text-ink font-medium">{p}</span>
              </li>
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
          const duration = 1400
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
    <span ref={ref}>{count.toLocaleString()}{suffix}</span>
  )
}

function Quote() {
  return (
    <section className="py-24 px-6 md:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="relative max-w-4xl mx-auto bg-gradient-to-br from-blue to-blue-light rounded-3xl p-12 md:p-16 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
        <p className="relative text-2xl md:text-3xl font-heading font-medium text-white leading-relaxed">
          "Attendance is not just a record. It's the foundation of academic success."
        </p>
      </motion.div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section id="contact" className="py-24 px-6 md:px-10 max-w-4xl mx-auto text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-ink mb-4">
          Ready To Modernize Attendance Management?
        </h2>
        <p className="text-ink-soft text-lg mb-9">
          Join institutions moving beyond paper registers.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/signup" className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-blue to-blue-light px-6 py-3.5 rounded-xl shadow-lg shadow-blue/25 hover:shadow-xl hover:-translate-y-0.5 transition-all font-medium">
            Get Started <ArrowRight size={17} />
          </Link>
          <Link to="/login" className="text-ink font-medium px-6 py-3.5 rounded-xl border border-border hover:bg-cream-soft transition">
            Login
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue to-blue-light flex items-center justify-center">
            <span className="text-white font-heading font-bold text-sm">A</span>
          </div>
          <span className="font-heading font-semibold text-ink">AttendEase</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-ink-soft">
          <a href="#features" className="hover:text-ink transition">Features</a>
          <a href="#about" className="hover:text-ink transition">About</a>
          <a href="#contact" className="hover:text-ink transition">Contact</a>
        </div>

        <div className="flex items-center gap-4 text-ink-soft">
          <a href="#" className="hover:text-blue transition"><Twitter size={18} /></a>
          <a href="#" className="hover:text-blue transition"><Linkedin size={18} /></a>
          <a href="#" className="hover:text-blue transition"><Github size={18} /></a>
        </div>
      </div>
      <p className="text-center text-xs text-ink-soft mt-8">
        © {new Date().getFullYear()} AttendEase · Student Attendance Management System · Team Fab Four
      </p>
    </footer>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-page overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      <Quote />
      <FinalCTA />
      <Footer />
    </div>
  )
}