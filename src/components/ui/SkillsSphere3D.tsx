import React, { useEffect, useRef, useState } from 'react'

interface SkillItem {
  name: string
  x: number
  y: number
  z: number
  x2d: number
  y2d: number
  scale: number
}

interface SkillsSphere3DProps {
  skills: string[]
  radius?: number
}

export const SkillsSphere3D: React.FC<SkillsSphere3DProps> = ({ skills, radius = 170 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = container.clientWidth
    let height = container.clientHeight
    canvas.width = width
    canvas.height = height

    let items: SkillItem[] = []
    const count = skills.length

    // Generate spherical coordinates mapping
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * (i + 0.5)) / count)
      const theta = Math.sqrt(count * Math.PI) * phi

      items.push({
        name: skills[i],
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        x2d: 0,
        y2d: 0,
        scale: 0
      })
    }

    // Default auto-rotation velocity
    let angleX = 0.002
    let angleY = 0.002
    let targetAngleX = 0.002
    let targetAngleY = 0.002

    // Drag-to-spin track variables
    let isDragging = false
    let startX = 0
    let startY = 0

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      startX = clientX
      startY = clientY
    }

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      if (isDragging) {
        const dx = clientX - startX
        const dy = clientY - startY
        // Adjust rotational target angle based on drag velocity
        targetAngleY = dx * 0.0006
        targetAngleX = -dy * 0.0006
        startX = clientX
        startY = clientY
      } else {
        // Perform simple bounding box hover checks on projected coordinates
        const rect = canvas.getBoundingClientRect()
        const mouseX = clientX - rect.left
        const mouseY = clientY - rect.top

        let foundIndex = null
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          const fontSize = Math.max(9, 13 * item.scale)
          ctx.font = `bold ${fontSize}px 'Space Grotesk', sans-serif`
          const textWidth = ctx.measureText(item.name).width
          
          if (
            mouseX >= item.x2d - textWidth / 2 - 8 &&
            mouseX <= item.x2d + textWidth / 2 + 8 &&
            mouseY >= item.y2d - fontSize / 2 - 6 &&
            mouseY <= item.y2d + fontSize / 2 + 6
          ) {
            foundIndex = i
            break
          }
        }
        setHoveredIndex(foundIndex)
        canvas.style.cursor = foundIndex !== null ? 'pointer' : 'grab'
      }
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    canvas.addEventListener('mousedown', handleMouseDown as any)
    canvas.addEventListener('mousemove', handleMouseMove as any)
    window.addEventListener('mouseup', handleMouseUp)

    canvas.addEventListener('touchstart', handleMouseDown as any, { passive: true })
    canvas.addEventListener('touchmove', handleMouseMove as any, { passive: true })
    window.addEventListener('touchend', handleMouseUp)

    const handleResize = () => {
      if (!canvas || !container) return
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', handleResize)

    // Trigonometric rotation operations
    const rotateX = (item: SkillItem, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const y1 = item.y * cos - item.z * sin
      const z1 = item.z * cos + item.y * sin
      item.y = y1
      item.z = z1
    }

    const rotateY = (item: SkillItem, angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const x1 = item.x * cos + item.z * sin
      const z1 = item.z * cos - item.x * sin
      item.x = x1
      item.z = z1
    }

    let animationFrameId: number
    const depth = 280

    const draw = () => {
      // Smoothly interpolate rotation speeds
      angleX += (targetAngleX - angleX) * 0.08
      angleY += (targetAngleY - angleY) * 0.08

      // Add gentle drag friction, returning rotation to default auto-spin
      if (!isDragging) {
        targetAngleX += (0.001 - targetAngleX) * 0.02
        targetAngleY += (0.0015 - targetAngleY) * 0.02
      }

      ctx.clearRect(0, 0, width, height)

      // Project spherical items onto 2D viewport coordinates
      items.forEach((item) => {
        rotateX(item, angleX)
        rotateY(item, angleY)

        const scale = depth / (depth - item.z)
        item.scale = scale
        item.x2d = item.x * scale + width / 2
        item.y2d = item.y * scale + height / 2
      })

      // Sort items by Z (Painter's algorithm: draw background nodes first)
      const sorted = [...items].sort((a, b) => a.z - b.z)

      sorted.forEach((item) => {
        const originalIndex = items.indexOf(item)
        const isHovered = originalIndex === hoveredIndex

        // Opacity gradient based on item depth mapping
        const alpha = Math.max(0.12, ((item.z + radius) / (2 * radius)) * 0.85 + 0.15)

        // Hue transition between Indigo and Cyan depending on coordinates
        let color = `rgba(148, 163, 184, ${alpha})`
        if (isHovered) {
          color = '#ffffff'
        } else if (item.z > 0) {
          const hue = 195 + ((item.x + radius) / (2 * radius)) * 60 // Hues 195 (cyan) to 255 (indigo)
          color = `hsla(${hue}, 85%, 72%, ${alpha})`
        } else {
          color = `rgba(100, 116, 139, ${alpha * 0.8})` // Darker slate for background items
        }

        const fontSize = Math.max(9, 13 * item.scale)
        ctx.font = `bold ${fontSize}px 'Space Grotesk', sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        if (isHovered) {
          ctx.shadowBlur = 15
          ctx.shadowColor = '#6366f1'
          ctx.fillStyle = '#ffffff'
        } else {
          ctx.shadowBlur = 0
          ctx.fillStyle = color
        }

        ctx.fillText(item.name, item.x2d, item.y2d)
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener('mousedown', handleMouseDown as any)
      canvas.removeEventListener('mousemove', handleMouseMove as any)
      window.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('touchstart', handleMouseDown as any)
      canvas.removeEventListener('touchmove', handleMouseMove as any)
      window.removeEventListener('touchend', handleMouseUp)
      window.removeEventListener('resize', handleResize)
    }
  }, [skills, radius, hoveredIndex])

  return (
    <div
      ref={containerRef}
      className="w-full aspect-square max-w-[380px] sm:max-w-[420px] mx-auto flex items-center justify-center relative cursor-grab active:cursor-grabbing select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
