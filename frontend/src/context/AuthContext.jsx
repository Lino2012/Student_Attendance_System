import { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // Start in loading state while we verify the stored token
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (!token) {
      setLoading(false)
      return
    }

    // Try to refresh the profile from the server with the stored token.
    // If the token is expired / invalid, clear and force re-login.
    authService.fetchMe()
      .then((me) => {
        setUser(me)
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
          localStorage.removeItem('user')
        } else {
          // Backend unreachable — fall back to cached user so the UI is usable offline
          const cached = localStorage.getItem('user')
          if (cached) setUser(JSON.parse(cached))
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (username, password) => {
    // authService.login returns the user object directly
    const me = await authService.login(username, password)
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