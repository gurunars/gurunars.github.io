import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import svgr from "vite-plugin-svgr"
import { defineConfig } from 'vitest/config'

// The portfolio content is fetched at runtime, not imported, so vite does not
// hot-reload it by itself. Trigger a full reload whenever the admin app (or
// anything else) rewrites the YAML.
const reloadOnPortfolioChange = (): Plugin => ({
  name: 'reload-on-portfolio-change',
  configureServer(server) {
    server.watcher.on('change', (file) => {
      if (file.endsWith('public/portfolio.yaml')) {
        server.ws.send({ type: 'full-reload' })
      }
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), svgr(), reloadOnPortfolioChange()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [],
    }
  },
  server: {
    // Loopback, hard-coded: the dev server is never reachable from another
    // machine wherever it is started. In the compose stack it shares the
    // traefik proxy's network namespace, so traefik dials it on this address
    // (see compose.yaml).
    host: "127.0.0.1",
    port: 8000,
    strictPort: true,
    // Edits made on the macOS host do not emit inotify events inside the
    // podman VM's bind mount, so the watcher must poll.
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
})
