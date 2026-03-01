<template>
  <v-app-bar :elevation="4">
    <template v-if="smAndDown">
      <v-menu
        v-model="mobileMenuOpen"
        :close-on-content-click="true"
        location="bottom"
        transition="slide-y-transition"
        @update:model-value="onMobileMenuClose"
      >
        <template #activator="{ props: menuProps }">
          <v-app-bar-nav-icon ref="menuActivatorRef" v-bind="menuProps" class="mr-2" aria-label="Open menu" />
        </template>
        <v-list>
          <v-list-item
            v-for="(tab, idx) in tabs"
            :key="idx"
            :active="activeTab === tab.value"
            class="min-touch"
            @click="navigate(tab)"
          >
            <v-list-item-title>{{ tab.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <v-tabs v-else :model-value="activeTab" align-tabs="center" grow class="flex-grow-1">
      <v-tab v-for="(tab, idx) in tabs" :key="idx" :value="tab.value" @click="navigate(tab)">{{ tab.name }}</v-tab>
    </v-tabs>
    <MusicPlayer class="mr-1 flex-shrink-0" />
    <ThemeSelector class="mr-2 flex-shrink-0" />
  </v-app-bar>
</template>

<script setup lang="ts">
import { nextTick, inject, ref, computed } from 'vue';
import { useDisplay } from 'vuetify';
import ThemeSelector from '@/components/ThemeSelector/ThemeSelector.vue';
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer.vue';
import { useRoute, useRouter } from 'vue-router';
import { scrollToSection, getActiveSectionId, SECTION_TABS, SECTION_IDS } from '@/composables/useSectionScroll';
import { useScrollThrottle } from '@/composables/useScrollThrottle';

const { smAndDown } = useDisplay();
const tabs = SECTION_TABS;
const route = useRoute();
const router = useRouter();
const mobileMenuOpen = ref(false);
const menuActivatorRef = ref<{ $el?: HTMLElement } | null>(null);
const isScrollingProgrammatically = inject<{ value: boolean }>('programmaticScroll') ?? ref(false);

const activeTab = computed(() => {
  const normalized = route.path.replace(/\/$/, '') || '/';

  return SECTION_TABS.find((t) => t.route.replace(/\/$/, '') === normalized)?.value ?? 'home';
});

const onMobileMenuClose = (open: boolean) => {
  if (!open) {
    nextTick(() => {
      const el = menuActivatorRef.value?.$el;

      if (el && typeof el.focus === 'function') (el as HTMLElement).focus();
    });
  }
};

function navigate(tab: (typeof SECTION_TABS)[0]) {
  isScrollingProgrammatically.value = true;
  router.replace(tab.route);
  scrollToSection(tab.elementId);
  mobileMenuOpen.value = false;
  releaseAfterScroll();
}

function releaseAfterScroll() {
  const release = () => {
    isScrollingProgrammatically.value = false;
    window.removeEventListener('scrollend', release);
  };

  window.addEventListener('scrollend', release, { once: true });
  window.setTimeout(release, 1500);
}

const onScroll = () => {
  if (isScrollingProgrammatically.value) return;

  const activeId = getActiveSectionId(SECTION_IDS);

  if (!activeId) return;

  const tab = SECTION_TABS.find((t) => t.elementId === activeId);

  if (tab && tab.value !== activeTab.value) router.replace(tab.route);
};

useScrollThrottle(onScroll);
</script>

<style scoped lang="scss" src="./NavBar.scss"></style>
