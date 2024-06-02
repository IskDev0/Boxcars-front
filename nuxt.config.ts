export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@formkit/auto-animate',
    '@nuxt/image',
    'nuxt-icon',
    '@nuxtjs/i18n',
    'nuxt-swiper',
    '@vueuse/nuxt',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})