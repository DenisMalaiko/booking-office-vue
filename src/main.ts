import App from './App.vue'
import router from './router'
import store from "@/store";
import vuetify from './plugins/vuetify'

import { createApp } from 'vue'
import { loadFonts } from './plugins/webfontloader'

import "./assets/style.scss"

loadFonts()

createApp(App).use(router)
  .use(router)
  .use(vuetify)
  .use(store)
  .mount('#app')
