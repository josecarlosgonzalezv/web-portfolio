<template>
  <v-card class="mx-auto">
    <iframe
      v-if="link"
      :src="link"
      :title
      height="250"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      class="w-100"
    ></iframe>
    <img v-else-if="img" height="250" :src="img" />
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-actions>
      <v-btn color="primary" text="More info" @click="show = !show"></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text style="max-width: 30rem">
          {{ description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Store } from '@/store';
import { initStore } from '@/store/utils';
import { Project } from '@/constants/types';

const store = ref<Store>({} as Store);
const show = ref(false);
const props = defineProps<Project>();

onBeforeMount(() => initStore(store));
</script>
