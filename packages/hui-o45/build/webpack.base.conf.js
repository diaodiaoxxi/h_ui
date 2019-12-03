const path = require('path')
const config = require('./config')
const utils = require('./utils')
const projectRoot = path.resolve(__dirname, '../')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const vueConf = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// path：用来存放打包后文件的输出目录 
// publicPath：指定资源文件引用的目录 
module.exports = {
  entry: {
    app: './example/main.js',
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js',
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'Vue': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, '../src'),
      'example': path.resolve(__dirname, '../example'),
      'assets': path.resolve(__dirname, '../example/assets'),
      'components': path.resolve(__dirname, '../example/components')
    }
  },
  externals: {
    // vue: {
    //   root: 'vue',
    //   commonjs: 'vue',
    //   commonjs2: 'vue',
    //   amd: 'vue'
    // }
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
              css: 'vue-style-loader!css-loader',
              scss: 'vue-style-loader!css-loader!sass-loader'
            },
            postLoaders: {
              html: 'babel-loader'
            }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
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
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,//假如图片小于10kb打包到js（base64）里面，大于10kb打包到img（url-loader）下面
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      // url-loader 加载文件，大小大于 limit 设定值会压缩，小于 limit 值直接 base64 编码
      {
        test: /\.(woff2|woff?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000000,
          name: utils.assetsPath('fonts/[name].[hash:5].[ext]')
        }
      }

    ]
  }
}
