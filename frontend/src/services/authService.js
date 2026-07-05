import api from './api'

// Matches apps/accounts/serializers.py LoginSerializer exactly: username + password.
export async function login(username, password) {
  const { data } = await api.post('/auth/login/', { username, password })
  localStorage.setItem('access', data.access)
  localStorage.setItem('refresh', data.refresh)
  return data
}

export async function fetchMe() {
  const { data } = await api.get('/auth/me/')
  localStorage.setItem('user', JSON.stringify(data))
  return data
}

export async function logout() {
  try {
    await api.post('/auth/logout/')
  } finally {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('user')
  }
}