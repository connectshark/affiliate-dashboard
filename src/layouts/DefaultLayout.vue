<template>
<header class="sticky top-0 backdrop-blur-md navbar">
  <div class=" w-11/12 mx-auto flex items-center justify-between ">
    <div class="py-2">
      <router-link class="btn btn-ghost" to="/">
        <img class="w-8 inline-block" src="../assets/logo.png" alt="logo">
        <span>後台</span>
      </router-link>
    </div>
    <ul class=" flex items-center gap-2">
      <li>
        <button class=" cursor-pointer bg-white rounded-md px-2 py-1" v-if="store.token" @click="logout" type="button">登出</button>
        <router-link v-else class=" inline-block bg-primary/20 rounded-md px-2 py-1" to="/">登入</router-link>
      </li>
    </ul>
  </div>
</header>
<main>
  <div class="mx-auto w-11/12 pt-10">
    <slot/>
  </div>
</main>

</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const store = useUserStore()
const router = useRouter()

const logout = () => {
  store.token = ''
  router.replace('/login')
}
</script>