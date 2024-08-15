<template>
  <SystemBar />
  <v-app-bar :elevation="4">
    <v-tabs v-model="activeTab" align-tabs="center" grow>
      <v-tab v-for="(tab, idx) in tabs" :value="tab.value" :key="idx" @click="scrollTo(tab.elementId)">{{
        tab.name
      }}</v-tab>
    </v-tabs>
    <ThemeSelector class="mr-4" />
    <LanguageSelector />
  </v-app-bar>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import SystemBar from '@/components/SystemBar/SystemBar.vue';
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector.vue';
import ThemeSelector from '@/components/ThemeSelector/ThemeSelector.vue';
import { Store } from '@/store';
import { initStore } from '@/store/utils';
import { translateText } from '@/services/translateService';
import { useRouter } from 'vue-router';

const store = ref<Store>({} as Store);
const tabs = ref([
  { name: 'Home', value: 'home', route: '/home', elementId: 'home-section' },
  { name: 'About', value: 'about', route: '/about', elementId: 'about-section' },
  { name: 'Projects', value: 'projects', route: '/projects', elementId: 'projects-section' },
  { name: 'Contact me', value: 'contact', route: '/contact', elementId: 'contact-section' },
]);
const router = useRouter();
const activeTab = ref(0);

const translateTabs = async () => {
  for (const tab of tabs.value) {
    tab.name = await translateText(tab.name, store.value.lang.source);
  }
};

const handleScroll = () => {
  tabs.value.forEach((tab, idx) => {
    const section = document.getElementById(tab.elementId);

    if (section) {
      const rect = section.getBoundingClientRect();

      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        router.push(tab.route);
        activeTab.value = idx;
      }
    }
  });
};

const scrollTo = (section: string) => {
  const element = document.getElementById(section);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

onBeforeMount(() => {
  initStore(store);
  translateTabs();
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(
  () => store.value.lang,
  () => translateTabs()
);
</script>
