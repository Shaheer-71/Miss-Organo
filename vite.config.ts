import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'import.meta.env.VITE_HOST': JSON.stringify(process.env.VITE_HOST),
    'import.meta.env.VITE_KEY': JSON.stringify(process.env.VITE_KEY),
    'import.meta.env.VITE_CLOUD': JSON.stringify(process.env.VITE_CLOUD),
    'import.meta.env.VITE_PRESET': JSON.stringify(process.env.VITE_PRESET),
  },
});