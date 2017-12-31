const program = require('commander')
const fs = require('fs')
const envConfig = require('../config/index.js')
const appConfigPath = 'src/config.js'

program
  .version('1.0.0')
  .option('-f, --config <path>', '配置文件路径')
  .option('-p, --path <path>', '部署服务器虚拟目录')
  .option('-d, --dist <path>', '发布目录')
  .parse(process.argv)

function copyFile (from, to) {
  const content = fs.readFileSync(from, {encoding: 'utf-8'})
  fs.writeFileSync(to, content, {encoding: 'utf-8'})
}

if (program.path) {
  envConfig.build.assetsPublicPath = program.path
}

if (program.dist) {
  envConfig.build.assetsRoot = program.dist
  envConfig.build.index = program.dist + '/index.html'
}

if (program.config) {
  copyFile(appConfigPath, appConfigPath.replace('.js', '.bak.js'))
  copyFile(program.config, appConfigPath)
}

require('../build/build').then(function () {
  // 还原config.js
  copyFile(appConfigPath.replace('.js', '.bak.js'), appConfigPath)
  fs.unlinkSync(appConfigPath.replace('.js', '.bak.js'))
})
