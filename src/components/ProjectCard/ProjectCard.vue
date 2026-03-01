<template>
  <v-card class="mx-auto project-card">
    <div class="project-card-media">
      <button
        v-if="hasYoutubeFacade && !isVideoLoaded"
        type="button"
        class="project-card-video-facade"
        :aria-label="`Play preview for ${title}`"
        @click="isVideoLoaded = true"
      >
        <img :src="youtubeThumbnailUrl" :alt="`Preview: ${title}`" loading="lazy" class="project-card-img" />
        <span class="project-card-video-facade__overlay">
          <v-icon icon="mdi-play-circle" size="56" />
        </span>
      </button>
      <iframe
        v-else-if="link"
        :src="embedUrl"
        :title="title"
        frameborder="0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        class="w-100"
      />
      <img v-else-if="img" :src="img" :alt="`Preview: ${title}`" loading="lazy" class="project-card-img" />
      <div v-else class="project-card-placeholder d-flex align-center justify-center">
        <v-icon icon="mdi-image-off-outline" size="48" class="project-card-placeholder-icon" />
        <span class="text-body-2 text-medium-emphasis">No preview</span>
      </div>
    </div>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-actions>
      <v-btn
        color="primary"
        :prepend-icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        :aria-expanded="show"
        :aria-label="show ? 'Show less description' : 'Show more description'"
        @click="show = !show"
      >
        {{ show ? 'Show less' : 'Show more' }}
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider />
        <v-card-text class="project-card-text">
          {{ description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Project } from '@/constants/types';

const show = ref(false);
const isVideoLoaded = ref(false);
const props = defineProps<Project>();

const extractYoutubeId = (url?: string): string | null => {
  if (!url) return null;
  
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&/]+)/i);
  
  if (embedMatch?.[1]) return embedMatch[1];
  
  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/i);
  
  if (shortMatch?.[1]) return shortMatch[1];
  
  return null;
};

const youtubeId = computed(() => extractYoutubeId(props.link));
const hasYoutubeFacade = computed(() => Boolean(youtubeId.value));
const youtubeThumbnailUrl = computed(() =>
  youtubeId.value ? `https://img.youtube.com/vi/${youtubeId.value}/hqdefault.jpg` : '',
);
const embedUrl = computed(() => {
  if (!props.link) return '';
  if (!hasYoutubeFacade.value) return props.link;
  if (!isVideoLoaded.value) return '';
 
  const separator = props.link.includes('?') ? '&' : '?';
  
  return `${props.link}${separator}autoplay=1`;
});
</script>

<style scoped lang="scss" src="./ProjectCard.scss"></style>
