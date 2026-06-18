import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Code, Smartphone, Palette, Terminal } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'
import { Card } from '@/components/ui'

// Helper component for dynamic icon resolution
const ServiceIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  switch (name.toLowerCase()) {
    case 'code':
      return <Code className={className} size={24} />
    case 'smartphone':
      return <Smartphone className={className} size={24} />
    case 'figma':
      return <Palette className={className} size={24} />
    case 'terminal':
      return <Terminal className={className} size={24} />
    default:
      return <Code className={className} size={24} />
  }
}

export const Services: React.FC = () => {
  const { serviceItems } = usePortfolio()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }


  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#05060f]">
      {/* Ambient background glow */}
      <div className="absolute right-0 bottom-1/4 w-[300px] h-[300px] rounded-full bg-indigo-600/5 glow-blob" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display"
          >
            My <span className="text-gradient-primary">Services</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"
          />
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {serviceItems.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Card className="h-full flex flex-col items-start gap-4 p-8 relative border-white/5 overflow-hidden group">
                {/* Glowing subtle hover outline */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500" />
                
                {/* Service Icon wrapper */}
                <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-violet-500 group-hover:text-white transition-all duration-300">
                  <ServiceIcon name={service.icon} />
                </div>
                
                {/* Text Content */}
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 font-display mt-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-sans">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
