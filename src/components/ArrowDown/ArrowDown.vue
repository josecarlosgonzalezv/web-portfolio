<template>
  <div class="align-center mt-16">
    <div class="arrow-down"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.arrow-down {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 20px solid #333;
  position: relative;
  margin: 0 auto;
  animation: bounce 1.5s infinite ease-in-out;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
