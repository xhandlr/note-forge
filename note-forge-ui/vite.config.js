// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5173,
    host: true,  
    strictPort: true,  
    historyApiFallback: true
  },
  plugins: [
    tailwindcss(),
  ],
  base: '/note-forge/'
})