const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function fetchTasks(filters = {}) {
  const params = new URLSearchParams()
  if (filters.status) params.append('status', filters.status)
  if (filters.priority) params.append('priority', filters.priority)
  const res = await fetch(`${BASE}/tasks?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export async function createTask(payload) {
  const res = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function patchTask(id, patch) {
  const res = await fetch(`${BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
  if (!res.ok) throw new Error('Failed to update task')
  return res.json()
}

export async function fetchInsights() {
  const res = await fetch(`${BASE}/insights`)
  if (!res.ok) throw new Error('Failed to fetch insights')
  return res.json()
}
