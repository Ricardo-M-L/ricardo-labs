import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// GitHub Pages 部署在 /ricardo-labs/ 子路径下；Render/Docker 根路径部署时传 VITE_BASE=/
const base = process.env.VITE_BASE || '/ricardo-labs/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      // 多页：首页 + 「Try metis」独立页。静态托管下各是一个真实的 HTML 入口，
      // 不依赖前端路由（GitHub Pages 无法做服务端 rewrite）。
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        // 目录式入口:线上就是 /try-metis/(网址不带 .html)
        tryMetis: fileURLToPath(new URL('./try-metis/index.html', import.meta.url)),
      },
    },
  },
})
