import React from 'react'
import { ArrowUp } from 'lucide-react'
import { Github, Linkedin, Facebook } from '@/components/ui'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/5 bg-[#05060f] py-12 relative overflow-hidden">
      {/* Decorative Blur Blob */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#home" className="text-white font-bold text-lg tracking-wider font-display">
            SOPHAT<span className="text-indigo-400">.DEV</span>
          </a>
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {currentYear} Sorm Sophat. All rights reserved. Built with React + Tailwind.
          </p>
        </div>

        {/* Quick Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm text-slate-400 font-medium">
          <li><a href="#about" className="hover:text-white transition-colors duration-200">About</a></li>
          <li><a href="#skills" className="hover:text-white transition-colors duration-200">Skills</a></li>
          <li><a href="#projects" className="hover:text-white transition-colors duration-200">Projects</a></li>
          <li><a href="#timeline" className="hover:text-white transition-colors duration-200">Timeline</a></li>
          <li><a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a></li>
        </ul>

        {/* Right Side - Socials & Scroll to Top */}
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glassmorphism hover:border-indigo-500/40 hover:text-indigo-400 transition-all duration-300 text-slate-400"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glassmorphism hover:border-indigo-500/40 hover:text-indigo-400 transition-all duration-300 text-slate-400"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glassmorphism hover:border-indigo-500/40 hover:text-indigo-400 transition-all duration-300 text-slate-400"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl glassmorphism hover:border-indigo-500/40 hover:text-indigo-400 hover:scale-105 transition-all duration-300 text-slate-400 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
