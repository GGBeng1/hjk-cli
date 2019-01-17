import axios from 'axios';
import store from "./store";
import { Loading } from 'element-ui';
import router from './router.js';
import qs from 'qs';

let $alert = function(message, title, options) {
    window.bus.$alert(message, title, options);
}
let $msgbox = function(options) {
    window.bus.$msgbox(options);
}

let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;

/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
axios.interceptors.request.use(config => {
    let loading = Loading.service({
        fullscreen: true,
        lock: true,
        text: '拼命加载中...',
    })

    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }

    return config
}, error => {
    let loading = Loading.service({});
    loading.close();
    return Promise.reject(error)
})

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(response => {
    let loading = Loading.service({});
    loading.close();

    return response
}, error => {
    let loading = Loading.service({});
    loading.close();
    return Promise.resolve(error)
})

let codeAction = {
    401: () => {
        $alert("当前已经退出登陆", '提示', {
            confirmButtonText: "确定",
            callback: () => {
                router.push({ path: '/' })
            }
        })
    },
    402: ({ config: { url } }) => {
        $alert("无访问权限，路径：" + url, '提示', {
            confirmButtonText: "确定",
            callback: () => {}
        })
    },
    403: ({ config: { url } }) => {
        $alert("无访问权限，路径：" + url, '提示', {
            confirmButtonText: "确定",
            callback: () => {}
        })
    },
    404: ({ config: { url } }) => {
        $alert("资源不存在，路径：" + url, '提示', {
            confirmButtonText: "确定",
            callback: () => {}
        })
    },
    500: ({ data, config: { url } }) => {
        const h = window.bus.$createElement;
        $msgbox({
            title: '提示',
            message: h('div', null, [
                h('span', null, data.message),
                h('el-collapse', null, [
                    h('el-collapse-item', null, [
                        h("div", null, data.data)
                    ]),
                ])
            ]),
            confirmButtonText: '确定'
        })
    }
};
//判断code
function checkStatus(response) {
    let { data, config: { url } } = response;
    if (data) {
        let action = codeAction[data.code];
        if (action) {
            action(response);
            return new Promise(() => {});
        }
    }
    return data;
}

// axios.defaults.baseURL = '/hid'
//设置默认请求头
axios.defaults.headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
}
axios.defaults.timeout = 10000


export default {
    get(url, param) {
        return new Promise((resolve, reject) => {
            if (url instanceof Object && url != null) {
                axios.get(url).then(res => {
                    checkStatus(res)
                    // resolve(res)
                })
                return;
            }
            axios({
                method: 'get',
                url,
                params: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                checkStatus(res)
                // resolve(res)
            })
        })
    },
    //json格式
    postJson(url, param, data) {
        return new Promise((resolve, reject) => {
            if (url instanceof Object && url != null) {
                axios({
                    method: 'post',
                    url: url.url,
                    params: url.param,
                    data: url.data,
                    cancelToken: new CancelToken(c => {
                        cancel = c
                    })
                }).then(res => {
                    checkStatus(res);
                    // resolve(res)
                })
                return;
            }
            axios({
                method: 'post',
                url,
                params: param,
                data,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                // resolve(res)
                checkStatus(res);
            })
        })
    },
    post(url, data, param) {
        let datas = qs.stringify(data)
        return new Promise((resolve, reject) => {
            if (url instanceof Object && url != null) {
                axios({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'post',
                    url: url.url,
                    params: url.param,
                    data: url.data,
                    cancelToken: new CancelToken(c => {
                        cancel = c
                    })
                }).then(res => {
                    // resolve(res)
                    checkStatus(res);
                })
                return;
            }
            axios({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'post',
                url,
                params: param,
                data: datas,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                // resolve(res)
                checkStatus(res);
            }).catch(err => {
                reject(err)
            })
        })
    }
}