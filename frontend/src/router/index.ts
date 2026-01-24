import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LuckyDrawDashboard from '../views/LuckyDrawDashboard.vue'
import ProjectView from '../views/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lucky-draw',
      name: 'lucky-draw',
      component: LuckyDrawDashboard
    },
    {
      path: '/project/:id',
      name: 'project',
      component: ProjectView,
      props: true
    }
  ]
})

export default router
