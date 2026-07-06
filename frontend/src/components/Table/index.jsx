import Loader from '../Loader'
import Alert from '../Alert'

export default function Table({ loading, error, empty, emptyMessage = 'No records found.', children }) {
  if (loading) {
    return <div className="flex justify-center py-16"><Loader /></div>
  }
  if (error) {
    return (
      <Alert variant="warning">
        Couldn't load this data — the backend endpoint isn't available yet.
      </Alert>
    )
  }
  if (empty) {
    return <p className="text-center text-ink-soft py-12 text-sm">{emptyMessage}</p>
  }
  return <div className="overflow-x-auto">{children}</div>
}