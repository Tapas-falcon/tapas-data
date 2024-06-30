const defaultConfig = require('./config/default.ts');

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
    config.resolve.alias['react-native$'] = 'react-native-web';
    config.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules\/@beppla\/components/,
        use: ['source-map-loader'],
    });
    config.resolve.fallback = {
        "crypto": false,
    };

    config.devServer = {
        ...config.devServer,
        proxy: defaultConfig.proxy,
    };

  return config;
};
