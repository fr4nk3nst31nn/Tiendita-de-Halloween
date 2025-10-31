const path = require('path');

module.exports = function(config) {
  const bravePath = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

  config.set({
    hostname: '127.0.0.1',
    frameworks: ['jasmine'],
    client: {
      jasmine: {
        random: false
      }
    },
    
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-webpack',
      'karma-coverage'
    ],

    files: [
      'src/tests/*.spec.js',
      'src/hooks/tests/*.spec.js'
    ],
    
    preprocessors: {
      'src/tests/*.spec.js': ['webpack'],
      'src/hooks/tests/*.spec.js': ['webpack'],
      'src/**/*.js': ['coverage'],
      'src/**/*.jsx': ['coverage']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'react': path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom')
        }
      }
    },

    reporters: ['progress', 'coverage'],
    
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html-report' },
        { type: 'text-summary' }
      ]
    },

    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    },

    singleRun: true,
    autoWatch: false,
  });
};