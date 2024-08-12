<template>
  <v-navigation-drawer border class="mt-drawer" sticky rail permanent :elevation="4">
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-linkedin" value="linkedin"></v-list-item>
      <v-list-item prepend-icon="mdi-youtube" value="youtube"></v-list-item>
      <v-list-item prepend-icon="mdi-github" value="github"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts"></script>
<style scoped>
.mt-drawer {
  margin-top: 15rem;
}
</style>
