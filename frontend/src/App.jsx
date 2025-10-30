import React, { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import InsightsPanel from './components/InsightsPanel'
import { fetchTasks } from './api'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(false)

  async function loadTasks(activeFilters = {}) {
    setLoading(true)
    try {
      const data = await fetchTasks(activeFilters)
      setTasks(data)
    } catch (err) {
      console.error(err)
      alert('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks(filters)
  }, [filters])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Mini Task Tracker</h1>
          <p className="text-sm text-gray-600">Create tasks, filter, and see smart insights.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow">
              <TaskForm onCreated={() => loadTasks(filters)} />
            </div>

            <div className="bg-white p-4 rounded-2xl shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tasks</h2>
                <div className="space-x-2">
                  <select onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value || undefined }))} className="border rounded p-1">
                    <option value="">All</option>
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                  <select onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value || undefined }))} className="border rounded p-1">
                    <option value="">All</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                </div>
              </div>

              <TaskList tasks={tasks} loading={loading} onUpdated={() => loadTasks(filters)} />
            </div>
          </section>

          <aside className="space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow">
              <InsightsPanel />
            </div>
          </aside>
        </main>

        <footer className="mt-6 text-center text-sm text-gray-500">
          Built with ❤️ — backend at <code className="bg-gray-100 px-1 rounded">http://localhost:8000</code>
        </footer>
      </div>
    </div>
  )
}
