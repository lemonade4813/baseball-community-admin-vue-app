import { createRouter, createWebHistory } from 'vue-router'
import Stadiums from '@/components/Stadiums.vue'
import Foods from '@/components/Foods.vue'
import Members from '@/components/Members.vue'
import Login from '@/components/Login.vue'
import SchedulesUpload from '@/components/SchedulesUpload.vue'
import SignUp from '@/components/Signup.vue'
import Stats from '@/components/Stats.vue'
import StadiumsDetail from '@/components/StadiumsDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/stats',
      name: 'stats',
      component: Stats,
    },
    {
      path: '/foods',
      name: 'foods',
      component: Foods,
    },
    {
      path: '/stadiums',
      name: 'stadiums',
      component: Stadiums,
    },
    {
      path: '/stadiums/:team',
      name: 'stadium-detail',
      component: StadiumsDetail, // 이동할 상세 컴포넌트
    },
    {
      path: '/members',
      name: 'members',
      component: Members,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/schedules-upload',
      name: 'schedules-upload',
      component: SchedulesUpload,
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp,
    },
  ],
})

export default router
