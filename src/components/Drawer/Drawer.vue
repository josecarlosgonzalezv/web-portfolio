<template>
  <v-navigation-drawer v-if="display.mdAndUp" border class="mt-drawer" sticky rail permanent :elevation="4">
    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, idx) in socialLinks"
        :key="idx"
        :prepend-icon="`mdi-${item.icon}`"
        :value="item.id"
        :aria-label="`Open ${item.id} in new tab`"
        @click="openLink(item.url)"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { useSocialLinks } from '@/composables/useSocialLinks';

const socialLinks = useSocialLinks();
const display = useDisplay();

const openLink = (url: string) => {
  window.open(url, '_blank');
};
</script>

<style scoped lang="scss" src="./Drawer.scss"></style>
