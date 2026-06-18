import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, Code2, Timeline, Handshake, MessageSquare, User, Info, Database, LogOut } from 'lucide-react'
import { logout } from '@/firebase/auth'

const links = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/hero', label: 'Hero Section', icon: User },
  { to: '/dashboard/about', label: 'About Section', icon: Info },
  { to: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { to: '/dashboard/skills', label: 'Skills', icon: Code2 },
  { to: '/dashboard/timeline', label: 'Timeline', icon: Timeline },
  { to: '/dashboard/services', label: 'Services', icon: Handshake },
  { to: '/dashboard/testimonials', label: 'Testimonials', icon: MessageSquare },
  { to: '/dashboard/seed', label: 'Seed Data', icon: Database },
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#0c0e20] border-r border-white/5 min-h-screen flex flex-col">
      <div className="p-4 border-b border-white/5">
        <h2 className="text-lg font-bold text-white font-display">
          Dashboard
        </h2>
        <p className="text-xs text-slate-500 font-mono mt-0.5">Portfolio Admin</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <link.icon size={18} />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}
