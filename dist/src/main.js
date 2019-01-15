import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//axios：Ajax请求
import axios from "./axios.js";
import hjk from '@/components/index.js'
//是否为生产环境
Vue.config.productionTip = false
//use
Vue.use(ElementUI);
Vue.use(hjk);

//prototype
Vue.prototype.$http = axios;

//Vue实例
window.bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
