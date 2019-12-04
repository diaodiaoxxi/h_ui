const path = require('path')
const config = require('./config')
const utils = require('./utils')
const projectRoot = path.resolve(__dirname, '../')
const vueConf = require('./vue-loader.conf')
const assetsPath = function (_path) {
  var assetsSubDirectory = ''
  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
  devtool: '#inline-source-map',
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', 'scss'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'example': path.resolve(__dirname, '../example'),
      'assets': path.resolve(__dirname, '../example/assets'),
      'components': path.resolve(__dirname, '../example/components')
    }
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader'
            },
            preLoaders: {
              js: 'istanbul-instrumenter-loader?esModules=true'
            }
          }}]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: ['istanbul']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      { test: /\.(html|tpl)$/, loader: 'html-loader' },
      {
        test: /\.(woff2|woff?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000000,
          name: assetsPath('fonts/[name].[hash:5].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: assetsPath('img/[name].[ext]')
        }
      }]
  },
  devServer: {
    stats: "errors-only"
  }
}
