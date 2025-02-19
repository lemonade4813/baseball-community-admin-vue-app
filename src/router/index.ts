import { createRouter, createWebHistory } from 'vue-router'
import Stadiums from '@/components/Stadiums.vue'
import Foods from '@/components/Foods.vue'
import Members from '@/components/Members.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/foods',
      name: 'foods',
      component: Foods,
    },
    {
      path: '/stadiums',
      name: 'stadiums',
      component: Stadiums
    },
    {
      path: '/members',
      name: 'members',
      component: Members
    },
  ],
})

export default router
