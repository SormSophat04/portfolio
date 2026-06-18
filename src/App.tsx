import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import { Login } from '@/pages/Login'
import { DashboardLayout } from '@/pages/admin/DashboardLayout'
import { DashboardHome } from '@/pages/admin/DashboardHome'
import { HeroEditor } from '@/pages/admin/HeroEditor'
import { AboutEditor } from '@/pages/admin/AboutEditor'
import { ProjectsManager } from '@/pages/admin/ProjectsManager'
import { SkillsManager } from '@/pages/admin/SkillsManager'
import { TimelineManager } from '@/pages/admin/TimelineManager'
import { ServicesManager } from '@/pages/admin/ServicesManager'
import { TestimonialsManager } from '@/pages/admin/TestimonialsManager'
import { SeedData } from '@/pages/admin/SeedData'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'

function PortfolioPage() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const { scrollYProgress } = useScroll()
  
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
      <div
        className="fixed pointer-events-none z-30 w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out hidden lg:block"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      />

      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 origin-[0%]"
        style={{ scaleX }}
      />

      <Navbar />

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

      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="about" element={<AboutEditor />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="skills" element={<SkillsManager />} />
        <Route path="timeline" element={<TimelineManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="seed" element={<SeedData />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
