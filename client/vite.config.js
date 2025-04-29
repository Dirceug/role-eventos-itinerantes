import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // URL do seu servidor backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
  // ,
  // build: {
  //   outDir: path.resolve(__dirname, '../dist'), // Use path.resolve para garantir um caminho absoluto
  // }
});