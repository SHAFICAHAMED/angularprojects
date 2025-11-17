// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'window', // Fix for Node.js libraries expecting global
  },
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      buffer: 'buffer',
    },
  },
});
