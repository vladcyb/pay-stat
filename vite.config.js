import path from 'path'

/** @type {import('vite').UserConfig} */
export default {
  root: 'public',
  base: '/pay-stat',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
}
