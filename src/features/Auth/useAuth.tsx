import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthContextType = {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  accessToken: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const login = (token: string) => {
    localStorage.setItem('accessToken', token)
    setIsAuthenticated(true)
    setAccessToken(token)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setIsAuthenticated(false)
    setAccessToken(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      setIsAuthenticated(true)
      setAccessToken(token)
    }
  })

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const navigator = useNavigate()

  const { isAuthenticated } = context
  useEffect(() => {
    if (isAuthenticated) {
      navigator('/dashboard')
    }
  }, [isAuthenticated, navigator])

  return context
}
