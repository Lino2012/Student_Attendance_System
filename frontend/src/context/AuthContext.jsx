import { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('access')
      if (!token) { setLoading(false); return }
      try {
        const me = await authService.fetchMe()
        setUser(me)
      } catch {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
      } finally {
        setLoading(false)
      }
    }
    restoreSession()
  }, [])

  const login = async (email, password) => {
    await authService.login(email, password)
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