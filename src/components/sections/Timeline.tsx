import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Award, Activity } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Card } from '@/components/ui'

// Helper component for dynamic category icons
const TimelineIcon: React.FC<{ type: string; className?: string }> = ({ type, className }) => {
  switch (type) {
    case 'education':
      return <GraduationCap className={className} size={18} />
    case 'experience':
      return <Briefcase className={className} size={18} />
    case 'certification':
      return <Award className={className} size={18} />
    case 'project':
      return <Activity className={className} size={18} />
    default:
      return <Activity className={className} size={18} />
  }
}

export const Timeline: React.FC = () => {
  const { timelineItems } = usePortfolio()
  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-grid-pattern">
      {/* Decorative Blob */}
      <div className="absolute left-0 top-1/4 w-[350px] h-[350px] rounded-full bg-violet-600/5 glow-blob" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display"
          >
            Education &amp; <span className="text-gradient-primary">Experience</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"
          />
        </div>

        {/* Timeline Flow */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Central Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] timeline-line-gradient -translate-x-1/2 rounded-full hidden sm:block" />
          <div className="absolute left-8 top-4 bottom-4 w-[2px] timeline-line-gradient rounded-full sm:hidden" />

          {/* Timeline Items Grid */}
          <div className="flex flex-col gap-12 relative">
            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row relative items-start ${
                    isEven ? 'sm:justify-start' : 'sm:justify-end'
                  }`}
                >
                  {/* Outer bubble connector */}
                  <div className="absolute left-8 sm:left-1/2 top-5 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                      className="w-10 h-10 rounded-xl bg-slate-900 border border-indigo-500 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                    >
                      <TimelineIcon type={item.type} />
                    </motion.div>
                  </div>

                  {/* Card Container */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`w-full sm:w-[calc(50%-2.5rem)] ml-16 sm:ml-0 ${
                      isEven ? 'sm:text-right sm:pr-0' : 'sm:text-left sm:pl-0'
                    }`}
                  >
                    <Card className="text-left group relative border-white/5">
                      {/* Gradient border glowing edge */}
                      <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-indigo-500 to-violet-500 rounded-l-2xl" />

                      <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md mb-3 inline-block">
                        {item.duration}
                      </span>
                      <h3 className="text-lg font-bold text-white font-display mb-1 group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      <h4 className="text-sm font-semibold text-slate-300 font-display mb-4">
                        {item.organization}
                      </h4>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6 font-sans">
                        {item.description}
                      </p>

                      {/* Timeline Badges */}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 text-slate-300 border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Card>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
