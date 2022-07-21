import App from './App.vue'
import router from './router'
import store from "@/store";
import vuetify from './plugins/vuetify'

import { createApp } from 'vue'
import { loadFonts } from './plugins/webfontloader'

import "./assets/style.scss"
import "../node_modules/bootstrap/dist/css/bootstrap-grid.css"

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

loadFonts()

createApp(App).use(router)
  .use(router)
  .use(vuetify)
  .use(store)
  .component('Datepicker', Datepicker)
  .mount('#app')
