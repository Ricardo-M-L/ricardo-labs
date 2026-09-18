import React from 'react'
import './hero-field.css'

/* 氛围层 —— 参照 anthropic.com 首页 hero 的做法:
 * 那边是 <canvas class="fable-sky-canvas"> 画的天空背景,再叠一段 4.6s 静音短片,
 * 两者同尺寸(1285×695)合成出"会呼吸"的视觉。我们不搬它的素材,只做同构的自制版:
 * 一层缓慢漂移的暖色光雾 —— 周期 20s+,无闪烁、无粒子星空,叠在既有 .stage-glow 之上。
 * 光团刻意排在右下与上部,左下保持暗,以免吃掉白色正文的对比度。 */

// [cx, cy, r, rgb, phase, driftX, driftY, speed]  —— 位置/半径都是画布比例
const BLOBS = [
  [0.74, 0.80, 0.52, '212,205,135', 0.0, 0.055, 0.045, 0.052],
  [0.88, 0.52, 0.34, '201,120,86', 2.1, 0.045, 0.070, 0.038],
  [0.64, 0.26, 0.28, '232,196,152', 3.9, 0.065, 0.045, 0.031],
  [0.38, 0.90, 0.30, '147,88,64', 5.3, 0.045, 0.050, 0.044],
]

export default function HeroField() {
  const ref = React.useRef(null)

  React.useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let visible = true
    let w = 1
    let h = 1

    const size = () => {
      const box = cv.parentElement.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = Math.max(1, Math.round(box.width))
      h = Math.max(1, Math.round(box.height))
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t) => {
      const time = t / 1000
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'screen'
      for (const [cx, cy, r, rgb, ph, dx, dy, sp] of BLOBS) {
        const x = (cx + Math.sin(time * sp + ph) * dx) * w
        const y = (cy + Math.cos(time * sp * 0.8 + ph) * dy) * h
        const rad = Math.max(1, r * Math.min(w, h) * (1 + 0.05 * Math.sin(time * sp * 1.3 + ph)))
        const g = ctx.createRadialGradient(x, y, 0, x, y, rad)
        g.addColorStop(0, `rgba(${rgb},.30)`)
        g.addColorStop(0.45, `rgba(${rgb},.10)`)
        g.addColorStop(1, `rgba(${rgb},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, rad, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    const tick = (t) => {
      raf = requestAnimationFrame(tick)
      draw(t)
    }

    // 尺寸/可见性/reduced-motion 任一变化都重启:静止时只补一帧
    const apply = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      size()
      draw(performance.now())
      if (!reduce.matches && visible) raf = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(apply)
    if (cv.parentElement) ro.observe(cv.parentElement)
    const io = new IntersectionObserver((es) => {
      visible = es.some((e) => e.isIntersecting)
      apply()
    }, { rootMargin: '120px' })
    io.observe(cv)
    reduce.addEventListener?.('change', apply)

    apply()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      reduce.removeEventListener?.('change', apply)
    }
  }, [])

  return (
    <div className="hero-field" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  )
}
