import Vue from 'vue'
import App from './App'

import request from './network/request'

Vue.config.productionTip = false

Vue.prototype.request = request //将网络请求挂载到Vue实例

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
