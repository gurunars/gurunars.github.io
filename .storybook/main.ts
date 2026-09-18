import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.story.tsx',
    '../src/**/story.tsx',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: (config) => ({
    ...config,
    server: {
      ...config.server,
      // Edits made on the macOS host do not emit inotify events inside the
      // podman VM's bind mount, so the watcher must poll.
      watch: {
        usePolling: true,
        interval: 300,
      },
    },
  }),
}

export default config
