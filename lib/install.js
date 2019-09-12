/*
 * Author : GGbeng
 * Time : 2019-01-14
 */

// 引入依赖
const which = require('which')
const chalk = require('chalk')

const childProcess = require('child_process')

// 开启子进程来执行npm install命令
function runCmd(cmd, args, fn) {
  args = args || []
  let runner = childProcess.spawn(cmd, args, {
    stdio: 'inherit'
  })

  runner.on('close', function(code) {
    if (fn) {
      fn(code)
    }
  })
}

// 查找系统中用于安装依赖包的命令
function findNpm() {
  let npms = ['yarn', 'cnpm', 'npm']
  for (let i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i])
      console.log(chalk.green('use npm: ' + npms[i]))
      return npms[i]
    } catch (e) {}
  }
  throw new Error(chalk.red('please install npm or yarn'))
}

let npm = findNpm()
runCmd(which.sync(npm), ['install'], function() {
  console.log('')
  console.log(chalk.blue('cd Your Project Name'))
  console.log(chalk.blue('npm run serve'))
})
