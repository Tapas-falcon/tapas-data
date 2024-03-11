const path = require('path')
 
module.exports = {
  output: 'standalone',
  transpilePackages: ['ahooks'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n: {
    locales: ['en', 'es', 'zh'],
    defaultLocale: 'es'
  }
}
