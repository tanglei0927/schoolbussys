import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 拦截器
import ajax from "@/untils/axios.js"
Vue.prototype.$axios=ajax
// 方法库
import untils from '@/untils/untils.js'
Vue.prototype.$untils=untils
// 请求地址
import config from "@/untils/config.js"
Vue.prototype.$url=config.url
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import '@/styles/resetm.css'
import '@/styles/icon/iconfont.css'

// import AMap from 'vue-amap'
// Vue.use(AMap)
// AMap.initAMapApiLoader({
//   key:"1e3b1287ca713a5a6d2fe2edcdd403d7",
//   plugin:['AMap.Geocoder','AMap.Geolocation']
// })

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
