import { FolderKanban, Code2, Timeline, Handshake, MessageSquare } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'

const cards = [
  { label: 'Projects', icon: FolderKanban, color: 'text-indigo-400', key: 'projects' as const },
  { label: 'Skill Categories', icon: Code2, color: 'text-violet-400', key: 'skillCategories' as const },
  { label: 'Timeline Items', icon: Timeline, color: 'text-cyan-400', key: 'timelineItems' as const },
  { label: 'Services', icon: Handshake, color: 'text-pink-400', key: 'serviceItems' as const },
  { label: 'Testimonials', icon: MessageSquare, color: 'text-amber-400', key: 'testimonialsItems' as const },
]

export function DashboardHome() {
  const data = usePortfolio()

  return (
    <div>
      <h1 className="text-2xl font-bold text-white font-display mb-8">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.key}
            className="glassmorphism rounded-2xl p-6 border-white/5"
          >
            <div className={`mb-3 ${card.color}`}>
              <card.icon size={28} />
            </div>
            <p className="text-3xl font-bold text-white font-display mb-1">
              {data[card.key].length}
            </p>
            <p className="text-sm text-slate-400 font-sans">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
