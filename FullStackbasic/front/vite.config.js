import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/detail':'http://localhost:3000'
    }
  },
  plugins: [react()],
})

// A proxy server acts as a middleman btw front and back and helps route request from the front to the back without exposing the backend'port to the browser
