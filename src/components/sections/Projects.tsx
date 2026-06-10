import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects } from '@/data/portfolioData'
import { Button, Card, Github } from '@/components/ui'


export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'web' | 'system'>('all')

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true
    return project.category === filter
  })

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#05060f]">
      {/* Decorative Blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-600/5 glow-blob" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display"
          >
            Featured <span className="text-gradient-primary">Projects</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center items-center gap-3 mb-12 flex-wrap">
          {(['all', 'web', 'system'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === tab
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg'
                  : 'glassmorphism text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {tab === 'all' ? 'All Projects' : tab === 'web' ? 'Web Platforms' : 'System & Desktop'}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col h-full"
              >
                <Card className="h-full flex flex-col p-0 overflow-hidden group border-white/5 relative">
                  {/* Image Header with hover zooms */}
                  <div className="overflow-hidden bg-slate-950 aspect-video relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors font-display">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow font-sans">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[10px] font-semibold font-mono tracking-wide bg-white/5 text-slate-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                      {project.githubUrl && (
                        <Button
                          href={project.githubUrl}
                          variant="secondary"
                          size="sm"
                          className="flex-1 gap-2 text-xs"
                        >
                          <Github size={14} />
                          GitHub
                        </Button>
                      )}
                      {project.liveUrl ? (
                        <Button
                          href={project.liveUrl}
                          variant="primary"
                          size="sm"
                          className="flex-1 gap-2 text-xs"
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </Button>
                      ) : (
                        <span className="flex-1 text-center py-2 rounded-xl border border-dashed border-white/5 text-slate-600 text-[10px] uppercase font-mono font-bold tracking-wider">
                          System Build
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
