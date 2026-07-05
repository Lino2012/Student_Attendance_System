import { FiAlertTriangle, FiInfo, FiCheckCircle } from 'react-icons/fi'

const config = {
  warning: { bg: 'bg-warning/10', text: 'text-warning', icon: FiAlertTriangle },
  info: { bg: 'bg-blue/10', text: 'text-blue', icon: FiInfo },
  success: { bg: 'bg-success/10', text: 'text-success', icon: FiCheckCircle },
}

export default function Alert({ variant = 'info', children }) {
  const { bg, text, icon: Icon } = config[variant]
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl ${bg} ${text} text-sm`}>
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  )
}