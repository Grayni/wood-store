
module.exports = {
  head: {
    titleTemplate: '%s | Flex Wood',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  server: { port: 3002 },

  loading: '~/components/loading.vue',

  router: { trailingSlash: false },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/styles/reset.css',
    '@/assets/styles/fonts.styl',
    '@/assets/styles/variables.styl',
    '@/assets/styles/theme.styl'
  ],

  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/globals'
  ],

  components: true,

  buildModules: [],

  modules: [ '@nuxtjs/axios' ],

  build: {
    transpile: [ /^element-ui/ ],
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },

  env: {
    SITE: 'flex-wood.ru',
    appName: 'Изделия из дерева',
    baseUrl: process.env.BASE_URL
  },

  axios: {
    baseURL: 'http://localhost:3002'
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL ?? 'http://localhost:3002'
    }
  },

  serverMiddleware: [ '~/api/index.js' ],

  telemetry: { enabled: false },

  layoutTransition: {
    name: 'admin',
    mode: 'out-in'
  }
}
