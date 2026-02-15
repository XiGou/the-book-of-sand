/**
 * 流动的沙粒子特效 - 满城尽带黄金甲风格
 * 全页背景，Canvas 实现，性能优化
 */

import { useEffect, useRef } from 'react'
import './SandParticles.css'

const GOLDEN_PALETTE = [
  'rgba(244, 208, 63, ',   // #f4d03f 亮金
  'rgba(218, 165, 32, ',   // #daa520 金
  'rgba(212, 168, 75, ',   // #d4a84b 琥珀金
  'rgba(201, 162, 39, ',   // #c9a227 深金
  'rgba(230, 190, 90, ',   // #e6be5a 暖金
  'rgba(184, 134, 11, ',   // #b8860b 暗金
  'rgba(210, 180, 140, ',  // #d2b48c 沙色
]

const PARTICLE_COUNT = 380
const MAX_SIZE = 2.2
const MIN_SIZE = 0.5
const FLOW_SPEED = 0.12
const DRIFT_AMPLITUDE = 14

// 简化的噪声函数，用于有机流动
function noise2(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return n - Math.floor(n)
}

function smoothNoise(x: number, y: number): number {
  const nx = Math.floor(x)
  const ny = Math.floor(y)
  const fx = x - nx
  const fy = y - ny
  const u = fx * fx * (3 - 2 * fx)
  const v = fy * fy * (3 - 2 * fy)
  const t0 = noise2(nx, ny) * (1 - u) * (1 - v)
  const t1 = noise2(nx + 1, ny) * u * (1 - v)
  const t2 = noise2(nx, ny + 1) * (1 - u) * v
  const t3 = noise2(nx + 1, ny + 1) * u * v
  return t0 + t1 + t2 + t3
}

interface Particle {
  x: number
  y: number
  size: number
  colorIndex: number
  phase: number
  speed: number
  baseY: number
}

export function SandParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const frameRef = useRef<number>(0)
  const timeRef = useRef(0)
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const w = Math.floor(rect.width)
      const h = Math.floor(rect.height)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles(w, h)
    }

    const initParticles = (w: number, h: number) => {
      const particles: Particle[] = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
          colorIndex: Math.floor(Math.random() * GOLDEN_PALETTE.length),
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.8,
          baseY: Math.random() * h,
        })
      }
      particlesRef.current = particles
    }

    const animate = () => {
      if (!canvas || !ctx || !visibleRef.current) {
        frameRef.current = requestAnimationFrame(animate)
        return
      }

      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      timeRef.current += 0.016

      ctx.clearRect(0, 0, w, h)

      const t = timeRef.current
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const flowX = smoothNoise(p.x * 0.02, t * 0.3 + p.phase) * DRIFT_AMPLITUDE
        const flowY = Math.sin(t * 0.5 + p.phase * 2) * 3
        p.x += FLOW_SPEED * p.speed + flowX * 0.02
        p.y = (p.baseY + flowY + Math.sin(p.x * 0.05 + t) * 8) % h
        if (p.x > w + 5) p.x = -5
        if (p.x < -5) p.x = w + 5
        if (p.y < 0) p.y += h
        if (p.y > h) p.y -= h

        const depth = 0.35 + 0.65 * (p.size / MAX_SIZE)
        const alpha = 0.2 + 0.55 * depth * (0.65 + 0.35 * Math.sin(t + p.phase))
        const baseColor = GOLDEN_PALETTE[p.colorIndex]

        // 发光层：多层同心圆营造柔和光晕
        const glowLayers = p.size > 1.2 ? 3 : 2
        for (let g = glowLayers; g >= 0; g--) {
          const r = p.size + g * 1.5
          const ga = alpha * (0.15 - g * 0.04)
          if (ga > 0.02) {
            ctx.fillStyle = baseColor + ga.toFixed(2) + ')'
            ctx.beginPath()
            ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        // 核心
        ctx.fillStyle = baseColor + alpha.toFixed(2) + ')'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    resize()
    window.addEventListener('resize', resize)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      observer.disconnect()
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="sand-particles" aria-hidden />
}
