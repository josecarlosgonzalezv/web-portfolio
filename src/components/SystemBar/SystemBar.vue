<template>
  <v-system-bar window>
    <v-icon icon="mdi-wifi-strength-4"></v-icon>
    <v-icon icon="mdi-signal" class="ms-2"></v-icon>
    <v-icon icon="mdi-battery" class="ms-2"></v-icon>

    <span class="ms-2">{{ time }}</span>
  </v-system-bar>
</template>

<script setup lang="ts">
const today = new Date();
const hours = today.getHours().toString().padStart(2, '0');
const minutes = today.getMinutes().toString().padStart(2, '0');
const time = hours + ':' + minutes;
</script>
