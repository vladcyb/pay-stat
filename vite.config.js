import path from 'path'

/** @type {import('vite').UserConfig} */
export default {
  root: path.resolve(__dirname, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
  },
  server: {
    port: 3000,
  },
}
