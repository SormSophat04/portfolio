import React from 'react'
import { motion } from 'framer-motion'
import { usePortfolio } from '@/context/PortfolioContext'
import { Testimonials3D } from '@/components/ui'

export const Testimonials: React.FC = () => {
  const { testimonialsItems } = usePortfolio()

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-transparent">
      {/* Decorative Glow Bubble behind cards */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display"
          >
            Kind <span className="text-gradient-primary">Words</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"
          />
        </div>

        {/* 3D Stacked Testimonials Carousel component */}
        <Testimonials3D testimonials={testimonialsItems} />
      </div>
    </section>
  )
}
