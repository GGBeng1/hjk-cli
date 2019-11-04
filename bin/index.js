#! /usr/bin/env node

/*
 * Author : GGbeng
 * Time : 2019-01-14
 */

// 引入依赖
let program = require("commander")
let vfs = require("vinyl-fs")
let through = require("through2")
const chalk = require("chalk")
const fs = require("fs-extra")
const path = require("path")

// 定义版本号以及命令选项
program
  .allowUnknownOption()
  .version("1.3.1")
  .description("基于vue2.0+ webpack4.0+ 的脚手架")

program
  .command("init <dir>")
  .description("创建一个新的  Vue项目骨架")
  .action(function(dir) {
    // 获取将要构建的项目根目录
    let projectPath = path.resolve(dir)
    // 获取将要构建的的项目名称
    let projectName = path.basename(projectPath)

    console.log(`Start to init a project in ${chalk.green(projectPath)}`)
    console.log(`Your Project Name ${chalk.green(dir)}`)
    // 根据将要构建的项目名称创建文件夹
    fs.ensureDirSync(projectName)

    // 获取本地模块下的dist目录
    let cwd = path.join(__dirname, "../dist")

    // 从dist目录中读取除node_modules目录下的所有文件并筛选处理
    vfs
      .src(["**/*", "!node_modules/**/*"], { cwd: cwd, dot: true })
      .pipe(
        through.obj(function(file, enc, callback) {
          if (!file.stat.isFile()) {
            return callback()
          }

          this.push(file)
          return callback()
        })
      )
      // 将从dist目录下读取的文件流写入到之前创建的文件夹中
      .pipe(vfs.dest(projectPath))
      .on("end", function() {
        console.log(chalk.green("Installing packages..."))

        // 将node工作目录更改成构建的项目根目录下
        process.chdir(projectPath)

        // 执行安装命令
        require("../lib/install")
      })
      .resume()
  })

program
  .command("start")
  .description("运行开发环境 基于webpack-server")
  .action(function name() {
    require("../lib/dev")
  })

program
  .command("build")
  .description("运行生产环境 对项目进行打包")
  .action(function name() {
    require("../lib/build")
  })

program.parse(process.argv)

program.on("--help", () => {
  console.log("  Examples:")
  console.log()
  console.log(
    chalk.gray("    # create a new project with an official template")
  )
  console.log("    $ hjk init my-project")
  console.log("    $ cd my-project ")
  console.log("    $ hjk start ")
  console.log("    $ hjk build ")
})

function help() {
  program.parse(process.argv)
  if (program.args.length < 1) return program.help() //如果没有输入参数，终端显示帮助
}
help()
