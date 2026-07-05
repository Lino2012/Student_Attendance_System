import api, { unwrap } from './api'

export async function login(email, password) {
  const { data } = await api.post('/auth/login/', { email, password })
  localStorage.setItem('access', data.access)
  localStorage.setItem('refresh', data.refresh)
  return data
}

export async function fetchMe() {
  const res = await api.get('/auth/me/')
  const user = unwrap(res)
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export async function logout() {
  try {
    await api.post('/auth/logout/')
  } catch {
    // best-effort — clear local session regardless
  } finally {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('user')
  }
}