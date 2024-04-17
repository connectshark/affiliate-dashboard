<template>
<FullLayout>
  <div class=" text-center bg-white p-5">
    <h1>loading...</h1>
    <p>
      <router-link replace class=" text-xs underline" to="/">回首頁</router-link>
    </p>
  </div>
</FullLayout>
</template>

<script setup>
import FullLayout from '../layouts/FullLayout.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const route = useRoute()
const store = useUserStore()
store.token = route.query.access_token || ''

const router = useRouter()
router.replace('/')
</script>
