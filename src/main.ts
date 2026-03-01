import { createApp } from 'vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import router from '@/services/router';
import '@/styles/main.scss';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion';
import App from './App.vue';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#6366F1',
          secondary: '#8B5CF6',
          background: '#F8F7FF',
          surface: '#FFFFFF',
          'surface-variant': '#EDEDF7',
          'on-surface': '#0B0B0F',
          error: '#EF4444',
          info: '#3B82F6',
          success: '#10B981',
          warning: '#F59E0B',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#818CF8',
          secondary: '#A78BFA',
          background: '#0B0B0F',
          surface: '#131318',
          'surface-variant': '#1C1C25',
          'on-surface': '#E8E8F0',
          error: '#F87171',
          info: '#60A5FA',
          success: '#34D399',
          warning: '#FBBF24',
        },
      },
    },
  },
});
const pinia = createPinia();
const app = createApp(App);

app.use(vuetify);
app.use(pinia);
app.use(router);
app.use(MotionPlugin);

app.mount('#app');
