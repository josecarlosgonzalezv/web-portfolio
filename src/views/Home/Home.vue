<template>
  <section class="hero-section" :style="{ minHeight: `${parallaxHeight}px` }">
    <div class="hero-bg" :style="{ transform: `translateY(${parallaxOffset}px)` }" />
    <div class="hero-content d-flex flex-column w-100 text-center align-center ma-auto px-4">
      <h3 class="text-h4 text-sm-h3 font-weight-black hero-title">I'M JOSE CARLOS</h3>
      <div class="hero-divider mt-4" />
      <p class="mt-6 w-100 w-sm-75 w-md-50 hero-subtitle">
        Front-end developer focused on crafting interfaces that look great and perform even better.
      </p>
    </div>
    <ArrowDown />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDisplay } from 'vuetify';
import ArrowDown from '@/components/ArrowDown/ArrowDown.vue';
import { useScrollThrottle } from '@/composables/useScrollThrottle';

const { mobile } = useDisplay();
const parallaxHeight = computed(() => (mobile.value ? 500 : 700));
const parallaxOffset = ref(0);

useScrollThrottle(() => {
  parallaxOffset.value = window.scrollY * 0.35;
});
</script>

<style scoped lang="scss" src="./Home.scss"></style>
