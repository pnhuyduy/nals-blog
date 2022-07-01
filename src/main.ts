import Vue from 'vue'
import { createApp, h } from 'vue-demi'
import VueCompositionApi from '@vue/composition-api'
import { registerSW } from 'virtual:pwa-register'
import router from '@/router'
import App from '@/App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'windi.css'

registerSW()

Vue.use(VueCompositionApi)

Vue.config.productionTip = false
Vue.config.devtools = true

const app = createApp({
  router,
  render: () => h(App),
})

app.mount('#app')
