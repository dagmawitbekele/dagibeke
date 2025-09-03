import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  build: {
    outDir: 'dist', // Ensure this is 'dist' or adjust Vercel settings
  },
  base: "/",
  server: {
    port: 5173, // Explicitly set the port
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
