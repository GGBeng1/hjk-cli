#! /usr/bin/env node

/*
 * Author : GGbeng
 * Time : 2019-01-17
 */
// 引入依赖
const which = require('which')
const chalk = require('chalk')

const childProcess = require('child_process')

// 开启子进程来执行npm run build命令
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

// 查找系统用于生成环境命令
function findNpm() {
  let npms = ['yarn', 'npm', 'tnpm', 'cnpm']
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
runCmd(which.sync(npm), ['run', 'build'], function() {
  console.log('')
})
