import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites from a /<repo-name>/ subpath, so the
// build base needs to match that when deploying there. Local dev/preview
// stays at root.
export default defineConfig({
  plugins: [react()],
  base: process.env.DEPLOY_TARGET === 'gh-pages' ? '/krishika-birthday-website/' : '/',
})
