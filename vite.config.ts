import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/university-progression-calculator-webapp/', 
  plugins: [react()],
})