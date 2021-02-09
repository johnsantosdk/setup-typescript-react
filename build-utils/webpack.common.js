const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '*'],
    alias: {
      modules: path.resolve(__dirname, 'node_modules/')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, './public'),
    compress: true,
    port: 3000
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // loader: [ 'babel-loader', 'standard-loader' ]
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'standard-loader'
          }
        //   options: {
        //     presets: [
        //       '@babel/preset-env',
        //       '@babel/preset-react'
        //     ]
        //   }
        ],
      },
      {
        test: /\.ts(x?)$/,
        use: [
           {
            loader: 'ts-loader'
          },
           {
            loader: 'standard-loader',
            options: {
            parser: 'babel-eslint',
          }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
        use: 'file',
      },
      // {
      // 	enforce: "pre",
      // 	test: /\.js$/,
      // 	loader: "source-map-loader"
      // }
    ],
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'App Todo',
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
  ],
  //! There are same options to set devtool that which have its pros and cons
  // devtool: 'source-map'
};
