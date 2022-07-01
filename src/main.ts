import Vue from 'vue'
import { createApp, h } from 'vue-demi'
import VueCompositionApi from '@vue/composition-api'
import { registerSW } from 'virtual:pwa-register'
import App from '@/App.vue'

import 'windi.css'
import router from '@/router'

registerSW()

Vue.use(VueCompositionApi)

Vue.config.productionTip = false
Vue.config.devtools = true

const app = createApp({
  router,
  render: () => h(App),
})

app.mount('#app')
