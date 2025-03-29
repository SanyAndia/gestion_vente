import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia'  // Importation de Pinia

const app = createApp(App)
const pinia = createPinia()  // Création de l'instance Pinia

app.use(router)   // Utilisation du router
app.use(pinia)    // Utilisation de Pinia

app.mount('#app') // Montage de l'application

