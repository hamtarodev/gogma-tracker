import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solid(),
    tailwindcss()
  ],
  assetsInclude: ['**/*.svg'],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
