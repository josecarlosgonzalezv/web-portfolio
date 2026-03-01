<template>
  <v-btn :icon="themeIcon" aria-label="Toggle light/dark theme" @click="onToggleTheme" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useWebStore } from '@/store';

const store = useWebStore();
const { theme } = storeToRefs(store);
const themeIcon = computed(() => (theme.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'));

const onToggleTheme = () => {
  const newTheme = theme.value === 'light' ? 'dark' : 'light';

  store.updateTheme(newTheme);
};
</script>
