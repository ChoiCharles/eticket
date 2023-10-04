import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    proxy: {
      '/api/waiting': {
        target: 'http://localhost:31880',
        rewrite: path_ => path_.replace(/^\/api/, ''),
      },
      '/api/ticketing': {
        target: 'http://localhost:31880',
        rewrite: path_ => path_.replace(/^\/api/, ''),
      },
      '/ws': {
        target: 'ws://localhost:31880',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/api': {
        target: 'http://localhost:38080',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
