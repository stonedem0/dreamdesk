import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
  base: './',
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'dreamdesk.js',
    },
    outDir: 'js',
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
