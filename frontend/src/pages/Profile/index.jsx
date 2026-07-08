import { useAuth } from '../../hooks/useAuth'
import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/Card'
import { FiUser, FiMail, FiShield, FiCheckCircle, FiCalendar } from 'react-icons/fi'

export default function Profile() {
  const { user } = useAuth()

  return (
    <DashboardLayout title="My Profile">
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-blue to-blue-light -mx-5 -mt-5 mb-8 flex items-end px-6 pb-4">
            <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-2xl bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue to-blue-light text-white flex items-center justify-center text-3xl font-bold font-heading">
                {(user?.full_name || user?.username)?.[0]?.toUpperCase() || 'U'}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <h2 className="text-xl font-heading font-semibold text-ink mb-1">{user?.full_name || user?.username}</h2>
            <p className="text-sm text-ink-soft capitalize mb-6">{user?.role?.toLowerCase()}</p>

            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cream-soft flex items-center justify-center text-ink-soft">
                  <FiUser size={18} />
                </div>
                <div>
                  <p className="text-xs text-ink-soft">Username</p>
                  <p className="text-sm font-medium text-ink">{user?.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cream-soft flex items-center justify-center text-ink-soft">
                  <FiMail size={18} />
                </div>
                <div>
                  <p className="text-xs text-ink-soft">Email Address</p>
                  <p className="text-sm font-medium text-ink">{user?.email || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cream-soft flex items-center justify-center text-ink-soft">
                  <FiShield size={18} />
                </div>
                <div>
                  <p className="text-xs text-ink-soft">Account Role</p>
                  <p className="text-sm font-medium text-ink capitalize">{user?.role?.toLowerCase() || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cream-soft flex items-center justify-center text-ink-soft">
                  <FiCheckCircle size={18} />
                </div>
                <div>
                  <p className="text-xs text-ink-soft">Account Status</p>
                  <p className="text-sm font-medium text-success flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                    Active
                  </p>
                </div>
              </div>

              {user?.date_joined && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cream-soft flex items-center justify-center text-ink-soft">
                    <FiCalendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-ink-soft">Joined Date</p>
                    <p className="text-sm font-medium text-ink">{new Date(user.date_joined).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
