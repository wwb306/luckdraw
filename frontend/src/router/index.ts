import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ProjectView from '../views/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
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
