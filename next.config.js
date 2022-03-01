/* globals __dirname, require, module */
const path = require('path')
const withStylus = require('@zeit/next-stylus')


let config = {
  webpack5: false,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'utils': path.join(__dirname, 'src', 'utils'),
      'stores': path.join(__dirname, 'src', 'stores'),
      'components': path.join(__dirname, 'src', 'components'),
    }
    return config
  }
}

config = withStylus({
  ...config,
  cssModules: true
})

module.exports = config
