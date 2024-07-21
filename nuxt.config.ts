export default defineNuxtConfig({
    devtools: {enabled: true},
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
        '@nuxtjs/color-mode',
        "@nuxtjs/leaflet"
    ],
    shadcn: {
        prefix: '',
        componentDir: './components/ui'
    },
    pinia: {
        storesDirs: ['./stores/**'],
    },
    devServer: {
        port: 5050
    },
    colorMode: {
        classSuffix: ''
    },
    runtimeConfig: {
        public: {
            baseUrl: process.env.NUXT_BASE_URL
        }
    }
})