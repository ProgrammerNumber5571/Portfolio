import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/,
// so the build needs that subpath as its base or every asset URL resolves to
// the domain root and 404s. Dev stays on '/' so localhost URLs stay short.
// Deploying to a custom domain or a <user>.github.io repo? Set this to '/'.
const REPO_BASE = '/Portfolio/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? REPO_BASE : '/',
  plugins: [react()],
  server: { port: 5180 },
}))
