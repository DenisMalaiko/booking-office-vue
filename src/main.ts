import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import store from "@/store";

import "./assets/style.scss"

loadFonts()

createApp(App).use(router)
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')
