"use strict"
const path = require("path")
const utils = require("./utils")
const webpack = require("webpack")
const config = require("../config")
const { merge } = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.conf")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { VueLoaderPlugin } = require("vue-loader")
// const PurifyCSSPlugin = require("purifycss-webpack")
// const glob = require("glob-all")

const env =
  process.env.NODE_ENV === "testing"
    ? require("../config/test.env")
    : require("../config/prod.env")

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   chunks: "initial",
        //   name: "vendors"
        // },
        // "async-vendors": {
        //   test: /[\\/]node_modules[\\/]/,
        //   minChunks: 2,
        //   chunks: "async",
        //   name: "async-vendors"
        // }
        vueBase: {
          name: "vueBase",
          test: (module) => {
            return /vue|vue-router/.test(module.context)
          },
          chunks: "all",
          priority: 9
        },
        base: {
          name: "base",
          test: (module) => {
            return /axios/.test(module.context)
          },
          chunks: "all",
          priority: 8,
          enforce: true
        },
        elementUI: {
          name(module) {
            let packageName = module.context.match(/[\\/]node_modules[\\/]element-ui[\\/](.*?)([\\/]|$)(.*?)([\\/]|$)/)
            if (packageName && packageName[3]){
              packageName ='common'
            }else {
              packageName = packageName[1]
            }
            return `element-ui.${packageName}`
          },
          test:/element-ui/,
          chunks: "all",
          priority: 7,
          enforce: true
        }
      }
    },
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        extractComments: true,
        terserOptions: {
          output: { comments: false },
          compress: {
            drop_console: true,
            drop_debugger: true,
          }
        }
      })
    ],
    runtimeChunk: { name: "runtime" }
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css"),
      // allChunks: true
    }),
    // new PurifyCSSPlugin({
    //   paths: glob.sync([path.join(__dirname, "../src/*/*.vue")])
    // }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: config.build.productionSourceMap
    //     ? { safe: true, map: { inline: false } }
    //     : { safe: true }
    // }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename:
        process.env.NODE_ENV === "testing" ? "index.html" : config.build.index,
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "auto"
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.ids.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file

    // copy custom static assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          to: config.dev.assetsSubDirectory,
          // ignore: [".*"]
        }
      ]
    })
  ]
})
// console.log(webpackConfig);
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin")

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      // filename: "[path][query].gz",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
