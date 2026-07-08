import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/Card'
import Alert from '../../components/Alert'
import { FiBell } from 'react-icons/fi'

export default function Notifications() {
  return (
    <DashboardLayout title="Notifications">
      <Card title="System Announcements">
        <div className="space-y-4">
          <Alert variant="info">
            No new announcements or alerts at this time.
          </Alert>
          <div className="border-t border-border pt-4 text-center text-sm text-ink-soft py-12">
            <FiBell size={24} className="mx-auto text-ink-soft mb-2 opacity-50" />
            Notifications system will trigger alerts for low attendance thresholds under 75%.
          </div>
        </div>
      </Card>
    </DashboardLayout>
  )
}
