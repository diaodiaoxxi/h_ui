const path = require('path');
const webpack = require('webpack');
const entry = require('./locale');
process.env.NODE_ENV = 'production';

module.exports = {
    entry,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/locale'),
        publicPath: '/dist/locale/',
        filename: '[name].js',
        library: 'h_ui/locale',//requre时候的模块名称
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
};
