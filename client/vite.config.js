import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5000', // URL do seu servidor backend
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
  server: {
    //proxy: null, // Remova ou ajuste o proxy para não interferir no build
    headers: {
      'Cross-Origin-Opener-Policy': 'unsafe-none',
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});