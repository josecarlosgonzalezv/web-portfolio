<template>
  <v-responsive class="border rounded">
    <v-app :theme="store.theme">
      <NavBar />
      <Drawer />
      <v-main class="pl-0">
        <Home />
        <About />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Store } from '@/store';
import { initStore } from '@/store/utils';
import NavBar from '@/components/NavBar/NavBar.vue';
import Drawer from '@/components/Drawer/Drawer.vue';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

const store = ref<Store>({} as Store);

onBeforeMount(() => initStore(store));
</script>
