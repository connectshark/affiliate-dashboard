import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const errorMsgObject = {
  401: '尚未登入',
  403: '登入過期',
  404: '找不到',
  429: '稍等一下'
}

export default (uri) => {
  const store = useUserStore()
  const loading = ref(false)
  const data = ref(null)
  const error = ref(null)
  const API_DOMAIN = import.meta.env.VITE_API_URI
  const API_URL = API_DOMAIN + uri

  const doFetch = async ({ queries = undefined, method = 'GET', body = undefined }) => {
    loading.value = true
    error.value = null
    const FULL_API_URL = queries ? API_URL + `?` + queries : API_URL
    const fetch_options = {
      method,
      headers: {
        Authorization: `Bearer ${store.token}`
      }
    }
    if (body) {
      fetch_options.body = JSON.stringify(body)
      fetch_options.headers['Content-Type'] = 'application/json'
    }
    try {
      const fetch_response = await fetch(FULL_API_URL, fetch_options)
      if (fetch_response.ok) {
        const response = await fetch_response.json()
        data.value = response
      } else {
        const code = fetch_response.status || 404
        error.value = {
          code: code,
          msg: errorMsgObject[code] || '未知錯誤'
        }
      }
    } catch (err) {
      error.value = {
        code: 500,
        msg: '內部伺服器錯誤'
      }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    data,
    error,
    doFetch
  }
}