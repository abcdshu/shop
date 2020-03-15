//  整个项目的入口文件
import Vue from 'vue'
import App from './App.vue'
import router from '../src/router/index'
import './plugins/element.js'
// 导入全局样式表
import './assets/global.css'
// 导入字体图标（小图标）
import './assets/fonts/iconfont.css'
// 导入axios包
import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入vue-table-with-tree-grid插件
import ZkTable from 'vue-table-with-tree-grid'
import echarts from 'echarts'
// 导入NProgress  js和css包
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video
Vue.prototype.$echarts = echarts
Vue.use(VueQuillEditor)
Vue.component('tree-table', ZkTable)

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 通过axios请求拦截器添加token，保证拥有获取数据的权限
// 调用axios包里面的interceptors属性，该属性中有一个request成员（一个请求拦截器）
// 通过use函数为请求拦截器挂载一个回调函数
// 只要你通过axios向服务器端发送了一次数据请求，就必然会在发送请求期间、到达服务器前优先调用回调函数进行预处理
// config代表请求对象，包含很多属性
axios.interceptors.request.use(config => {
  console.log(config)
  // 为请求头对象，添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 已经把请求头做了预处理，在最后必须return config
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
// 把axios包挂载到vue原型对象上,每一个vue的组件都可以通过this,直接访问到$http，从而发起ajax请求
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 全局时间过滤器
Vue.filter('getTime', function (times) {
  const newdate = new Date(times)
  const y = newdate.getFullYear()
  const m = (newdate.getMonth() + 1 + '').padStart(2, '0')
  const d = (newdate.getDate() + '').padStart(2, '0')
  const h = (newdate.getHours() + '').padStart(2, '0')
  const f = (newdate.getMinutes() + '').padStart(2, '0')
  const s = (newdate.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d}  ${h}:${f}:${s}`
})

new Vue({
  router, //  挂载路由
  //    通过render函数，把APP根组件渲染到页面上
  render: h => h(App)
}).$mount('#app')
