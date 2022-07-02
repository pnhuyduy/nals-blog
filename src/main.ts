import Vue from 'vue'
import { createApp, h } from 'vue-demi'
import VueCompositionApi from '@vue/composition-api'
import { registerSW } from 'virtual:pwa-register'
import { PiniaVuePlugin, createPinia } from 'pinia'
import router from '@/router'
import App from '@/App.vue'

import 'virtual:windi.css'
import '@/assets/app.scss'

// Init pinia store
const pinia = createPinia()
Vue.use(PiniaVuePlugin)

registerSW()

Vue.use(VueCompositionApi)

Vue.config.productionTip = false
Vue.config.devtools = true

const app = createApp({
  router,
  pinia,
  render: () => h(App),
})
app.mount('#app')
