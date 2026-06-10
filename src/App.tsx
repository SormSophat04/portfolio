import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Navbar,
  Hero,
  About,
  Skills,
  Projects,
  Timeline,
  Services,
  GitHubStats,
  Testimonials,
  Contact,
  Footer
} from '@/components'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const { scrollYProgress } = useScroll()
  
  // Spring settings for smoother top progress bar animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])


  return (
    <div className="min-h-screen bg-[#05060f] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Dynamic Cursor Light Glow (Trailing Spotlight) */}
      <div
        className="fixed pointer-events-none z-30 w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out hidden lg:block"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      />

      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 origin-[0%]"
        style={{ scaleX }}
      />

      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Page Content Flow */}
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Services />
        <GitHubStats />
        <Testimonials />
        <Contact />
      </main>

      {/* Recruiter-friendly footer */}
      <Footer />
    </div>
  )
}

export default App

