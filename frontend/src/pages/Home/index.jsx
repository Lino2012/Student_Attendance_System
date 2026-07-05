import { Link } from 'react-router-dom'
import { FiCheckCircle, FiBarChart2, FiUsers, FiFileText, FiArrowRight } from 'react-icons/fi'
import Button from '../../components/Button'

const features = [
  { icon: FiUsers, title: 'Role-based access', text: 'Separate, focused dashboards for Admins, Faculty, and Students.' },
  { icon: FiCheckCircle, title: 'Faster attendance', text: 'Mark a full class in seconds instead of a paper register.' },
  { icon: FiBarChart2, title: 'Real reports', text: 'Daily, monthly, subject-wise, and student-wise summaries, instantly.' },
  { icon: FiFileText, title: 'Export anywhere', text: 'One-click PDF and Excel exports for official records.' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <span className="text-xl font-heading font-semibold text-ink">AttendEase</span>
        <nav className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-ink-soft hover:text-ink px-4 py-2">Log in</Link>
          <Link to="/signup">
            <Button variant="primary" className="!px-5 !py-2.5 text-sm">Get Started</Button>
          </Link>
        </nav>
      </header>

      <section className="relative overflow-hidden rounded-3xl mx-4 md:mx-8 bg-gradient-to-br from-blue to-blue-light">
        <div className="relative z-10 px-8 md:px-16 py-20 md:py-28 max-w-3xl">
          <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-4">Student Attendance Management System</p>
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-white leading-tight mb-6">
            Attendance, tracked accurately. Reports, generated instantly.
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-xl">
            One platform for departments, faculty, students, and attendance records — replacing paper registers with a system everyone can trust.
          </p>
          <div className="flex gap-4">
            <Link to="/login">
              <Button className="bg-white !bg-none text-blue shadow-xl !px-6 !py-3.5">
                Log in <FiArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-ink text-center mb-3">
          Built for how colleges actually run attendance
        </h2>
        <p className="text-ink-soft text-center max-w-xl mx-auto mb-14">
          Every role gets exactly what they need — nothing they don't.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-surface/70 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="w-11 h-11 rounded-xl bg-blue/10 flex items-center justify-center text-blue mb-4">
                <Icon size={20} />
              </div>
              <h3 className="font-heading font-semibold text-ink mb-2">{title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-10 text-sm text-ink-soft border-t border-border">
        Student Attendance Management System · Built by Team Fab Four
      </footer>
    </div>
  )
}