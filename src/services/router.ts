import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home/Home.vue';
import About from '@/views/About/About.vue';
import Resume from '@/views/Resume/Resume.vue';
import Skills from '@/views/Skills/Skills.vue';
import Projects from '@/views/Projects/Projects.vue';
import Contact from '@/views/Contact/Contact.vue';

if (typeof window !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  const redirectedPath = params.get('redirect');

  if (redirectedPath) {
    const cleanPath = redirectedPath.startsWith('/') ? redirectedPath : `/${redirectedPath}`;

    window.history.replaceState(null, '', `${import.meta.env.BASE_URL.replace(/\/$/, '')}${cleanPath}`);
  }
}

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/resume', component: Resume },
  { path: '/skills', component: Skills },
  { path: '/projects', component: Projects },
  { path: '/contact', component: Contact },
  { path: '/:pathMatch(.*)*', redirect: '/home' },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
