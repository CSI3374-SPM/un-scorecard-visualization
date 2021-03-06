const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['lodash-es', '@bessemer/cornerstone/util', '@bessemer/cornerstone/url', '@bessemer/cornerstone/phone']);
const { parsed: localEnv } = require('dotenv').config();

module.exports = withPlugins([withTM], {
    distDir: 'build',
    env: {
        ...localEnv,
        // GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        config.node = { fs: 'empty' };
        return config
    }
});