import { useAuth } from 'features/Auth/useAuth'
import { Dashboard } from 'pages/Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from 'shared/components/ProtectedRoute/ProtectedRoute'
import { Characters } from 'widgets/Characters/Characters'
import { DashboardInfo } from 'widgets/DashboardInfo/DashboardInfo'
import { Genres } from 'widgets/Genres/Genres'
import { Login } from 'widgets/Login/Login'
import { Releases } from 'widgets/Releases/Releases'
import { SelectedRelease } from 'widgets/SelectedRelease/SelectedRelease'
import { Team } from 'widgets/Team/Team'

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
          <Route index element={<DashboardInfo />} />
          <Route path="releases" element={<Releases />} />
          <Route path="releases/:id" element={<SelectedRelease />} />
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
