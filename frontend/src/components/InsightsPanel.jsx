import React, { useEffect, useState } from 'react'
import { fetchInsights } from '../api'

export default function InsightsPanel() {
  const [ins, setIns] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchInsights()
      .then(data => setIns(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading insights...</div>
  if (!ins) return <div className="text-gray-500">No insights available</div>

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Insights</h3>
      <p className="text-sm mb-2">{ins.summary}</p>
      <ul className="text-sm space-y-1">
        <li>Total: {ins.total}</li>
        <li>Due soon: {ins.due_soon_count}</li>
        <li>Busiest day: {ins.busiest_day ?? '—'}</li>
      </ul>
    </div>
  )
}
