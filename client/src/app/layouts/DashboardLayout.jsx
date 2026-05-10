import { Outlet } from 'react-router-dom'
import Navbar from '../../components/shared/Navbar'

export default function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <Navbar />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  )
}
