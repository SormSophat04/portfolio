import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Check, Copy, AlertCircle } from 'lucide-react'
import { Card, Button } from '@/components/ui'

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null)

  const email = "sophatsorm2023@gmail.com"
  const phone = "+855 96 673 6488"
  const location = "Stueng Mean Chey, Phnom Penh, Cambodia"

  // Simple clipboard copy handler
  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  // Validate form entries
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message content is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setStatus('sending')
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-grid-pattern">
      {/* Decorative Blob */}
      <div className="absolute left-1/4 bottom-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600/5 glow-blob" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display"
          >
            Get In <span className="text-gradient-primary">Touch</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Left Side: Contact Information cards */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <h3 className="text-xl font-bold text-white font-display mb-2">Contact Details</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-sans mb-4">
              Feel free to reach out for project collaboration, job inquiries, or tech networking. I will respond to your queries as fast as possible.
            </p>

            {/* Email card */}
            <Card className="flex items-center gap-4 border-white/5 relative group p-5" hoverEffect={false}>
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Mail size={20} />
              </div>
              <div className="flex-grow min-w-0">
                <span className="text-xs text-slate-500 uppercase font-mono tracking-wider block mb-0.5">Email Me</span>
                <a href={`mailto:${email}`} className="text-sm sm:text-base font-bold text-white font-display truncate block hover:text-indigo-400 transition-colors">
                  {email}
                </a>
              </div>
              <button
                onClick={() => handleCopy(email, 'email')}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedType === 'email' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </Card>

            {/* Phone Card */}
            <Card className="flex items-center gap-4 border-white/5 relative group p-5" hoverEffect={false}>
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Phone size={20} />
              </div>
              <div className="flex-grow min-w-0">
                <span className="text-xs text-slate-500 uppercase font-mono tracking-wider block mb-0.5">Call Me</span>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-sm sm:text-base font-bold text-white font-display truncate block hover:text-purple-400 transition-colors">
                  {phone}
                </a>
              </div>
              <button
                onClick={() => handleCopy(phone, 'phone')}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy phone to clipboard"
              >
                {copiedType === 'phone' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </Card>

            {/* Location Card */}
            <Card className="flex items-center gap-4 border-white/5 relative group p-5" hoverEffect={false}>
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <MapPin size={20} />
              </div>
              <div className="flex-grow min-w-0">
                <span className="text-xs text-slate-500 uppercase font-mono tracking-wider block mb-0.5">Location</span>
                <a
                  href="https://www.google.com/maps?q=11.5372957,104.884096"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-bold text-white font-display truncate block hover:text-cyan-400 transition-colors"
                >
                  {location}
                </a>
              </div>
            </Card>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <Card className="border-white/5 p-8 glassmorphism" hoverEffect={false}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name & Email Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-400 font-mono uppercase">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value })
                        if (errors.name) setErrors({ ...errors, name: '' })
                      }}
                      className="px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-sm font-sans transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="text-[10px] text-rose-400 font-medium flex items-center gap-1"><AlertCircle size={10} />{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-400 font-mono uppercase">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (errors.email) setErrors({ ...errors, email: '' })
                      }}
                      className="px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-sm font-sans transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-[10px] text-rose-400 font-medium flex items-center gap-1"><AlertCircle size={10} />{errors.email}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-slate-400 font-mono uppercase">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value })
                      if (errors.subject) setErrors({ ...errors, subject: '' })
                    }}
                    className="px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-sm font-sans transition-colors"
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && <span className="text-[10px] text-rose-400 font-medium flex items-center gap-1"><AlertCircle size={10} />{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-400 font-mono uppercase">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (errors.message) setErrors({ ...errors, message: '' })
                    }}
                    className="px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-indigo-500 focus:outline-none text-white text-sm font-sans transition-colors resize-none"
                    placeholder="Let's build something awesome..."
                  />
                  {errors.message && <span className="text-[10px] text-rose-400 font-medium flex items-center gap-1"><AlertCircle size={10} />{errors.message}</span>}
                </div>

                {/* Status toast & buttons */}
                <div className="flex flex-col gap-4 mt-2">
                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-2"
                      >
                        <Check size={14} />
                        Message sent successfully! Thank you.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status === 'sending'}
                    className="w-full gap-2 py-3.5"
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
