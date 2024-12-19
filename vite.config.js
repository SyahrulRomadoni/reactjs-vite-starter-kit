import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// Mendapatkan port dari environment variable atau gunakan default 3000
const PORT = process.env.VITE_PORT || 3000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(PORT, 10),
  },
})
