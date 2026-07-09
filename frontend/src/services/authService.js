import api from './api'

export async function login(email, password) {
  const { data: envelope } = await api.post('/auth/login/', { email, password })
  const { access, refresh, user } = envelope.data
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
  localStorage.setItem('user', JSON.stringify(user))
  return user               
}

export async function fetchMe() {
  const { data: envelope } = await api.get('/auth/me/')
  const user = envelope.data
  localStorage.setItem('user', JSON.stringify(user))
  return user
}


export async function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('user')
}