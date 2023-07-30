export default defineNuxtConfig({
  ssr: false,
  modules: [
    'nuxt-electron',
  ],
  electron: {
    renderer: {},
  },
})
