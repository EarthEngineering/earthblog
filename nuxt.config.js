const builtAt = new Date().toISOString()
const path = require('path')
const { I18N } = require('./locales/i18n-nuxt-config')
import blogsEn from './contents/en/blogsEn.js'
import blogsEs from './contents/es/blogsEs.js'
import blogsCn from './contents/cn/blogsCn.js'
import blogsJa from './contents/ja/blogsJa.js'

const productionUrl = {
  en: "/en",
  es: "/es",
  cn: "/cn",
  ja: "/ja"
};
const baseUrl = 'https://blog.earth.engineering';

module.exports = {
  env: {
    baseUrl,
    productionUrl
  },
  head: {
    title: 'EARTH | A new type of network for a new type of world',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { name: 'theme-color', content: '#27ae60' },
      { name: 'robots', content: 'index, follow' },
      { name: 'twitter:title', content: 'EARTH Blog' },
      { name: 'twitter:description', content: 'A new type of network for a new type of world.'},
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@earth_engineer' },
      { name: 'twitter:image', content: 'https://blog.earth.engineering/meta_640.png' },
      { name: 'twitter:image:alt', content: 'EARTH\'s logo' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@earth_engineer' },
      { name: 'og:title', content: 'EARTH | A new type of network for a new type of world.' },
      { name: 'og:description', content: 'A new type of network for a new type of world.' },
      { name: 'og:url', content: 'https://blog.earth.engineering' },
      { name: 'og:image', content: 'https://blog.earth.engineering/meta_640.png' },
      { property: 'og:type', content: 'website' },
      { property: 'og:updated_time', content: builtAt }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'mask-icon', type: 'image/png', href: '/favicons/safari-pinned-tab.svg', color: '#27ae60' },
      { rel: 'manifest', href: '/manifest.json' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#27ae60',
    height: '3px'
  },
  /*
  ** Build configuration
  */
  css: [
    'normalize.css/normalize.css',
    '@/assets/css/main.scss'
  ],

  build: {
    extend (config) {
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/i')
      config.module.rules.splice(config.module.rules.indexOf(rule), 1)

      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'contents'),
        options: {
          vue: {
            root: "dynamicMarkdown"
          }
        }
      }, {
        test: /\.(jpe?g|png)$/i,
        loader: 'responsive-loader',
        options: {
          placeholder: true,
          quality: 60,
          size: 1400,
          adapter: require('responsive-loader/sharp')
        }
      }, {
        test: /\.(gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      });
    }
  },
  plugins: ['~/plugins/lazyload', '~/plugins/globalComponents', { src: '~plugins/ga.js', ssr: false }],
  modules: [  
    '@nuxtjs/style-resources',
    ['nuxt-i18n', I18N],
    'nuxt-webfontloader'
  ],

  styleResources: {
    scss: [
      '@/assets/css/utilities/_variables.scss',
      '@/assets/css/utilities/_helpers.scss',
      '@/assets/css/base/_grid.scss',
      '@/assets/css/base/_buttons.scss'
    ],
  },

  webfontloader: {
    custom: {
      families: ['Graphik', 'Tiempos Headline'],
      urls: ['/fonts/fonts.css']
    }
  },

  generate: {
    routes: [
    '/es', '/cn', '/ja', '404'
    ]
    .concat(blogsEn.map(w => `/post/${w}`))
    .concat(blogsEs.map(w => `es/post/${w}`))
    .concat(blogsCn.map(w => `cn/post/${w}`))
    .concat(blogsJa.map(w => `ja/post/${w}`))
  }
}
