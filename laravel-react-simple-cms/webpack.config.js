var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
  entry: './public/frontend/js/admin/index.js',  
  output: {
    chunkFilename: '[id].js',
    crossOriginLoading: "anonymous",
    filename: 'bundle.js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'public', 'dist')
  },  
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/
      },     
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, use: ['url-loader?limit=100000'] }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),
    new Dotenv()
  ],
  resolve : {
    extensions: ['.tsx', '.ts', '.js'],
    alias : {
      css : path.resolve(__dirname, 'public/frontend/css/'),
      images : path.resolve(__dirname, 'public/frontend/images/'),
      constants : path.resolve(__dirname, 'public/frontend/js/admin/constants/'),
      hooks : path.resolve(__dirname, 'public/frontend/js/admin/hooks/'),
      components : path.resolve(__dirname, 'public/frontend/js/admin/components/'),
      libraries : path.resolve(__dirname, 'public/frontend/js/admin/libraries/'),
      utils : path.resolve(__dirname, 'public/frontend/js/admin/utils/'),
      modules : path.resolve(__dirname, 'public/frontend/js/admin/modules/'),
      sample : path.resolve(__dirname, 'public/frontend/js/admin/sample/'),
      handleEvents : path.resolve(__dirname, 'public/frontend/js/admin/handleEvents/'),
      handleValidate : path.resolve(__dirname, 'public/frontend/js/admin/handleValidate/'),
      templates : path.resolve(__dirname, 'public/frontend/js/admin/templates/')
    }
  }
};