<template>
  <footer class="footer">
    <span class="footer-copyright">
      © Copyright {{ currentYear }}. Made by
      <a :href="profileUrl" target="_blank" rel="noopener noreferrer" class="footer-link">{{ authorName }}</a>
    </span>
    <div class="footer-social">
      <a
        v-for="item in socialLinks"
        :key="item.id"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-social-link"
        :aria-label="item.id"
      >
        <v-icon :icon="`mdi-${item.icon}`" size="small" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { SITE_AUTHOR_NAME, SITE_PROFILE_URL } from '@/constants/site';
import { useSocialLinks } from '@/composables/useSocialLinks';

const authorName = SITE_AUTHOR_NAME;
const profileUrl = SITE_PROFILE_URL;
const socialLinks = useSocialLinks();
const currentYear = new Date().getFullYear();
</script>

<style scoped lang="scss" src="./Footer.scss"></style>
