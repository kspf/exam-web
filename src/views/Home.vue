<template>
  <div id="home">
    <div class="app" v-for="(item, index) in apps" :key="index">
        <router-link :to="item.next">
            <img class="app_img" src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="">
        <p>{{item.name}}</p>
        </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { reactive } from 'vue'
    import { RouterLink } from 'vue-router'

    const apps = reactive([
        {
            name: '编码练习',
            next: '/codeExercise'
        }
    ])
</script>

<style scoped>
#home {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.app {
  width: calc((100vw - 20px * 2 - 30px * 3) / 4);
  margin-bottom: 30px;
  margin-right: 30px;
}
.app .app_img {
  height: calc((100vw - 20px * 2 - 30px * 3) / 4);
  width: 100%;
  display: block;
  object-fit: cover;
}
.app p {
    text-align: center;
    font-size: 24px;
}
.app:nth-child(4n) {
  margin-right: 0;
}
</style>