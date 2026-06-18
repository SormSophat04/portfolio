import React from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Card } from '@/components/ui'

// Helper component for dynamic icon resolution
const CategoryIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  switch (name.toLowerCase()) {
    case 'layout':
      return <Icons.Layout className={className} size={20} />
    case 'server':
      return <Icons.Server className={className} size={20} />
    case 'database':
      return <Icons.Database className={className} size={20} />
    case 'cloud':
      return <Icons.Cloud className={className} size={20} />
    default:
      return <Icons.HelpCircle className={className} size={20} />
  }
}

export const Skills: React.FC = () => {
  const { skillCategories } = usePortfolio()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-grid-pattern">
      {/* Dynamic Glow Blob */}
      <div className="absolute left-0 bottom-1/4 w-[350px] h-[350px] rounded-full bg-violet-600/5 glow-blob" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display"
          >
            Technical <span className="text-gradient-primary">Skills</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"
          />
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <Card className="h-full flex flex-col gap-6" hoverEffect={false}>
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <CategoryIcon name={category.icon} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 font-display">{category.name}</h3>
                </div>

                {/* Skill List */}
                <div className="flex flex-col gap-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-300 font-medium">{skill.name}</span>
                        <span className="text-indigo-400 font-mono font-medium">{skill.level}%</span>
                      </div>
                      {/* Progress Track */}
                      <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
