import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EnglishView from '../views/EnglishView.vue'
import JapaneseView from '../views/JapaneseView.vue'
import CleanupView from '../views/CleanupView.vue'
import ChemistryView from '../views/ChemistryView.vue'
import WorkoutsView from '../views/WorkoutsView.vue'
import PhilosophyView from '../views/PhilosophyView.vue'
import ProgrammingView from '../views/ProgrammingView.vue'

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
    {
      path: '/workouts',
      name: 'workouts',
      component: WorkoutsView,
    },
    {
      path: '/philosophy',
      name: 'philosophy',
      component: PhilosophyView,
    },
    {
      path: '/programming',
      name: 'programming',
      component: ProgrammingView,
    },
  ],
})

export default router
