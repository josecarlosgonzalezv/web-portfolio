import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
// import Projects from '@/views/Projects.vue';
// import Contact from '@/views/Contact.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  //   { path: '/projects', component: Projects },
  //   { path: '/contact', component: Contact },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
