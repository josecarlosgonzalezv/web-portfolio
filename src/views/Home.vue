<template>
  <NavBar />
  <Drawer />
  <v-main class="pl-0" id="home-section">
    <v-parallax class="align-center" height="690">
      <div class="d-flex flex-column w-50 text-center align-center ma-auto pt-12">
        <h3 class="text-h3 font-weight-black">{{ texts[0].value }}</h3>
        <p class="mt-6">
          {{ texts[1].value }}
        </p>
        <v-btn color="primary" class="mt-6 w-100 w-md-25">{{ texts[2].value }}</v-btn>
      </div>
      <ArrowDown />
    </v-parallax>
  </v-main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import NavBar from '@/components/NavBar/NavBar.vue';
import Drawer from '@/components/Drawer/Drawer.vue';
import ArrowDown from '@/components/ArrowDown/ArrowDown.vue';
import { Store } from '@/store';
import { initStore } from '@/store/utils';
import { translateText } from '@/services/translateService';

const store = ref<Store>({} as Store);
const texts = ref([
  { value: "I'M JOSE CARLOS" },
  {
    value:
      'Results-oriented web developer who builds and manages websites and web applications leading to overall product success',
  },
  { value: 'Projects' },
]);

const translateTexts = async () => {
  for (const text of texts.value) {
    text.value = await translateText(text.value, store.value.lang.source);
  }
};

onBeforeMount(() => {
  initStore(store);
  translateTexts();
});

watch(
  () => store.value.lang,
  () => translateTexts()
);
</script>
