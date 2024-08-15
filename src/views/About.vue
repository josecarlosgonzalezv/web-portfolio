<template>
  <v-parallax class="align-center" height="690">
    <div
      id="about-section"
      style="margin-top: 200px"
      class="d-flex flex-column w-100 text-center align-center ma-auto pt-12"
    >
      <h3 class="text-h3 font-weight-black">{{ texts[0].value }}</h3>
      <CustomDivider class="mt-4" />
      <v-divider color="info"></v-divider>
      <p class="w-50 mt-4">
        {{ texts[1].value }}
      </p>
      <div class="d-flex justify-space-between mt-4 text-left" style="width: 100%">
        <div class="w-50 pa-10 ml-12">
          <h2>{{ texts[2].value }}</h2>
          <p v-for="(text, idx) in [5, 6, 7, 8, 9]" class="mt-4" v-html="texts[text].value" :key="idx"></p>
          <v-btn color="primary" class="mt-6 w-100">{{ texts[4].value }}</v-btn>
        </div>
        <div class="w-50 pa-10">
          <h2>{{ texts[3].value }}</h2>
          <v-chip class="chip mt-4 ma-3" v-for="(tech, idx) in techs" :key="idx">{{ tech }}</v-chip>
        </div>
      </div>
    </div>
  </v-parallax>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { Store } from '@/store';
import { initStore } from '@/store/utils';
import { translateText } from '@/services/translateService';
import CustomDivider from '@/components/CustomDivider/CustomDivider.vue';

const store = ref<Store>({} as Store);
const texts = ref([
  { value: 'ABOUT ME' },
  {
    value:
      'Here you will find more information about me, what I do, and my current skills mostly in terms of programming and technology.',
  },
  {
    value: 'Get to know me',
  },
  {
    value: 'Technologies',
  },
  {
    value: 'Contact me',
  },
  {
    value:
      'I am a front-end developer based in Málaga, Spain. I have developed many types of front-ends for renowned companies such as LUMEN, EY, Accenture among others.',
  },
  {
    value:
      'My main focus these days is building a component library in <strong>LUMEN</strong>: <a href="https://lib.lumen.com/chi/latest/getting-started/">https://lib.lumen.com/chi/latest/getting-started/</a>',
  },
  {
    value:
      'I like to build software in the sweet spot where design and engineering meet - things that look good, but are also built well under the bonnet.',
  },
  {
    value:
      "I also have a master's degree in game development and design which I like to focus on in my spare time to learn new programming languages and new ways of working.",
  },
  {
    value:
      "When I'm not in front of the computer, I'm usually playing sports, reading, hanging out with friends, or running around Hyrule looking for Korok's seeds.",
  },
]);
const techs = ['HTML', 'CSS', 'Typescript', 'Vue', 'Stencil', 'SASS', 'GIT', 'CI/CD', 'Cypress', 'Unity', 'C#'];

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

<style scoped lang="scss">
.chip {
  font-size: 1rem;
  padding: 1rem;
}
</style>
