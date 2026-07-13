import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EnglishView from '../views/EnglishView.vue'
import JapaneseView from '../views/JapaneseView.vue'
import CleanupView from '../views/CleanupView.vue'
import ChemistryView from '../views/ChemistryView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/english',
      name: 'english',
      component: EnglishView,
    },
    {
      path: '/japanese',
      name: 'japanese',
      component: JapaneseView,
    },
    {
      path: '/cleanup',
      name: 'cleanup',
      component: CleanupView,
    },
    {
      path: '/chemistry',
      name: 'chemistry',
      component: ChemistryView,
    },
  ],
})

export default router
