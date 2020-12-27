import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';
import '@/assets/index.css';

const app = createApp(App);
app.use(store);
app.mount('#app');
