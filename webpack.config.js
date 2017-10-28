const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('style.css');
let config = {
  entry: ["babel-polyfill",'./client/index.js'],
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: 'index_bundle.js'
  },
  devServer: {
    host: "0.0.0.0"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      cmp: path.resolve(__dirname,'./client/componentes')
    }
    /*modules: [
      path.resolve('./client'),
      path.resolve('./node_modules')
    ]*/
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: 'css-loader', options: {modules: true, localIdentName: '[name]__[local]___[hash:base64:5]', sourceMap: true}},
            {loader: 'sass-loader', options: {/*sourceMap: true*/}}
          ]
        }) 
      },
      { test: /\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: 'css-loader', options: {modules: true, localIdentName: '[name]__[local]___[hash:base64:5]', sourceMap: true}}
          ]
        }) 
      },
      {
        test: /\.(woff|png|gif)$/,
        loader: 'url-loader',
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig,
            extractCSS
  ]
}
module.exports = config
if (process.env.NODE_ENV === 'production') {
  console.log('compilación producción')
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin() // call the uglify plugin
  );
  module.exports.plugins.push(
    new CopyWebpackPlugin([{ from: 'client/img/**/*'/*, to: 'client/img' */}])
  );
}