import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Default from './components/layout/DefaultLayout.vue';
import Simple from './components/layout/SimpleLayout.vue';

const app = createApp(App);
app.use(store);
app.use(router);
app.component('DefaultLayout', Default);
app.component('SimpleLayout', Simple);
app.mount('#app');
