import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatarUrl?: string
}

interface Testimonials3DProps {
  testimonials: Testimonial[]
}

export const Testimonials3D: React.FC<Testimonials3DProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Returns up to 3 testimonials that compose the visible stack
  const getVisibleTestimonials = () => {
    const visibleCount = Math.min(3, testimonials.length)
    const result = []
    for (let i = 0; i < visibleCount; i++) {
      const idx = (currentIndex + i) % testimonials.length
      result.push({
        item: testimonials[idx],
        depth: i
      })
    }
    return result
  }

  const stackItems = getVisibleTestimonials()

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-10 relative py-8 px-4">
      {/* 3D Stack Viewport */}
      <div 
        className="relative w-full aspect-[16/9] min-h-[300px] sm:min-h-[320px] flex items-center justify-center perspective-1000"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence mode="popLayout">
          {stackItems.map(({ item, depth }) => {
            // Receding transformation equations
            const translateZ = -depth * 55
            const translateY = -depth * 14
            const scale = 1 - depth * 0.05
            const opacity = 1 - depth * 0.35
            const blur = depth * 1.5

            return (
              <motion.div
                key={item.id}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: 10 - depth,
                  filter: `blur(${blur}px)`,
                }}
                initial={depth === 2 ? {
                  opacity: 0,
                  scale: 0.8,
                  y: -25,
                  z: -110
                } : false}
                animate={{
                  opacity,
                  scale,
                  y: translateY,
                  z: translateZ,
                  transition: {
                    duration: 0.45,
                    ease: [0.25, 1, 0.5, 1]
                  }
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  x: 160,
                  rotateY: 35,
                  z: -30,
                  transition: { duration: 0.35, ease: 'easeIn' }
                }}
                className="absolute w-full h-full max-w-xl glassmorphism border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-3d-indigo bg-[#0c0e20]/80 backdrop-blur-xl"
              >
                {/* Large Background Quote Symbol */}
                <div className="absolute top-4 right-6 text-indigo-500/10 pointer-events-none">
                  <Quote size={75} strokeWidth={1} />
                </div>

                {/* Content description */}
                <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed font-sans mb-4 pr-4">
                  "{item.content}"
                </p>

                {/* Identity avatar strip */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-indigo-500/30 bg-slate-950 flex items-center justify-center text-sm font-bold text-indigo-400 font-mono">
                    {item.avatarUrl ? (
                      <img src={item.avatarUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      item.name.charAt(0)
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-white font-display">{item.name}</h4>
                    <p className="text-xs text-slate-400 font-sans">
                      {item.role} <span className="text-indigo-400">@ {item.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center gap-4 relative z-20">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full border border-white/5 bg-[#0c0e20]/60 text-slate-400 hover:text-white hover:border-indigo-500/30 hover:bg-[#0c0e20] transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-xs text-slate-500 font-mono uppercase tracking-widest select-none">
          {currentIndex + 1} / {testimonials.length}
        </span>
        <button
          onClick={handleNext}
          className="p-3 rounded-full border border-white/5 bg-[#0c0e20]/60 text-slate-400 hover:text-white hover:border-indigo-500/30 hover:bg-[#0c0e20] transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
