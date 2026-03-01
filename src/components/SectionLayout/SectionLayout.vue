<template>
  <section
    ref="sectionRef"
    v-bind="$attrs"
    :class="[
      'section-layout d-flex align-center',
      sectionClass,
      { 'section-layout--alt': altBg, 'section-layout--revealed': revealed },
    ]"
    :style="{ minHeight: minHeight ? `${minHeight}px` : '400px' }"
  >
    <div class="d-flex flex-column w-100 text-center align-center ma-auto pt-12 pb-12 section-layout__inner">
      <h3 class="text-h4 text-sm-h3 font-weight-black section-layout__title">
        {{ title }}
      </h3>
      <CustomDivider v-if="showDivider" class="mt-4" />
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import CustomDivider from '@/components/CustomDivider/CustomDivider.vue';

withDefaults(
  defineProps<{
    title: string;
    showDivider?: boolean;
    minHeight?: number | string;
    sectionClass?: string;
    altBg?: boolean;
  }>(),
  {
    showDivider: false,
    minHeight: undefined,
    sectionClass: '',
    altBg: false,
  }
);

const sectionRef = ref<HTMLElement | null>(null);
const revealed = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        revealed.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.08 }
  );

  nextTick(() => {
    if (sectionRef.value) observer?.observe(sectionRef.value);
  });
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped lang="scss" src="./SectionLayout.scss"></style>
