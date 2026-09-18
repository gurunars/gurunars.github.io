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
    // The devsite container's static IP on the isolated compose network
    // (see compose.yaml); published to the host as 127.0.0.1:8000 only.
    host: "10.213.87.10",
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
