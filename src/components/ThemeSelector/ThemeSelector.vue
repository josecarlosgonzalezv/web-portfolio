<template>
  <v-btn :icon="setThemeIcon()" @click="handlerClick"></v-btn>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Store } from '@/store';
import { initStore, updateThemeStore } from '@/store/utils';

const store = ref<Store>({} as Store);

const setThemeIcon = () => (store.value.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night');

const handlerClick = () => {
  const newTheme = store.value.theme === 'light' ? 'dark' : 'light';

  updateThemeStore(store.value, newTheme);
};

onBeforeMount(() => initStore(store));
</script>
