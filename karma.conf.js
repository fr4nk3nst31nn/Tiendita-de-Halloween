module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    // Solo carga tests.bundle.js (NO src/**/*.js ni src/**/*.jsx)
    files: [
      'tests.bundle.js'
    ],

    // Solo procesa tests.bundle.js con webpack
    preprocessors: {
      'tests.bundle.js': ['webpack']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: { loader: 'babel-loader' }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            type: 'asset/resource'
          }
        ]
      },
      devtool: 'inline-source-map'
    },

    browsers: ['Chrome'],
    singleRun: false,
    autoWatch: true,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
