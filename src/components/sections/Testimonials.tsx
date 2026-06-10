import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonialsItems } from '@/data/portfolioData'
import { Card } from '@/components/ui'

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsItems.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialsItems.length - 1 ? 0 : prev + 1))
  }

  const activeTestimonial = testimonialsItems[activeIndex]

  // Helper to extract initials for fallback avatar rendering
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#05060f]">
      {/* Decorative Blur Bubble */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
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

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Card Animating */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-8 sm:p-12 relative border-white/5 shadow-2xl glassmorphism" hoverEffect={false}>
                {/* Quote Icon Background watermark */}
                <div className="absolute top-6 right-8 text-indigo-500/10 pointer-events-none">
                  <Quote size={80} />
                </div>

                <div className="flex flex-col items-center text-center gap-6">
                  {/* Testimonial Quote text */}
                  <p className="text-base sm:text-xl text-slate-300 font-sans italic leading-relaxed max-w-2xl relative z-10">
                    "{activeTestimonial.content}"
                  </p>

                  {/* Profile info */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                    {/* Fallback circle with initials for robust loading */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-base border-2 border-slate-950 shadow-md">
                      {getInitials(activeTestimonial.name)}
                    </div>

                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <span className="text-base font-bold text-white font-display">
                        {activeTestimonial.name}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 font-mono">
                        {activeTestimonial.role} &bull; <span className="text-indigo-400">{activeTestimonial.company}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl glassmorphism hover:border-indigo-500/40 hover:text-indigo-400 text-slate-400 transition-all duration-300 hover:scale-105 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Indicator Dots */}
            <div className="flex gap-2 mx-4">
              {testimonialsItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'w-6 bg-gradient-to-r from-indigo-500 to-violet-500'
                      : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-xl glassmorphism hover:border-indigo-500/40 hover:text-indigo-400 text-slate-400 transition-all duration-300 hover:scale-105 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
