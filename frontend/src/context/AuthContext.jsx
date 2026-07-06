import { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('user')
    return cached ? JSON.parse(cached) : null
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Refresh the cached profile in the background, but don't block
    // rendering on it — an unreachable backend shouldn't log someone
    // out of a session they already had.
    const token = localStorage.getItem('access')
    if (!token) return

    authService.fetchMe()
      .then(setUser)
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
          localStorage.removeItem('user')
          setUser(null)
        }
      })
  }, [])

  const login = async (username, password) => {
    await authService.login(username, password)
    const me = await authService.fetchMe()
    setUser(me)
    return me
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)