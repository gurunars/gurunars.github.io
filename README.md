# Portfolio

## Deployment

Just push to the develop branch and GitHub Actions will do the rest.

## Frontend dev

The toolchain runs inside containers via podman compose — nothing is installed
on the host, and the project directory is bind-mounted into the containers so
all edits are live. Every make target is a single delegated call into the
container's `entrypoint.sh`:

    make install    # install dependencies (regenerates yarn.lock)
    make start      # dev site + storybook + admin behind traefik:
                    #   http://portfolio.localhost:8088
                    #   http://storybook.localhost:8088
                    #   http://admin.localhost:8088   (edit portfolio.yaml in a UI)
    make build      # deployable asset into ./dist
    make build-docs # static storybook into ./storybook-static
    make test       # tsc --noEmit + vitest
    make lint       # biome check
    make fmt        # auto-fix lint/format issues
    make sh         # a shell inside the toolchain container
    make stop       # tear down any running services

Networking: a traefik proxy is the single entry point, published only on the
host's loopback (`127.0.0.1:8088`), routing by hostname (`*.localhost`
resolves to loopback in browsers). Behind it, the dev servers bind hard-coded
static IPs on an isolated compose bridge network (`devnet` in compose.yaml) —
never `0.0.0.0` and never a host interface. Port 8088 (rather than 80) because
macOS only lets unprivileged processes bind low ports on the wildcard
interface, which the loopback-only policy forbids.

### Admin

The admin app (admin/) edits `public/portfolio.yaml` through a tiny GET/PUT
API served by its own vite dev server. Saving rewrites the YAML (in js-yaml's
canonical formatting) and the dev site auto-reloads it. The editor highlights
`#tag` / `#{multi word}` markup inline and previews the CV live as you type.

### Create a new component

    make sh
    yarn plop
