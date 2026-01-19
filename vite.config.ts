import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig(async ({mode}) => {
  return {
    plugins: [
      solid(),
      tailwindcss()
    ],
    assetsInclude: ['**/*.svg'],
    base: mode === "prod" ? '/gogma-tracker/' : './',
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  }
})