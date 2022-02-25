import './assets/main.css'

import { createApp } from 'vue'
import App from './App'

const app = createApp(App)
window.vm = app.mount('#app')
