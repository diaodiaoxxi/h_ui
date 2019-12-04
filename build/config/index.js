// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
module.exports={
	build:{
		env: require('./prod.env'),
		// 编译输入的index.html文件
		index: path.resolve(__dirname, '../../index.html'),
		// webpack输出的目标文件夹路径
		assetsRoot: path.resolve(__dirname,'../../demo'),
		// webpack编译输出的二级文件夹
		assetsSubDirectory: '',
		// webpack编译输出的发布路径
		assetsPublicPath: '/venus/demo/',
		// 使用SourceMap
		productionSourceMap: true,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		// 默认不打开开启gzip模式
		productionGzip: false,
		// gzip模式下需要压缩的文件的扩展名
		productionGzipExtensions: ['js', 'css'],
		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: false
	},
	dev:{
		env: require('./dev.env'),
		port: 8100,
		// webpack编译输出的二级文件夹
		assetsSubDirectory: 'static',
		// webpack编译输出的发布路径
		assetsPublicPath: '/',
		// 启动dev-server之后自动打开浏览器
		autoOpenBrowser: true,
		// 定义 HTTP 代理表，代理到 API 服务器
		proxyTable: {},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		// 是否开启 cssSourceMap
		cssSourceMap: false
	}
}
