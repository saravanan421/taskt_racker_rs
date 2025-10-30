import React from 'react'
import { patchTask } from '../api'

function TaskRow({ task, onUpdated }) {
  async function markDone() {
    try {
      await patchTask(task.id, { status: 'DONE' })
      if (onUpdated) onUpdated()
    } catch (err) {
      console.error(err)
      alert('Failed to update')
    }
  }

  async function cyclePriority() {
    const order = ['LOW', 'MEDIUM', 'HIGH']
    const idx = order.indexOf(task.priority) || 0
    const next = order[(idx + 1) % order.length]
    try {
      await patchTask(task.id, { priority: next })
      if (onUpdated) onUpdated()
    } catch (err) {
      console.error(err)
      alert('Failed to update')
    }
  }

  return (
    <div className="p-3 border-b flex items-start justify-between">
      <div>
        <div className="flex items-baseline gap-3">
          <h3 className={`font-semibold ${task.status === 'DONE' ? 'line-through text-gray-400' : ''}`}>{task.title}</h3>
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">{task.priority}</span>
        </div>
        <p className="text-sm text-gray-600">{task.description}</p>
        {task.due_date && <p className="text-xs text-gray-500 mt-1">Due: {task.due_date}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <button onClick={cyclePriority} className="text-sm px-2 py-1 border rounded">Priority →</button>
        {task.status !== 'DONE' && <button onClick={markDone} className="text-sm px-2 py-1 bg-green-600 text-white rounded">Mark Done</button>}
      </div>
    </div>
  )
}

export default function TaskList({ tasks = [], loading = false, onUpdated }) {
  if (loading) return <div>Loading...</div>
  if (!tasks.length) return <div className="text-center p-6 text-gray-500">No tasks yet</div>

  return (
    <div className="divide-y">
      {tasks.map((t) => <TaskRow key={t.id} task={t} onUpdated={onUpdated} />)}
    </div>
  )
}
