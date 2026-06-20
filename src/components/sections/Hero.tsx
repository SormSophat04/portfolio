import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Download, ArrowRight, Mail } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Button, Github, Linkedin, Facebook, TiltCard } from '@/components/ui'


export const Hero: React.FC = () => {
  const { hero: heroData } = usePortfolio()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }


  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/10 glow-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-violet-600/10 glow-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-cyan-600/5 glow-blob" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Typography Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.span
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-6 font-display"
          >
            AVAILABLE FOR HIRE
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white leading-tight font-display"
          >
            Hi, I'm <span className="text-gradient-primary">{heroData.name}</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl font-semibold text-slate-300 mb-6 font-display"
          >
            {heroData.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-400 max-w-xl mb-8 leading-relaxed font-sans"
          >
            {heroData.shortIntro}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
          >

            <Button href="/Sorm_Sophat_Backend_CV.pdf" variant="primary" size="lg" className="gap-2" download="Sorm_Sophat_CV.pdf">
              <Download size={16} />
              Download CV
            </Button>
            <Button href="#projects" variant="secondary" size="lg" className="gap-2">
              View Projects
              <ArrowRight size={16} />
            </Button>
            <Button href="#contact" variant="outline" size="lg" className="gap-2">
              <Mail size={16} />
              Contact
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Connect:</span>
            <div className="flex gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glassmorphism hover:border-indigo-500/40 hover:text-indigo-400 transition-all duration-300 text-slate-400 hover:scale-105"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glassmorphism hover:border-indigo-500/40 hover:text-indigo-400 transition-all duration-300 text-slate-400 hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glassmorphism hover:border-indigo-500/40 hover:text-indigo-400 transition-all duration-300 text-slate-400 hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Interactive Profile Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <div className="relative group">
            {/* Ambient Background Gradient Aura */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-35 blur-2xl group-hover:opacity-75 transition-all duration-500" />
            
            {/* Outer 3D Tilt Container */}
            <TiltCard
              maxTilt={15}
              scale={1.03}
              className="relative glassmorphism p-3 rounded-2xl max-w-[320px] sm:max-w-[360px] border border-white/10 shadow-3d-indigo"
            >
              <div className="overflow-hidden rounded-xl bg-slate-950 aspect-square relative">
                <img
                  src={heroData.avatarUrl || '/avatar.png'}
                  alt="Sorm Sophat Profile"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Quick Info Strip */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Online
                </span>
                <span>Phnom Penh, KH</span>
              </div>
            </TiltCard>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
