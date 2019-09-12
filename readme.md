# hjk-cli 开发规范

## 首次启动

1. 首先需要先安装 node 环境, win/macOS 登录 nodejs.org 下载对应包安装, 安装后在命令行输入 `node -v`提示出版本号之后表示安装成功, 国内建议使用`yarn`, `hjk-cli`优先使用的也是`yarn`
2. 登录`https://yarnpkg.com/zh-Hans/` 安装 yarn
3. 使用 yarn 在命令行输入 `yarn add global hjk-cli`
4. 初始化项目： `hjk init your project name`
5. `cd your project name`
6. 开发环境 `hjk start`
7. 生产环境 `hjk build`
   PS：为了避免端口号冲突，默认启动端口号：9527

## 项目结构

```
   ├── public                          静态文件（不参与编译）
   │   ├── index.html                     入口页
   │   └── logo_hjk.ico                   浏览器icon
   ├── src                             项目源码目录
   │   ├── main.js                         入口js文件
   │   ├── App.vue                         根组件
   │   ├── components                      公共组件目录
   │   ├── assets                          资源目录，这里的资源会被wabpack构建
   │   │   ├── css                         公共样式文件目录
   │   │   ├── js                          公共js文件目录
   │   │   └── img                         图片存放目录
   │   ├── route.js                        前端路由
   │   ├── store.js                        状态存储仓库
   │   └── views                           页面目录
   │       ├── login.vue
   │       └── home.vue
   ├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
   └── vue.config.js                   webpack配置
```

## .vue 文件的基本结构

> ### 骨架

```
template>
  <div>
    <!--必须在div中编写页面-->
  </div>
</template>
<script>
  export default {
    components : {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    mounted() {

    }
 }
</script>
<!--声明语言，并且添加scoped-->
<style lang="scss">

</style>
```

> ### 声明顺序
>
> - components
> - props
> - data
> - computed
> - methods
> - created
> - mounted
> - watch
>
> PS: 声明周期可以按照执行顺序添加

## 命名规范

> ### 组件命名规范
>
> 当注册组件 (或者 prop) 时，可以使用 kebab-case (短横线分隔命名)、camelCase (驼峰式命名) 或 PascalCase (单词首字母大写命名)。
> PascalCase 是最通用的声明约定而 kebab-case 是最通用的使用约定。

> ### 变量命名规范
>
> - 坚持语义化开发
> - 对于 url 等易变变量应从外部引入，方便修改
> - 尽量统一放在命名空间下，使得变量有迹可查

> ### 方法命名规范
>
> - 语义化开发
> - 以 handler 开头

> ### css 命名规范
>
> - 语义化开发
> - 嵌套组件坚持使用 BEM 规范

## 注释规范

> ### 单行注释
>
> - 普通方法一般使用单行注释// 来说明该方法主要作用

> ### 多行注释

```
组件使用说明，和调用说明
   <!--公用组件：数据表格
      /**
      * 组件名称
      * @module 组件存放位置
      * @desc 组件描述
      * @author 组件作者
      * @date 2019年01月14日
      * @param {Object} [title]    - 参数说明
      * @param {String} [columns] - 参数说明
      * @example 调用示例
      *  <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
          */
       -->
```
