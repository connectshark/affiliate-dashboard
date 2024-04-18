import { createRouter, createWebHistory } from 'vue-router/auto'
import { useUserStore } from '../stores/user'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL)
})

router.beforeEach((to) => {
  const store = useUserStore()
  const paths = ['/', '/callback']
  if (!paths.includes(to.path) && !store.token) return { path: '/' }
  return true
})

export default router
