import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function Chart({ data, dataKey, xKey, height = 220 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid stroke="#E5E7EB" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} domain={[50, 100]} />
        <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E5E7EB' }} />
        <Line type="monotone" dataKey={dataKey} stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4, fill: '#2563EB' }} />
      </LineChart>
    </ResponsiveContainer>
  )
}