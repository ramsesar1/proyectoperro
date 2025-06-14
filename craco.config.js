// craco.config.js
module.exports = {
  webpack: {
    alias: {
      'path': 'path-browserify',
      'zlib': 'browserify-zlib',
      'querystring': 'querystring-es3',
      'stream': 'stream-browserify',
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        'path': require.resolve('path-browserify'),
        'zlib': require.resolve('browserify-zlib'),
        'querystring': require.resolve('querystring-es3'),
        'stream': require.resolve('stream-browserify'),
      };

      // Agregar esta configuración para permitir conexiones de cualquier host
      webpackConfig.devServer = {
        ...webpackConfig.devServer,
        allowedHosts: 'all',
      };

      return webpackConfig;
    },
  },
};