export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cardpr',
    htmlAttrs: {
      lang: 'en'
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
  ],
  // auth:
  auth: {
    strategies: {
      local: {
        token: {
          required: false,
          type: false
        },
        // cookie: {
        //   // (optional) If set we check this cookie exsistence for loggedIn check
        //   name: 'XSRF-TOKEN',
        // },
        endpoints: {
          // (optional) If set, we send a get request to this endpoint before login
          // csrf: { url: '/csrf'/*, method: 'get', propertyName: 'data.token'*/ },
          login: { url: '/login', method: 'patch' },
          // refresh: { url: '/refresh', method: 'post' },
          user: { url: '/me', method: 'get' },
          logout: { url: '/logout', method: 'post' },
        }
      },
    }
  },
  // axios:
  axios : {
    credentials: true,
    withCredentials: true,
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL || 'http://localhost:5000/api/v01',
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
