<template>
  <v-responsive class="overflow-x-hidden">
    <v-app :theme="store.theme">
      <NavBar />
      <Drawer />
      <v-main class="pl-0">
        <template v-for="tab in SECTION_TABS" :key="tab.elementId">
          <component :is="sectionComponents[tab.elementId]" :id="tab.elementId" />
        </template>
      </v-main>
      <Footer />
    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { onMounted, onBeforeUnmount, ref, provide, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useWebStore } from '@/store';
import { scrollToSection, getActiveSectionId, SECTION_TABS, SECTION_IDS } from '@/composables/useSectionScroll';
import NavBar from '@/components/NavBar/NavBar.vue';
import Drawer from '@/components/Drawer/Drawer.vue';
import Footer from '@/components/Footer/Footer.vue';
import Home from '@/views/Home/Home.vue';
import About from '@/views/About/About.vue';
import Resume from '@/views/Resume/Resume.vue';
import Skills from '@/views/Skills/Skills.vue';
import Projects from '@/views/Projects/Projects.vue';
import Contact from '@/views/Contact/Contact.vue';

const sectionComponents: Record<string, Component> = {
  'home-section': Home,
  'about-section': About,
  'resume-section': Resume,
  'skills-section': Skills,
  'projects-section': Projects,
  'contact-section': Contact,
};

const store = useWebStore();
const router = useRouter();
const route = useRoute();
const programmaticScroll = ref(false);

provide('programmaticScroll', programmaticScroll);

let scrollSnapStyleEl: HTMLStyleElement | null = null;

const normalizePath = (path: string) => path.replace(/\/$/, '') || '/';
const getTabByPath = (path: string) => {
  const normalized = normalizePath(path);

  if (normalized === '/') return SECTION_TABS[0];

  return SECTION_TABS.find((t) => normalizePath(t.route) === normalized);
};

function releaseProgrammaticScroll() {
  const release = () => {
    programmaticScroll.value = false;
    window.removeEventListener('scrollend', release);
  };

  window.addEventListener('scrollend', release, { once: true });
  window.setTimeout(release, 1500);
}

function syncRouteToSection(behavior: ScrollBehavior = 'smooth') {
  const tab = getTabByPath(route.path);

  if (!tab) {
    router.replace('/home');
    return;
  }

  if (getActiveSectionId(SECTION_IDS) === tab.elementId) return;

  programmaticScroll.value = true;
  scrollToSection(tab.elementId, { behavior });
  releaseProgrammaticScroll();
}

onMounted(() => {
  history.scrollRestoration = 'manual';

  const lastId = SECTION_IDS[SECTION_IDS.length - 1];
  const scrollSnapCss =
    `html{scroll-snap-type:y proximity;}` +
    SECTION_IDS.map((id) => `#${id}{scroll-snap-align:start;scroll-margin-top:100px;}`).join('') +
    `#${lastId}{min-height:100vh;}`;

  scrollSnapStyleEl = document.createElement('style');
  scrollSnapStyleEl.textContent = scrollSnapCss;
  scrollSnapStyleEl.setAttribute('data-scroll-snap', '');

  document.head.appendChild(scrollSnapStyleEl);

  void router.isReady().then(async () => {
    await nextTick();
    syncRouteToSection('auto');
  });
});

watch(
  () => route.path,
  () => {
    syncRouteToSection('smooth');
  }
);

onBeforeUnmount(() => {
  scrollSnapStyleEl?.remove();
});
</script>
