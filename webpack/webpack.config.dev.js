var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {merge} = require("webpack-merge")
const common = require("./webpack.config.common")
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');

const webpack_config = merge(common,
  {
    mode: 'development',
    entry: './bonaApp/main.ts',
    output: {
      path: path.resolve(__dirname, '../docs'),
      filename: 'build-bonaApp.js',
      clean: true,
      publicPath: '/vue-erdjs/'
    },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Vue Erd bona Parks App',
      template: path.resolve(__dirname, '../bonaApp/template.html'),
      showErrors: true
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/_docs/",
          to: "plugin/"
        }
      ],
    }),
    new FileManagerPlugin({
      events: {
        onEnd: [{
          copy: [
            {
              source: 'docs/index.html',
              destination: 'docs/404.html'
            }
          ]
        }]
        }
      })
  ],
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: {
      index: '/vue-erdjs/index.html'
    },
  },
  devtool: 'inline-source-map'
  }
)

if (process.env.BUILD_TARGET === 'github') {
  webpack_config.optimization = {
    minimize: true,
    usedExports: false,
    minimizer: [
      new TerserPlugin({
        include: /\.js$/,
        extractComments: false,
        terserOptions: {
            output: {
              comments: false,
          },
        }
      }),
    ]
  }
}

module.exports = webpack_config;
