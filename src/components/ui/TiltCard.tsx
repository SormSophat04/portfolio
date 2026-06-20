import React, { useState, useRef, type MouseEvent } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number // Max tilt in degrees (default: 12)
  scale?: number // Hover scale factor (default: 1.02)
  glare?: boolean // Enable specular reflection glare (default: true)
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.02,
  glare = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Mouse coordinates relative to card element
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Map coordinates to range [-0.5, 0.5] and scale by maxTilt
    const rotateX = ((mouseY / height) - 0.5) * -maxTilt
    const rotateY = ((mouseX / width) - 0.5) * maxTilt

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`)

    if (glare) {
      const glareX = (mouseX / width) * 100
      const glareY = (mouseY / height) * 100
      setGlarePos({ x: glareX, y: glareY })
    }
  }

  const handleMouseLeave = () => {
    // Reset transforms smoothly
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
        '--glare-x': `${glarePos.x}%`,
        '--glare-y': `${glarePos.y}%`,
      } as React.CSSProperties}
      className={`tilt-card relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {glare && <div className="tilt-glare" />}
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }} className="h-full">
        {children}
      </div>
    </div>
  )
}
