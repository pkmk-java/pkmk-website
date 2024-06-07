import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  theme: {
    backgroundColor: {
      'main': "#ECB176",
    },
    colors: {
      'main-teks': "#6F4E37"
    }
  }
})
