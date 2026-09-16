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

// 动效克制:淡入 + 上移 14px,700ms 缓出,交错 60ms;无弹跳、不预隐藏内容(渐进增强)。
async function initMotion() {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const mm = gsap.matchMedia()
  mm.add(
    { motionOK: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' },
    (ctx) => {
      if (!ctx.conditions.motionOK) return
      gsap.from('.hero h1, .hero .sub, .hero-act, .hero-meta', {
        opacity: 0, y: 14, duration: 0.7, ease: 'power3.out', stagger: 0.07,
      })
      ScrollTrigger.batch('.stage-card, .rcard, .note, .stat, .claim h2, .cta h2', {
        start: 'top 90%', once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0, y: 14, duration: 0.7, ease: 'power3.out', stagger: 0.06, overwrite: true,
          }),
      })
    },
  )
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMotion)
else initMotion()
