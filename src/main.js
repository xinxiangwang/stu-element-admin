import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import router from './router'
import store from './store'
import './permission.js'

import XlCol from '@/components/xl-col'
import XlRow from '@/components/xl-row'
import XlRadio from '@/components/xl-radio'

Vue.use(ElementUI, { locale })

Vue.use(XlCol)
Vue.use(XlRow)
Vue.use(XlRadio)

Vue.config.productionTip = false

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
