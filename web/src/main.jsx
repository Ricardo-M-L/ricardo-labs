import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './tokens.css'
import './styles.css'

document.documentElement.classList.add('js')

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// GSAP 入场动效 — gsap-core + gsap-scrolltrigger 规范:
// 只动 transform/opacity;matchMedia 处理 prefers-reduced-motion。
async function initMotion() {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ duration: 0.7, ease: 'power3.out' })

  const mm = gsap.matchMedia()

  mm.add(
    {
      motionOK: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    },
    (ctx) => {
      const { motionOK } = ctx.conditions
      if (!motionOK) {
        gsap.set('.reveal', { opacity: 1 })
        return
      }
      // hero:序贯 rise(from 只在动画创建时设初值)
      gsap.from('.hero .reveal', {
        y: 28, autoAlpha: 0, stagger: 0.12, duration: 0.8,
      })
      // 研究行/产品区/CTA:进入视口时 from() rise-in。
      // 不做任何预隐藏 —— batch 未触发或 JS 失败时内容默认可见。
      ScrollTrigger.batch(
        ['.research .reveal', '.product .reveal', '.cta .reveal'].join(','),
        {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            gsap.from(batch, {
              y: 24, autoAlpha: 0, stagger: 0.1,
              duration: 0.6, overwrite: true,
            }),
        },
      )
    },
  )
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMotion)
} else {
  initMotion()
}
// 保险:GSAP 动态加载失败(网络/CDN)时强制显示,避免内容被锁在 opacity:0
initMotion().catch(() => {
  document.querySelectorAll('.reveal').forEach((el) => { el.style.opacity = 1 })
})
