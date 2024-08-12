<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-translate" v-bind="props"></v-btn>
    </template>

    <v-list density="compact">
      <v-list-subheader class="font-weight-black">TRANSLATIONS</v-list-subheader>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item.value"
        color="primary"
        @click="handlerClick(item.value)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { SourceLanguageCode, TargetLanguageCode } from '@/services/types';
import { Store } from '@/store';
import { Lang } from '@/store/types';
import { initStore, updateLangStore } from '@/store/utils';
import { computed, onBeforeMount, ref } from 'vue';

const store = ref<Store>({} as Store);
const items = computed(() => [
  {
    title: 'Spanish',
    value: {
      source: 'es' as SourceLanguageCode,
      target: 'es-ES' as TargetLanguageCode,
    },
  },
  {
    title: 'English',
    value: {
      source: 'en' as SourceLanguageCode,
      target: 'en-GB' as TargetLanguageCode,
    },
  },
]);

const handlerClick = (lang: Lang) => updateLangStore(store.value, lang);

onBeforeMount(() => initStore(store));
</script>
