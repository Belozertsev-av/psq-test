import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from "./router/index";
import axios from 'axios'
import VueAxios from 'vue-axios'

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(router)
    .use(VueAxios, axios)
    .mount('#app')
