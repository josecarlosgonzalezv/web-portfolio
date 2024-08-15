<template>
  <v-parallax id="home-section" class="pl-0 align-center" height="700">
    <div class="d-flex flex-column w-50 text-center align-center ma-auto pt-12">
      <h3 class="text-h3 font-weight-black">I'M JOSE CARLOS</h3>
      <p class="mt-6">
        Results-oriented web developer who builds and manages websites and web applications leading to overall product
        success
      </p>
      <v-btn color="primary" class="mt-6 w-100 w-md-25">Projects</v-btn>
    </div>
    <ArrowDown />
  </v-parallax>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import ArrowDown from '@/components/ArrowDown/ArrowDown.vue';
import { Store } from '@/store';
import { initStore } from '@/store/utils';

const store = ref<Store>({} as Store);

onBeforeMount(() => {
  initStore(store);
});
</script>
