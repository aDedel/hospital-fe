import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './AppSuspenser.vue'
import i18n from './i18n'
import router from './router'

const app = createApp(App)

i18n(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
