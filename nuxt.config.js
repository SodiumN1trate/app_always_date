export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'always_date',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './assets/sass/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/echo.js' },
    { src: '~/plugins/permissions.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  extractCSS: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next'
  ],
  env: {
    API_ADDRESS: process.env.API_ADDRESS
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_ADDRESS
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: null,
    loaders: {
      scss: { sourceMap: false },
      vue: { cacheBusting: false }
    }
  },

  router: {
    middleware: ['auth']
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_ADDRESS
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_ADDRESS
    }
  },

  auth: {
    redirect: {
      login: '/',
      callback: false,
      home: false
    },
    strategies: {
      local: {
        token: {
          required: true,
          type: 'Bearer',
          property: 'token'
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: process.env.API_ADDRESS + '/callback-url', method: 'GET' },
          logout: { url: process.env.API_ADDRESS + '/logout', method: 'GET' },
          user: { url: process.env.API_ADDRESS + '/me', method: 'GET', propertyName: false }
        }
      }
    }
  }
}
