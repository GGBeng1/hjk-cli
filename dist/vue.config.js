module.exports = {
    lintOnSave: false,
    devServer: {
        open: true,
        https: false,
        port: 9527,
        hotOnly: false,
        // 设置代理
        // proxy: {
        //     "^/hid": {
        //         // 域名
        //         target: "http://localhost:8080",
        //         // 是否启用websockets
        //         ws: true,
        //         changOrigin: true,
        //         pathRewrite: {
        //             "^/hid/": "/hid/"
        //         }
        //     }
        // }
    },
    assetsDir:'static',
    pages: {
        index: {
            // page 的入口
            entry: "src/main.js",
            // 模板来源
            template: "public/index.html", // 这里用来区分加载那个 html
            // 在 dist/index.html 的输出
            filename: "index.html",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "index"]
        }
    },
    configureWebpack: {
        externals: {
            //忽略后需要在index.html cdn引入，主要用于减少体积，加快首页加载速度
            // vue: "Vue",
            // vuex: "Vuex",
            // "vue-router": "VueRouter"
        }
    }
};