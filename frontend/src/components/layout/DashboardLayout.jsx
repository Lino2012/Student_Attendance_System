import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function DashboardLayout({ title, children }) {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar title={title} />
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}