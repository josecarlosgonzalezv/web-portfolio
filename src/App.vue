<template>
  <v-responsive class="border rounded">
    <v-app :theme="store.theme">
      <Home />
    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Store } from '@/store';
import { initStore } from '@/store/utils';
import Home from '@/views/Home.vue';

const store = ref<Store>({} as Store);

onBeforeMount(() => initStore(store));
</script>
