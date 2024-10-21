<template>
  <v-navigation-drawer border class="mt-drawer" sticky rail permanent :elevation="4">
    <v-list density="compact" nav>
      <v-list-item
        v-for="(media, idx) in medias"
        :key="idx"
        :prepend-icon="`mdi-${media}`"
        :value="media"
        @click="redirect(media)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const medias = ['linkedin', 'github'];

const redirect = (value: string) => {
  const urls: { [key: string]: string } = {
    linkedin: 'https://www.linkedin.com/in/josegnzl/',
    github: 'https://github.com/josecarlosgonzalezv',
  };

  window.open(urls[value], '_blank');
};
</script>
<style scoped>
.mt-drawer {
  margin-top: 15rem;
}
</style>
