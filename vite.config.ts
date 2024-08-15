import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { checker } from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.json',
      },
      vueTsc: {
        tsconfigPath: './tsconfig.json',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/web-portfolio/' : '/',
  build: {
    target: 'esnext',
    minify: true,
    sourcemap: true,
    copyPublicDir: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'chunks/[name][extname]',
      },
    },
  },
  define: {
    'import.meta.env.MODE': '"production"',
  },
});
