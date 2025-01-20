import { useAuth } from 'features/Auth/useAuth'
import { Dashboard } from 'pages/Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from 'shared/components/ProtectedRoute/ProtectedRoute'
import { Login } from 'widgets/Login/Login'

const App = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
