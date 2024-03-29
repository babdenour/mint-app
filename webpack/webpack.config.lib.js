var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require("webpack-merge")
const common = require("./webpack.config.common")

module.exports = merge(common, {
  entry: './bonaApp/main.ts',
  output: {
    clean: true,
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: {
      name: 'VueErd',
      type: 'umd',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vue Erd bona Parks App',
      template: path.resolve(__dirname, '../bonaApp/template.html'),
    }),
  ],
  externals: {
    'vue': {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    },
    '@elrondnetwork/erdjs': '@elrondnetwork/erdjs'
  },
  devtool: false,
  optimization: {
    minimize: true,
    usedExports: false,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
          }
        }
      }),
    ]
  },
}
)
