import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@container': path.resolve(__dirname, 'src/container'),
      '@AdminScreen': path.resolve(__dirname, 'src/container/AdminScreen'),
      '@CandidateScreen': path.resolve(__dirname, 'src/container/CandidateScreen'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
})
