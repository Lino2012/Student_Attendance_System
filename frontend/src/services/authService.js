import api from './api'

// POST /api/v1/auth/login/ → { access, refresh, user }
export async function login(username, password) {
  const { data } = await api.post('/auth/login/', { username, password })
  localStorage.setItem('access', data.access)
  localStorage.setItem('refresh', data.refresh)
  localStorage.setItem('user', JSON.stringify(data.user))
  return data.user          // return the user object directly
}

// GET /api/v1/auth/me/ → user object
export async function fetchMe() {
  const { data } = await api.get('/auth/me/')
  localStorage.setItem('user', JSON.stringify(data))
  return data
}

// Client-side logout — no server endpoint needed
export async function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('user')
}