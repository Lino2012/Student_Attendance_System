import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function DashboardLayout({ title, children }) {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar title={title} />
        <main className="flex-1 p-6 md:p-8">{children}</main>
        <Footer />
      </div>
    </div>
  )
}