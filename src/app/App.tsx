import { useAuth } from 'features/Auth/useAuth'
import { Dashboard } from 'pages/Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Characters } from 'shared/components/Characters/Characters'
import { Genres } from 'shared/components/Genres/Genres'
import ProtectedRoute from 'shared/components/ProtectedRoute/ProtectedRoute'
import { Releases } from 'shared/components/Releases/Releases'
import { Team } from 'shared/components/Team/Team'
import { Login } from 'widgets/Login/Login'

const App = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Releases />} />
          <Route path="releases" element={<Releases />} />
          <Route path="characters" element={<Characters />} />
          <Route path="team" element={<Team />} />
          <Route path="genres" element={<Genres />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
