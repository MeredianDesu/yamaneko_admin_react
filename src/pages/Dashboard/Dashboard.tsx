import { Header } from 'shared/components/Header/Header'
import { Releases } from 'shared/components/Releases/Releases'
import { Sidebar } from 'shared/components/Sidebar/Sidebar'

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <Releases />
      </div>
    </div>
  )
}
