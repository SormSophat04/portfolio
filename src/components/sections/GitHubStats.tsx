import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GitPullRequest, GitFork, Star, BookOpen } from 'lucide-react'
import { Card } from '@/components/ui'

// Mock Data for GitHub stats
const statsCards = [
  { label: 'Total Repositories', value: '38', icon: BookOpen, color: 'text-blue-400' },
  { label: 'Total Commits (YTD)', value: '1,842', icon: GitFork, color: 'text-indigo-400' },
  { label: 'Pull Requests', value: '164', icon: GitPullRequest, color: 'text-purple-400' },
  { label: 'Total Stars', value: '128', icon: Star, color: 'text-amber-400' },
]

const languageStats = [
  { name: 'PHP / Laravel', percentage: 38, color: 'bg-indigo-500' },
  { name: 'TypeScript / React', percentage: 30, color: 'bg-violet-500' },
  { name: 'C# / .NET', percentage: 17, color: 'bg-cyan-500' },
  { name: 'Dart / Flutter', percentage: 10, color: 'bg-sky-400' },
  { name: 'Java / Spring', percentage: 5, color: 'bg-amber-500' },
]

export const GitHubStats: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date: string } | null>(null)

  // Generate mock contribution graph data (7 days x 53 weeks)
  const generateContributionData = () => {
    const data = []
    const baseDate = new Date(2025, 0, 1)
    
    // We want a reproducible grid of contributions with nice organic patterns
    for (let w = 0; w < 53; w++) {
      const weekData = []
      for (let d = 0; d < 7; d++) {
        const dateObj = new Date(baseDate.getTime() + (w * 7 + d) * 24 * 60 * 60 * 1000)
        
        // Seeded random value for visual contribution levels
        const seed = (w * 3 + d * 7) % 31
        let level = 0
        let count = 0
        
        if (seed > 10 && seed <= 18) {
          level = 1
          count = seed - 9
        } else if (seed > 18 && seed <= 26) {
          level = 2
          count = seed - 12
        } else if (seed > 26 && seed <= 29) {
          level = 3
          count = seed - 5
        } else if (seed > 29) {
          level = 4
          count = seed + 2
        }
        
        weekData.push({
          level,
          count,
          date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        })
      }
      data.push(weekData)
    }
    return data
  }

  const weeksData = generateContributionData()

  return (
    <section id="github-stats" className="py-24 relative overflow-hidden bg-grid-pattern">
      {/* Glow effect */}
      <div className="absolute right-1/4 top-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600/5 glow-blob" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display"
          >
            GitHub <span className="text-gradient-primary">Statistics</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"
          />
        </div>

        {/* Top level stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statsCards.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="flex items-center justify-between p-6 border-white/5 h-full">
                  <div>
                    <span className="text-xs text-slate-500 font-mono tracking-wider block mb-1 uppercase">
                      {stat.label}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                      {stat.value}
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contribution Widget Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 flex flex-col"
          >
            <Card className="flex-grow flex flex-col justify-between border-white/5 overflow-x-auto min-w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-white font-display">
                  Contribution Activity Graph
                </h3>
                <span className="text-xs text-slate-400 font-mono">1,842 Contributions in 2025</span>
              </div>

              {/* Scrollable grid wrapper */}
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-[3px] min-w-[650px] relative">
                  {weeksData.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((day, dIdx) => {
                        // Level to Tailwind color matching
                        const colors = [
                          'bg-slate-900 border border-white/5 hover:border-slate-700',
                          'bg-indigo-950 border border-indigo-900 hover:border-indigo-600',
                          'bg-indigo-800 hover:bg-indigo-700',
                          'bg-indigo-500 hover:bg-indigo-400',
                          'bg-violet-500 hover:bg-violet-400',
                        ]
                        return (
                          <div
                            key={dIdx}
                            onMouseEnter={() => setHoveredCell({ count: day.count, date: day.date })}
                            onMouseLeave={() => setHoveredCell(null)}
                            className={`w-[10px] h-[10px] rounded-[2px] transition-all duration-150 cursor-pointer ${
                              colors[day.level]
                            }`}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tooltip display / legend strip */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-white/5 gap-4">
                {/* Tooltip content */}
                <div className="h-6 flex items-center">
                  {hoveredCell ? (
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-mono text-indigo-400"
                    >
                      {hoveredCell.count === 0 ? 'No' : hoveredCell.count} contributions on {hoveredCell.date}
                    </motion.span>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">Hover over squares to see detail</span>
                  )}
                </div>

                {/* Legend indicator */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <span>Less</span>
                  <div className="w-[10px] h-[10px] bg-slate-900 rounded-[2px] border border-white/5" />
                  <div className="w-[10px] h-[10px] bg-indigo-950 rounded-[2px] border border-indigo-900" />
                  <div className="w-[10px] h-[10px] bg-indigo-800 rounded-[2px]" />
                  <div className="w-[10px] h-[10px] bg-indigo-500 rounded-[2px]" />
                  <div className="w-[10px] h-[10px] bg-violet-500 rounded-[2px]" />
                  <span>More</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right: Languages distribution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col"
          >
            <Card className="flex-grow flex flex-col justify-between border-white/5">
              <h3 className="text-base font-bold text-white font-display mb-6">
                Most Used Languages
              </h3>

              {/* Distribution Horizontal Bar */}
              <div className="h-4 bg-slate-900 rounded-full flex overflow-hidden mb-8 border border-white/5">
                {languageStats.map((lang) => (
                  <div
                    key={lang.name}
                    className={`h-full ${lang.color}`}
                    style={{ width: `${lang.percentage}%` }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              {/* Language detail lines */}
              <div className="flex flex-col gap-4">
                {languageStats.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-3 h-3 rounded-full ${lang.color}`} />
                      <span className="text-sm font-semibold text-slate-300 font-sans">{lang.name}</span>
                    </div>
                    <span className="text-sm font-mono text-slate-400 font-medium">
                      {lang.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
