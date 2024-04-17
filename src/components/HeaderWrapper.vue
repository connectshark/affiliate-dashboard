<template>
<header class="sticky backdrop-blur-md bg-white/50">
  <div class=" w-11/12 mx-auto flex items-center justify-between ">
    <div class="py-2">
      <router-link to="/">
        <img class="w-16 inline-block" src="../assets/logo.png" alt="logo">
        <span>後台</span>
      </router-link>
    </div>
    <ul>
      <li>
        <button class=" bg-primary/20 rounded-md px-2 py-1" v-if="store.token" @click="logout" type="button">登出</button>
        <router-link v-else class=" inline-block bg-primary/20 rounded-md px-2 py-1" to="/login">登入</router-link>
      </li>
    </ul>
  </div>
</header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const store = useUserStore()
const router = useRouter()

const logout = async () => {
  store.token = ''
  router.replace('/login')
}
</script>