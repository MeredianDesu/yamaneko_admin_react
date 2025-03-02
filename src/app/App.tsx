import { useAuth } from 'features/Auth/useAuth'
import { Dashboard } from 'pages/Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from 'shared/components/ProtectedRoute/ProtectedRoute'
import { Characters } from 'widgets/Characters/Characters'
import { CreateCharacter } from 'widgets/Create/CreateCharacter/CreateCharacter'
import { CreateGenre } from 'widgets/Create/CreateGenre/CreateGenre'
import { CreateRelease } from 'widgets/Create/CreateRelease/CreateRelease'
import { DashboardInfo } from 'widgets/DashboardInfo/DashboardInfo'
import { EditCharacter } from 'widgets/Edit/Characters/EditCharacter'
import { EditRelease } from 'widgets/Edit/Releases/EditRelease'
import { Genres } from 'widgets/Genres/Genres'
import { Login } from 'widgets/Login/Login'
import { Releases } from 'widgets/Releases/Releases'
import { SelectedCharacter } from 'widgets/SelectedCharacter/SelectedCharacter'
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
          <Route path="releases/:id/edit" element={<EditRelease />} />
          <Route path="releases/create" element={<CreateRelease />} />

          <Route path="characters" element={<Characters />} />
          <Route path="characters/:id" element={<SelectedCharacter />} />
          <Route path="characters/:id/edit" element={<EditCharacter />} />
          <Route path="characters/create" element={<CreateCharacter />} />

          <Route path="team" element={<Team />} />

          <Route path="genres" element={<Genres />} />

          <Route path="genres/create" element={<CreateGenre />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
