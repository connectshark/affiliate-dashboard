import { createRouter, createWebHistory } from 'vue-router/auto'
import { useUserStore } from '../stores/user'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL)
})

router.beforeEach((to, from) => {
  const store = useUserStore()
  const paths = ['/login', '/callback']
  if (!paths.includes(to.path) && !store.token) return { path: '/login' }
  return true
})

export default router
