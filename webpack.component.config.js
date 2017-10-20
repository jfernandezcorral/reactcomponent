const path = require('path');
const webpack = require('webpack');
let config = {
  entry: ['./client/index2.js'],
  output: {
    path: path.resolve(__dirname,'./lib'),
    libraryTarget: 'umd',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
      cmp: path.resolve(__dirname,'./client/componentes')
    }
  },
  externals : {
        'react': 'react',
        'react-dom': 'react-dom'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, 
        use: [
            'style-loader',
            {loader: 'css-loader', options: {modules: true, localIdentName: '[name]__[local]___[hash:base64:5]', sourceMap: true}},
            {loader: 'sass-loader', options: {/*sourceMap: true*/}}
          ]
      },
      { test: /\.css$/, 
        use: [
            {loader:'style-loader'},
            {loader: 'css-loader', options: {modules: true, localIdentName: '[name]__[local]___[hash:base64:5]', sourceMap: true}}
          ]
      }
    ]
  },
  plugins: []
}
module.exports = config
if (process.env.NODE_ENV === 'production') {
  console.log('compilación producción')
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin() // call the uglify plugin
  );
}