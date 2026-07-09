import api from './api'

export async function login(email, password) {
  // res.data is already unwrapped by the interceptor: { access, refresh, user }
  const { data } = await api.post('/auth/login/', { email, password })
  const { access, refresh, user } = data
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export async function fetchMe() {
  // res.data is already unwrapped by the interceptor — this IS the user object
  const { data: user } = await api.get('/auth/me/')
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export async function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('user')
}