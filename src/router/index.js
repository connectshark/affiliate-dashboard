import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { useUserStore } from '../stores/user'
import { pinia } from '../stores/index'

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from) {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const store = useUserStore(pinia)
  const paths = ['/', '/callback']
  if (!paths.includes(to.path) && !store.token) return { path: '/' }
  return true
})
if (import.meta.hot) { 
  handleHotUpdate(router) 
} 

export default router
