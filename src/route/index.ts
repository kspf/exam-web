import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Practice from './../views/Practice.vue'
import Result from './../views/Result.vue'
import CodeExercise from './../views/CodeExercise.vue'

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
  },
  {
    path: '/codeExercise',
    component: CodeExercise
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})