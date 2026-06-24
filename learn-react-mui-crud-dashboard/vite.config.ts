/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// Replaces the old CRA + CRACO setup. The CRACO webpack overrides are no longer
// needed: Vite serves native ESM (so MUI v9's extensionless `.mjs` imports just
// work, no `fullySpecified` patch), and `vite-plugin-checker` runs `tsc` in a
// worker so the production build still fails on type errors.
export default defineConfig({
  plugins: [
    react(),
    // Surface type errors in the dev overlay and fail `vite build` on them.
    checker({ typescript: true }),
  ],
  resolve: {
    // Honour `baseUrl: src` from tsconfig.json so `src`-relative absolute imports resolve.
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
    open: false,
  },
  build: {
    // Keep CRA's output dir so the existing .gitignore (/build) still applies.
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // No test files exist yet — don't fail the run until some are added.
    passWithNoTests: true,
  },
});