// babel.config.js

module.exports = function (api) {
    api.cache(true);

    const presets = ['@babel/preset-env', '@babel/preset-react'];
    const plugins = [];

    if (process.env.NODE_ENV === 'development') {
      // Solo agregamos el plugin react-refresh/babel en entornos de desarrollo
      plugins.push('react-refresh/babel');
    }

    return {
      presets,
      plugins,
      // Excluir los archivos específicos del proceso de react-refresh/babel
      ignore: [/NavBar\.js$/, /LoginComponent\.js$/, /EditarUsuario\.js$/, /VentanaTres\.js$/]
    };
  };