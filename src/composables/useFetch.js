import { ref, unref, watchEffect } from 'vue'
import { useUserStore } from '../stores/user'

export default (url) => {
  const store = useUserStore()
  const loading = ref(false)
  const data = ref(null)
  const error = ref(null)

  const doFetch = async () => {
    loading.value = true
    error.value = null
    const API_URL = unref(url)
    const fetch_response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${store.token}`
      }
    })
    if (fetch_response.ok) {
      const response = await fetch_response.json()
      data.value = response
    } else {
      error.value = {
        code: fetch_response.status,
        msg: errorMsgObject[fetch_response.status]
      }
    }
    loading.value = false
  }

  watchEffect(() => {
    doFetch()
  })
  
  return {
    loading,
    data,
    error
  }
}

const errorMsgObject = {
  401: '尚未登入',
  403: '登入過期',
  429: '稍等一下'
}