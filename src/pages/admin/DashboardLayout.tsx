import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/admin/Sidebar'

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#05060f]">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
