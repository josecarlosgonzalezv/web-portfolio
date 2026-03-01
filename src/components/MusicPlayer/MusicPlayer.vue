<template>
  <div class="music-player">
    <v-btn
      :icon="playerIcon"
      :aria-label="playerAriaLabel"
      :class="{ 'music-player__btn--playing': isPlaying }"
      class="music-player__btn"
      @click="toggle"
    />
    <transition name="fade-slide">
      <div v-if="showVolume" class="music-player__volume-panel">
        <v-icon size="14" class="music-player__vol-icon">{{ volumeIcon }}</v-icon>
        <v-slider
          :model-value="volume"
          min="0"
          max="1"
          step="0.05"
          density="compact"
          hide-details
          class="music-player__slider"
          aria-label="Volume"
          @update:model-value="setVolume"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMusicPlayer } from '@/composables/useMusicPlayer';

const {
  isPlaying,
  volume,
  isMutedByAutoplayPolicy,
  isAutoplayPending,
  hasStreamError,
  toggle,
  setVolume,
} = useMusicPlayer();

const showVolume = computed(
  () => isPlaying.value && !isMutedByAutoplayPolicy.value && !isAutoplayPending.value,
);

const playerAriaLabel = computed(() => {
  if (hasStreamError.value) return 'Audio stream unavailable. Try again later';
  if (isAutoplayPending.value) return 'Autoplay is pending user interaction';
  if (!isPlaying.value) return 'Play lofi music';
  if (isMutedByAutoplayPolicy.value) return 'Lofi music is playing muted until you interact';
 
  return 'Pause lofi music';
});

const volumeIcon = computed(() =>
  isMutedByAutoplayPolicy.value || volume.value === 0
    ? 'mdi-volume-off'
    : 'mdi-volume-high',
);

const playerIcon = computed(() => {
  if (hasStreamError.value) return 'mdi-alert-circle-outline';
  
  if (!isPlaying.value || isMutedByAutoplayPolicy.value || isAutoplayPending.value) {
    return 'mdi-music-note-off';
  }
  
  return 'mdi-music-note';
});
</script>

<style scoped lang="scss" src="./MusicPlayer.scss"></style>
