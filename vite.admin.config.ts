import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { load } from 'js-yaml'
import { defineConfig, type Plugin } from 'vite'
import svgr from 'vite-plugin-svgr'

const PORTFOLIO_FILE = fileURLToPath(new URL('public/portfolio.yaml', import.meta.url))

// GET /api/portfolio  -> the raw YAML document
// PUT /api/portfolio  -> replace the YAML document (rejected unless it parses)
const portfolioApi = (): Plugin => ({
  name: 'portfolio-api',
  configureServer(server) {
    server.middlewares.use('/api/portfolio', (req, res) => {
      const fail = (code: number, message: string) => {
        res.statusCode = code
        res.end(message)
      }
      if (req.method === 'GET') {
        readFile(PORTFOLIO_FILE, 'utf8')
          .then((text) => {
            res.setHeader('Content-Type', 'text/yaml')
            res.end(text)
          })
          .catch((err) => fail(500, String(err)))
        return
      }
      if (req.method === 'PUT') {
        const chunks: Buffer[] = []
        req.on('data', (chunk) => chunks.push(chunk))
        req.on('end', () => {
          const text = Buffer.concat(chunks).toString('utf8')
          try {
            load(text)
          } catch (err) {
            fail(400, `Not valid YAML: ${err}`)
            return
          }
          writeFile(PORTFOLIO_FILE, text)
            .then(() => {
              res.statusCode = 204
              res.end()
            })
            .catch((err) => fail(500, String(err)))
        })
        return
      }
      fail(405, 'Method not allowed')
    })
  },
})

export default defineConfig({
  root: 'admin',
  // The devsite's vite uses node_modules/.vite; without a separate cache dir
  // the two dev servers corrupt each other's pre-bundled deps (504s).
  cacheDir: fileURLToPath(new URL('node_modules/.vite-admin', import.meta.url)),
  publicDir: fileURLToPath(new URL('public', import.meta.url)),
  plugins: [react(), svgr(), portfolioApi()],
  server: {
    // The admin container's static IP on the isolated compose network
    // (see compose.yaml); reachable only through traefik on 127.0.0.1:8088.
    host: '10.213.87.12',
    port: 8010,
    strictPort: true,
    // Edits made on the macOS host do not emit inotify events inside the
    // podman VM's bind mount, so the watcher must poll.
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
})
