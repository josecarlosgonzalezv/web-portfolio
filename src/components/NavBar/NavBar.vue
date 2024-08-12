<template>
  <SystemBar />
  <v-app-bar :elevation="4">
    <v-tabs align-tabs="center" grow>
      <v-tab v-for="(tab, idx) in tabs" :key="idx" :value="tab.value">{{ tab.name }}</v-tab>
    </v-tabs>
    <ThemeSelector class="mr-4" />
    <LanguageSelector />
  </v-app-bar>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import SystemBar from '@/components/SystemBar/SystemBar.vue';
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector.vue';
import ThemeSelector from '@/components/ThemeSelector/ThemeSelector.vue';
import { Store } from '@/store';
import { initStore } from '@/store/utils';
import { translateText } from '@/services/translateService';

const store = ref<Store>({} as Store);
const tabs = ref([
  { name: 'Home', value: 'home' },
  { name: 'About', value: 'about' },
  { name: 'Projects', value: 'projects' },
  { name: 'Contact me', value: 'contact' },
]);

const translateTabs = async () => {
  for (const tab of tabs.value) {
    tab.name = await translateText(tab.name, store.value.lang.source);
  }
};

onBeforeMount(() => {
  initStore(store);
  translateTabs();
});

watch(
  () => store.value.lang,
  () => translateTabs()
);
</script>
