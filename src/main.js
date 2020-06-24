// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/reset.css'
import './assets/style/boder.css'
import './assets/style/iconfont.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './api/Global'
Vue.prototype.API = api
Vue.use(VueAxios, axios)
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
import Verification from './public/Verification'
Vue.component('Verification', Verification)

Vue.config.productionTip = false

VueTouch.config.swipe = {

  threshold: 100 //手指左右滑动距离

}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
