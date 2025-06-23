import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react()
  ],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      '#styles/*': path.resolve(__dirname, 'src/styles'),
      '#routes/*': path.resolve(__dirname, 'src/routes'),
      '#core/*': path.resolve(__dirname, 'src/modules/Core'),
      '#categories/*': path.resolve(__dirname, 'src/modules/Categories'),
      '#timesheets/*': path.resolve(__dirname, 'src/modules/Timesheets'),
      "#breakdown/*": path.resolve(__dirname, 'src/modules/Breakdown'),
    }
  }
});
