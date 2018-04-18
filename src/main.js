import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'
import {currency} from '@/utils/currency'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.filter('currency',currency)
Vue.use(ElementUI)
Vue.use(VueLazyLoad,{
	loading : '../static/loading-svg/loading-bars.svg'
})
Vue.use(VueInfiniteScroll)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
