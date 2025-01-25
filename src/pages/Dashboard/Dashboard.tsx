import { Outlet } from 'react-router-dom'
import { Header } from 'shared/components/Header/Header'
import { Sidebar } from 'widgets/Sidebar/Sidebar'

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}
