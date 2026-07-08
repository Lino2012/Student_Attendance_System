import DashboardLayout from '../../layouts/DashboardLayout'
import Card from '../../components/Card'
import Alert from '../../components/Alert'
import Button from '../../components/Button'
import { FiDownload } from 'react-icons/fi'

export default function Reports() {
  return (
    <DashboardLayout title="Reports & Analytics">
      <div className="space-y-6">
        <Card title="Attendance Report Generator">
          <div className="max-w-md space-y-4">
            <p className="text-sm text-ink-soft">
              Generate detailed, exportable reports by department, semester, section, or subject.
            </p>
            <div className="border-t border-border pt-4 space-y-3">
              <Alert variant="info">
                Detailed report querying, Excel/PDF downloads, and filtering features are currently being built.
              </Alert>
              <Button disabled className="w-full flex items-center justify-center gap-2">
                <FiDownload size={16} /> Download CSV Report
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
