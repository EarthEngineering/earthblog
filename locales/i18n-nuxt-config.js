const I18N = {
    useCookie: false,
    alwaysRedirect: true,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en/index.js'
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es/index.js'
      },
      {
        code: 'cn',
        iso: 'zh-CN',
        name: 'Chinese',
        file: 'cn/index.js'
      },
      {
        code: 'ja',
        iso: 'ja-JA',
        name: 'Japanese',
        file: 'ja/index.js'
      }
    ],
    lazy: true,
    seo: false,
    langDir: '/locales/',
    defaultLocale: 'en',
    parsePages: false
  }
  
  module.exports = {
    I18N
  }