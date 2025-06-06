import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'import.meta.env.host': JSON.stringify(process.env.host),
    'import.meta.env.key': JSON.stringify(process.env.key),
    'import.meta.env.cloud': JSON.stringify(process.env.cloud),
    'import.meta.env.preset': JSON.stringify(process.env.preset),
  },
});