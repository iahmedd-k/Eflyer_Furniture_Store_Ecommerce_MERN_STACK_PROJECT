import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ⬅️ import path to use alias

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ⬅️ this enables @/...
    },
  },
})
