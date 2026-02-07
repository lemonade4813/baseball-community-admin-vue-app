// import './styles/global.scss'
import 'vuetify/dist/vuetify.min.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./styles/global.scss";
import App from './App.vue';
import router from './router'
import { vuetify } from './plugins/vuetify'
import { createPersistedState } from 'pinia-plugin-persistedstate'


const app = createApp(App)
const pinia = createPinia()     
pinia.use(createPersistedState({storage : sessionStorage, auto : true}))
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
