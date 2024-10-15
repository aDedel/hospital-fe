import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)

i18n(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
