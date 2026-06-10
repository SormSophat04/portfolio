import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Target, Heart, GraduationCap } from 'lucide-react'
import { aboutData } from '@/data/portfolioData'
import { Card } from '@/components/ui'

export const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#05060f]">
      {/* Decorative Glow */}
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] rounded-full bg-indigo-600/5 glow-blob" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display"
          >
            About <span className="text-gradient-primary">Me</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"
          />
        </div>

        {/* Introduction Narrative */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans"
          >
            {aboutData.intro}
          </motion.p>
        </div>

        {/* Informational Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Education */}
          <motion.div variants={cardVariants}>
            <Card className="h-full flex flex-col items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <BookOpen size={20} />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Education Background</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {aboutData.education}
              </p>
              <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-indigo-400 font-mono">
                <GraduationCap size={14} />
                <span>SE Degree Student</span>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Career Goals */}
          <motion.div variants={cardVariants}>
            <Card className="h-full flex flex-col items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Target size={20} />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Career Aspirations</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {aboutData.goals}
              </p>
              <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-purple-400 font-mono">
                <Target size={14} />
                <span>Future DevOps / Architect</span>
              </div>
            </Card>
          </motion.div>

          {/* Card 3: Cloud Passion */}
          <motion.div variants={cardVariants}>
            <Card className="h-full flex flex-col items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Heart size={20} />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Cloud &amp; DevOps</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {aboutData.passion}
              </p>
              <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-cyan-400 font-mono">
                <Heart size={14} />
                <span>CI/CD &amp; Infrastructure</span>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
