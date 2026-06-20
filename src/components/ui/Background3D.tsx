import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const Background3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 70

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Dynamic anti-aliased soft circle texture (avoids downloading assets)
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 16
      canvas.height = 16
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 16, 16)
      }
      return new THREE.CanvasTexture(canvas)
    }

    const particleTexture = createCircleTexture()

    // Particle field constants
    const particlesCount = 140
    const positions = new Float32Array(particlesCount * 3)
    const velocities = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Spawn particles inside virtual box
      positions[i] = (Math.random() - 0.5) * 140 // X
      positions[i + 1] = (Math.random() - 0.5) * 140 // Y
      positions[i + 2] = (Math.random() - 0.5) * 100 // Z

      // Organic low-speed drift velocities
      velocities[i] = (Math.random() - 0.5) * 0.04
      velocities[i + 1] = (Math.random() - 0.5) * 0.04
      velocities[i + 2] = (Math.random() - 0.5) * 0.04
    }

    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )

    // Points Material (custom color and additive blending for neon visual effects)
    const particlesMaterial = new THREE.PointsMaterial({
      size: 1.8,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: particleTexture,
      color: 0x818cf8 // Theme indigo
    })

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particleSystem)

    // Floating 3D Geometric Torus Knot in the distance
    const torusGeometry = new THREE.TorusKnotGeometry(12, 3.5, 80, 12)
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1, // Slate/indigo neon accent
      wireframe: true,
      transparent: true,
      opacity: 0.03
    })
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)
    torusMesh.position.set(25, 10, -25)
    scene.add(torusMesh)

    // ─── Floating Programming Language Icon Sprites ───
    const langIcons = [
      { label: 'JS', color: '#f7df1e', bg: '#323330' },
      { label: 'TS', color: '#3178c6', bg: '#1b1f2e' },
      { label: '⚛', color: '#61dafb', bg: '#20232a' },
      { label: 'Py', color: '#3776ab', bg: '#1a1e2e' },
      { label: 'PHP', color: '#777bb4', bg: '#1a1e2e' },
      { label: 'C#', color: '#68217a', bg: '#1e1530' },
      { label: '<>', color: '#e34f26', bg: '#1e1212' },
      { label: 'CSS', color: '#264de4', bg: '#121a2e' },
      { label: 'Git', color: '#f05032', bg: '#1e1212' },
      { label: '🐳', color: '#2496ed', bg: '#0e1a2e' },
      { label: 'Node', color: '#339933', bg: '#0e1e12' },
      { label: 'SQL', color: '#00758f', bg: '#0e1a20' },
      { label: 'Vue', color: '#42b883', bg: '#0e1e16' },
      { label: 'Go', color: '#00add8', bg: '#0e1a22' },
      { label: 'Rust', color: '#ce422b', bg: '#1e1210' },
      { label: 'Java', color: '#ed8b00', bg: '#1e1810' },
      { label: 'C++', color: '#00599c', bg: '#0e1420' },
      { label: 'Ruby', color: '#cc342d', bg: '#1e1010' },
      { label: 'Dart', color: '#0175c2', bg: '#0e1420' },
      { label: 'Kt', color: '#7f52ff', bg: '#181530' },
      { label: 'Swift', color: '#f05138', bg: '#1e1210' },
      { label: 'AWS', color: '#ff9900', bg: '#1e1608' },
      { label: 'GCP', color: '#4285f4', bg: '#101828' },
      { label: 'Next', color: '#ffffff', bg: '#000000' },
      { label: 'Sass', color: '#cc6699', bg: '#1e1020' },
      { label: 'Svlt', color: '#ff3e00', bg: '#1e0e08' },
      { label: 'Redis', color: '#dc382d', bg: '#1e1010' },
      { label: 'Mongo', color: '#47a248', bg: '#0e1e10' },
      { label: 'K8s', color: '#326ce5', bg: '#101830' },
      { label: 'Linux', color: '#fcc624', bg: '#28280e' },
      { label: 'Boot', color: '#6db33f', bg: '#0e1e0e' },
    ]

    const createIconTexture = (label: string, color: string, bg: string) => {
      const size = 64
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) return new THREE.CanvasTexture(canvas)

      // Rounded rect background
      const r = 14
      ctx.beginPath()
      ctx.moveTo(r, 0)
      ctx.lineTo(size - r, 0)
      ctx.quadraticCurveTo(size, 0, size, r)
      ctx.lineTo(size, size - r)
      ctx.quadraticCurveTo(size, size, size - r, size)
      ctx.lineTo(r, size)
      ctx.quadraticCurveTo(0, size, 0, size - r)
      ctx.lineTo(0, r)
      ctx.quadraticCurveTo(0, 0, r, 0)
      ctx.closePath()

      ctx.fillStyle = bg
      ctx.fill()

      // Subtle border
      ctx.strokeStyle = color + '44'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Label text
      const isEmoji = /[\u{1F000}-\u{1FFFF}]|[⚛]/u.test(label)
      ctx.fillStyle = color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = isEmoji
        ? `${size * 0.5}px sans-serif`
        : `bold ${size * 0.32}px 'Space Grotesk', sans-serif`
      ctx.fillText(label, size / 2, size / 2 + 1)

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      return texture
    }

    interface IconSpriteData {
      sprite: THREE.Sprite
      vx: number
      vy: number
      vz: number
      rotSpeed: number
    }

    const iconSprites: IconSpriteData[] = []
    const iconTextures: THREE.CanvasTexture[] = []

    langIcons.forEach((icon) => {
      const texture = createIconTexture(icon.label, icon.color, icon.bg)
      iconTextures.push(texture)

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        blending: THREE.NormalBlending,
      })

      const sprite = new THREE.Sprite(material)
      const spriteScale = 3.5 + Math.random() * 2.5
      sprite.scale.set(spriteScale, spriteScale, 1)

      // Scatter in 3D space
      sprite.position.set(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 80
      )

      scene.add(sprite)
      iconSprites.push({
        sprite,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.015,
        rotSpeed: (Math.random() - 0.5) * 0.003,
      })
    })

    // Tracking mouse movements for interactive parallax effects
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Tracking scroll coordinates for depth shifts and scroll speed calculations
    let scrollY = 0
    let lastScrollY = window.scrollY
    let scrollSpeed = 0
    const handleScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Window resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation frames
    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()

      // Calculate scroll speed deltas and decay velocity using inert friction
      const currentScrollY = scrollY
      const scrollDelta = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      scrollSpeed += Math.abs(scrollDelta) * 0.15
      scrollSpeed = Math.min(scrollSpeed, 50) // clamp max warp speed
      scrollSpeed *= 0.93 // decay friction factor

      // Slowly rotate background mesh
      torusMesh.rotation.x = time * 0.04
      torusMesh.rotation.y = time * 0.02

      // Ease mouse values to prevent jerky camera motion
      mouseX += (targetMouseX - mouseX) * 0.06
      mouseY += (targetMouseY - mouseY) * 0.06

      // Move camera based on scroll parallax and mouse position
      camera.position.x = mouseX * 12
      camera.position.y = mouseY * 12 + (scrollY * -0.015)

      // Dolly-zoom FOV distortion based on scroll velocity
      const targetFov = 60 + (scrollSpeed * 0.4)
      camera.fov += (targetFov - camera.fov) * 0.1
      camera.updateProjectionMatrix()

      camera.lookAt(scene.position)

      // Drift particle field nodes and calculate mouse avoidance + scroll warp boost
      const posAttr = particlesGeometry.attributes.position as THREE.BufferAttribute
      const positionsArray = posAttr.array as Float32Array

      // Speed boost for particles along Z-axis (towards camera)
      const zWarpBoost = scrollSpeed * 0.18

      for (let i = 0; i < particlesCount * 3; i += 3) {
        positionsArray[i] += velocities[i]
        positionsArray[i + 1] += velocities[i + 1]
        positionsArray[i + 2] += velocities[i + 2] + zWarpBoost

        // Boundary wrap checks. If particles fly past the camera, wrap them back
        if (Math.abs(positionsArray[i]) > 75) positionsArray[i] = -positionsArray[i]
        if (Math.abs(positionsArray[i + 1]) > 75) positionsArray[i + 1] = -positionsArray[i + 1]
        
        if (positionsArray[i + 2] > 50) {
          positionsArray[i + 2] = -50
          // Re-scatter slightly to prevent repeating visual grids
          positionsArray[i] = (Math.random() - 0.5) * 140
          positionsArray[i + 1] = (Math.random() - 0.5) * 140
        } else if (positionsArray[i + 2] < -50) {
          positionsArray[i + 2] = 50
        }

        // Interactive repulsive force when cursor pushes close to a node
        const px = positionsArray[i]
        const py = positionsArray[i + 1]
        
        // Scale normalized mouse cursor coords to world coords
        const cursorWorldX = mouseX * 45
        const cursorWorldY = mouseY * 35
        
        const dx = px - cursorWorldX
        const dy = py - cursorWorldY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 18) {
          const repelForce = (18 - distance) / 18 * 0.08
          positionsArray[i] += (dx / distance) * repelForce
          positionsArray[i + 1] += (dy / distance) * repelForce
        }
      }

      posAttr.needsUpdate = true

      // Animate floating programming language icon sprites
      iconSprites.forEach((data) => {
        const { sprite, vx, vy, vz, rotSpeed } = data

        sprite.position.x += vx
        sprite.position.y += vy
        sprite.position.z += vz + zWarpBoost * 0.4

        // Gentle rotation on the sprite material
        sprite.material.rotation += rotSpeed

        // Boundary wrapping for icons
        if (Math.abs(sprite.position.x) > 80) sprite.position.x = -sprite.position.x * 0.9
        if (Math.abs(sprite.position.y) > 80) sprite.position.y = -sprite.position.y * 0.9
        if (sprite.position.z > 45) {
          sprite.position.z = -40
          sprite.position.x = (Math.random() - 0.5) * 140
          sprite.position.y = (Math.random() - 0.5) * 140
        } else if (sprite.position.z < -45) {
          sprite.position.z = 40
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    // Resource disposal clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      torusGeometry.dispose()
      torusMaterial.dispose()
      particleTexture.dispose()

      // Dispose icon sprite resources
      iconSprites.forEach((data) => {
        data.sprite.material.dispose()
        scene.remove(data.sprite)
      })
      iconTextures.forEach((t) => t.dispose())

      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
