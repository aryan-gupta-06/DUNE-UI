import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
    server:{
    proxy:{
      '/api':'http://localhost:3000',
      }
    },
  plugins: [react(), tailwindcss()]
=======

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
>>>>>>> baa4868c233b9abe064ec583356de8566d8fd015
})
