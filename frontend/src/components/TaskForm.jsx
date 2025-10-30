import React, { useState } from 'react'
import { createTask } from '../api'

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('MEDIUM')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await createTask({ title, description, priority, due_date: dueDate || null })
      setTitle('')
      setDescription('')
      setPriority('MEDIUM')
      setDueDate('')
      if (onCreated) onCreated()
    } catch (err) {
      console.error(err)
      alert('Could not create task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-1 p-2 border rounded" rows={3} />
      </div>

      <div className="flex gap-3">
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-1 p-2 border rounded">
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 p-2 border rounded" />
        </div>
      </div>

      <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:opacity-90">
        {loading ? 'Saving...' : 'Add Task'}
      </button>
    </form>
  )
}
