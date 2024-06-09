// webpack.config.js

const mode = process.env.WEBPACK_SERVE ? 'development' : 'production';

module.exports = {
  // Otras configuraciones de Webpack...
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
            plugins: [
                // Otros plugins...
                process.env.NODE_ENV === 'development' && new ReactRefreshWebpackPlugin(),
              ].filter(Boolean),
          },
        },
      },
      // Otras reglas...
    ],
  },
  // Otras configuraciones de Webpack...
};
