import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { notification } from 'shared/components/Notification/Notification'
import { systemMessages } from 'shared/constants/systemMessages'
import { getRoles } from 'shared/helpers/parseRoles'

type AuthContextType = {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  accessToken: string | null
  isInitialized: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

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
      const roles = getRoles(token)
      if (roles.includes('ADMIN')) {
        setIsAuthenticated(true)
        setAccessToken(token)
        setIsInitialized(true)
      } else {
        notification({ message: systemMessages.FORBIDDEN, type: 'error' })
        logout()
      }
    }
  }, [accessToken])

  const contextValue = useMemo(
    () => ({ isAuthenticated, login, logout, accessToken, isInitialized }),
    [isAuthenticated, accessToken, isInitialized],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const navigator = useNavigate()
  const location = useLocation()

  const { isAuthenticated } = context
  useEffect(() => {
    if (isAuthenticated) {
      navigator(location.pathname)
    }
  }, [isAuthenticated, navigator])

  return context
}
