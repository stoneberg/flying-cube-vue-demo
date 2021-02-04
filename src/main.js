import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import DefaultLayout from './components/layout/DefaultLayout.vue';
import SimpleLayout from './components/layout/SimpleLayout.vue';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(DefaultLayout);
app.use(SimpleLayout);
app.mount('#app');
