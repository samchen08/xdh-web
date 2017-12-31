'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

// 预览服务器
const server = require('pushstate-server')

// opn模块, 用作自动打开浏览器
const opn = require('opn')

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

// export promise
// 发布脚本需要在编译完成后还原config.js
module.exports = new Promise(function (resolve, reject) {
  rm(path.join(config.build.assetsRoot), err => {
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.cyan('  Build complete.\n'))
      if (process.env.npm_config_preview) {
        let port = 9528,
          uri = `http://localhost:${port}${config.build.assetsPublicPath}`
        server.start({
          port: port,
          directory: './dist',
          file: `/index.html`
        })
        opn(uri)
        console.log('> Listening at ' + `http://localhost:${port}` + '\n')
      }
      resolve()
    })
  })
})
