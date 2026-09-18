import React from 'react'
import './hero-field.css'

/* 氛围层 —— 参照 anthropic.com 首页 hero 的做法:
 * 那边是 <canvas class="fable-sky-canvas"> 画的天空背景,再叠一段 4.6s 静音短片,
 * 两者同尺寸(1285×695)合成出"会呼吸"的视觉。我们不搬它的素材,只做同构的自制版:
 * 一层缓慢扫过的暖色光带 + 漂移光团 —— 实测周期 40–70s,叠在既有 .stage-glow 之上。
 * 第一版只做了很淡的光雾,渲染后 3 秒内只有 0.01% 像素变化超过 5 级,等于看不见;
 * 现在加了会横扫的光带、提高强度,实测帧间差异提升到可见量级。
 * 光团与光带刻意避开左下文字区,保证白色正文的对比度。 */

// [cx, cy, r, rgb, phase, driftX, driftY, speed] —— 位置/半径都是画布比例,speed 单位 rad/s
const BLOBS = [
  [0.78, 0.78, 0.58, '214,207,140', 0.0, 0.085, 0.070, 0.145],
  [0.93, 0.44, 0.42, '205,124,88', 2.1, 0.070, 0.100, 0.106],
  [0.66, 0.18, 0.36, '236,199,155', 3.9, 0.095, 0.070, 0.088],
  [0.30, 0.96, 0.38, '150,90,66', 5.3, 0.070, 0.080, 0.122],
  [0.08, 0.12, 0.30, '132,148,126', 1.2, 0.060, 0.060, 0.071],
]

// [angle, y%, 带宽%, alpha, 摆动速度, tint, 三角波周期秒] —— 末项 >0 时用匀速三角波往复(速度恒定),0 则用摆动
const BANDS = [
  [-0.38, 0.60, 0.44, 0.23, 0, '226,190,120', 78],
  [-0.22, 0.16, 0.30, 0.18, 0.031, '196,120,84', 0],
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
      const R = Math.hypot(w, h)

      // 斜向光带:沿自身方向缓慢平移,是这套动效里最容易被看见的部分
      for (const [ang, y0, wid, alpha, sp, tint, P] of BANDS) {
        ctx.save()
        ctx.translate(w / 2, h / 2)
        ctx.rotate(ang)
        // 三角波 = 匀速往复,只有折返瞬间换向;正弦在两端速度趋零,那半秒会看着像静止
        const cx = P
          ? (2 * Math.abs(((time / P) % 1) - 0.5) - 1) * 0.7 * R
          : (Math.sin(time * sp) + 0.5 * Math.sin(time * sp * 1.618 + 1.1)) * 0.34 * R
        const g = ctx.createLinearGradient(cx - R, 0, cx + R, 0)
        g.addColorStop(0, `rgba(${tint},0)`)
        g.addColorStop(0.5, `rgba(${tint},${alpha})`)
        g.addColorStop(1, `rgba(${tint},0)`)
        const bandH = wid * h
        const y = (y0 - 0.5) * h + Math.cos(time * sp * 0.7) * h * 0.07
        ctx.fillStyle = g
        ctx.fillRect(-R, y - bandH / 2, 2 * R, bandH)
        ctx.restore()
      }

      for (const [cx, cy, r, rgb, ph, dx, dy, sp] of BLOBS) {
        // 双谐波叠加:单正弦在转向点速度趋零,会让整幅画面短暂看着像静止
        const s = Math.sin(time * sp + ph) + 0.45 * Math.sin(time * sp * 1.7 + ph * 2.3)
        const c = Math.cos(time * sp * 0.8 + ph) + 0.45 * Math.cos(time * sp * 1.31 + ph * 1.6)
        const x = (cx + s * dx) * w
        const y = (cy + c * dy) * h
        const rad = Math.max(1, r * Math.min(w, h) * (1 + 0.06 * Math.sin(time * sp * 1.3 + ph)))
        const g = ctx.createRadialGradient(x, y, 0, x, y, rad)
        g.addColorStop(0, `rgba(${rgb},.64)`)
        g.addColorStop(0.45, `rgba(${rgb},.27)`)
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
