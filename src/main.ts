// Vue
import { createApp } from 'vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import router from '@/services/router';

// Pinia
import { createPinia } from 'pinia';

// App
import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
const pinia = createPinia();
const app = createApp(App);

app.use(vuetify);
app.use(pinia);
app.use(router);

app.mount('#app');
