import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
import { store } from './store/store'
import router from './router/index'
import './assets/cds'

const app = createApp(App).use(store).use(router)
app.mount('#app')
