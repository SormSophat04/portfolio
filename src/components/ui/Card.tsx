import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  hoverEffect?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  delay = 0,
  hoverEffect = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={`glassmorphism rounded-2xl p-6 ${
        hoverEffect ? 'glassmorphism-hover' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}
