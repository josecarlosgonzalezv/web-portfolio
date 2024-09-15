<template>
  <v-parallax class="align-center">
    <div class="d-flex flex-column w-100 text-center align-center ma-auto pt-12">
      <h3 class="text-h3 font-weight-black">ABOUT ME</h3>
      <CustomDivider class="mt-4" />
      <p class="w-50 mt-4">
        Here you will find more information about me, what I do, and my current skills mostly in terms of programming
        and technology.
      </p>
      <div class="d-flex flex-column flex-md-row justify-space-between mt-4 text-left" style="width: 100%">
        <div class="w-75 w-md-50 pa-10 ml-12">
          <h2>Get to know me!</h2>
          <p class="mt-4">
            I am a front-end developer based in Málaga, Spain. I have developed many types of front-ends for renowned
            companies such as LUMEN, EY, Accenture among others.
          </p>
          <p class="mt-4">
            My main focus these days is building a component library in <strong>LUMEN</strong>:
            <a href="https://lib.lumen.com/chi/latest/getting-started/"
              >https://lib.lumen.com/chi/latest/getting-started/</a
            >
          </p>
          <p class="mt-4">
            I like to build software in the sweet spot where design and engineering meet - things that look good but are
            also built well under the hood.
          </p>
          <p class="mt-4">
            I also have a master's degree in game development and design which I like to focus on in my spare time to
            learn new programming languages and new ways of working.
          </p>
          <p class="mt-4">
            When I'm not in front of the computer, I'm usually playing sports, reading, hanging out with friends, or
            running around Hyrule looking for Korok's seeds.
          </p>
          <v-btn color="primary" class="mt-6 w-100">Contact me</v-btn>
        </div>
        <div class="w-75 w-md-50 pa-10 ml-12 ml-md-0">
          <h2>Technologies</h2>
          <v-chip class="chip mt-4 ma-3" v-for="(tech, idx) in techs" :key="idx">{{ tech }}</v-chip>
        </div>
      </div>
    </div>
  </v-parallax>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Store } from '@/store';
import { initStore } from '@/store/utils';
import CustomDivider from '@/components/CustomDivider/CustomDivider.vue';

const store = ref<Store>({} as Store);
const techs = ['HTML', 'CSS', 'Typescript', 'Vue', 'Stencil', 'SASS', 'GIT', 'CI/CD', 'Cypress', 'Unity', 'C#'];

onBeforeMount(() => initStore(store));
</script>

<style scoped lang="scss">
.chip {
  font-size: 1rem;
  padding: 1rem;
}
</style>
