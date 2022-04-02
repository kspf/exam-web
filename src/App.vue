<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="layout">
    <router-view></router-view>
  </div>
</template>

<style scoped>
#layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}
</style>
