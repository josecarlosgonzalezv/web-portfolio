import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import { checker } from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
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
    sourcemap: false,
    copyPublicDir: true,
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'chunks/[name]-[hash].js',
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          vuetify: ['vuetify'],
          motion: ['@vueuse/motion'],
        },
      },
    },
  },
});
