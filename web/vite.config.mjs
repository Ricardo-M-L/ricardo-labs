import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 部署在 /ricardo-labs/ 子路径下；Render/Docker 根路径部署时传 VITE_BASE=/
const base = process.env.VITE_BASE || '/ricardo-labs/'

export default defineConfig({
  base,
  plugins: [react()],
})
