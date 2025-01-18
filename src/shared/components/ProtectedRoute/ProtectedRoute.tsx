// eslint-disable-next-line no-restricted-syntax
import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  isAuthenticated: boolean
  children: React.ReactNode
}

// eslint-disable-next-line no-restricted-syntax
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default ProtectedRoute
