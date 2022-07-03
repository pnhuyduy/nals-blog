import Vue from 'vue'
import { createApp, h } from 'vue-demi'
import VueCompositionApi from '@vue/composition-api'
import { registerSW } from 'virtual:pwa-register'
import { PiniaVuePlugin, createPinia } from 'pinia'
import { ModalPlugin, ToastPlugin } from 'bootstrap-vue'
import router from '@/router'
import App from '@/App.vue'
import '@/libs/vee-validate'

import 'virtual:windi.css'
import '@/assets/app.scss'

Vue.use(ModalPlugin)
Vue.use(ToastPlugin)

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
