module.exports = {
    // Otras configuraciones de Webpack...
  
    module: {
      rules: [
        // Regla para cargar archivos JS/JSX con react-refresh/babel
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ['react-refresh/babel'],
            },
          },
        },
        // Segunda regla para cargar archivos JS/JSX sin react-refresh/babel
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
            },
          },
        },
      ],
    },
  
    // Otras configuraciones de Webpack...
  };
  