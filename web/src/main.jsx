import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './tokens.css'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// ui-ux-pro-max GSAP 预设「Stagger List · Standard」:
// gsap.from + back.out(1.4) + grid:'auto';matchMedia 处理 reduced-motion。
// 不预隐藏内容 —— JS 失败/未触发时页面完全可读(渐进增强)。
async function initMotion() {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ duration: 0.4, ease: 'back.out(1.4)' })

  const mm = gsap.matchMedia()
  mm.add(
    {
      motionOK: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    },
    (ctx) => {
      if (!ctx.conditions.motionOK) return
      // hero 主区序贯入场(不依赖滚动,立即播放)
      gsap.from('.hero-main > *', {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.45,
      })
      // 产品 bento:进入视口波浪 stagger(grid auto)
      ScrollTrigger.batch('.prod', {
        start: 'top 92%', once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0, scale: 0.92, y: 16,
            duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' },
            ease: 'back.out(1.4)', overwrite: true,
          }),
      })
      // 研究行 + CTA 块
      ScrollTrigger.batch(['.row', '.cta-block'].join(','), {
        start: 'top 94%', once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0, y: 14, stagger: 0.07, duration: 0.35, overwrite: true,
          }),
      })
    },
  )
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMotion)
} else {
  initMotion()
}
