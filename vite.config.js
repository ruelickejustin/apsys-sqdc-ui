import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [svelte()],
  base: '/apsys-sqdc-ui/',   // <- genau so, mit deinem Repo-Namen
  build: { outDir: 'dist' }
})
