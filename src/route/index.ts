import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Practice from './../views/Practice.vue'
import Result from './../views/Result.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/practice',
    component: Practice
  },
  {
    path: '/result',
    component: Result
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})