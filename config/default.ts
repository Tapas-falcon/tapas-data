const defaultProxyConfig = {
    '/': {
        target: 'http://localhost:4080', //'http://47.120.65.56:8069',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    },
}

const config = {
    proxy: defaultProxyConfig
}

module.exports = config;
