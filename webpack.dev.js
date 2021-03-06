const path = require('path')
const PostCSSPresetEnv = require('postcss-preset-env')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  watch: true,
  stats: { colors: true },
  // Can't use faster eval due to a bug with MiniCssExtractPlugin
  // see https://github.com/webpack-contrib/mini-css-extract-plugin/issues/29
  devtool: 'cheap-module-source-map',
  entry: [
    path.resolve(__dirname, 'src/index.js'),
    path.resolve(__dirname, 'src/styles/index.scss'),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: '/public/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // new BundleAnalyzerPlugin(),
    // Will create a `webpack.njk` with the css/jss files
    // that then gets picked up by eleventy
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'webpack.html'),
      filename: path.resolve(__dirname, '_includes/webpack.njk'),
      // Hash is used for cache busting the generated webpack.html
      // while keeping the same file name in the output
      hash: true,
      inject: false,
    }),
    // new FaviconsWebpackPlugin({
    //   logo: './logo.png',
    //   cache: false,
    //   outputPath: 'favicons',
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // Does not respect devtools option
            // https://github.com/webpack-contrib/css-loader/issues/622
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [PostCSSPresetEnv],
              // Does not respect devtools option
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[contenthash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
}
