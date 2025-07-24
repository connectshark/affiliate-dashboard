<template>
  <FullLayout>
    <div class="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center">
      <div class="mb-6">
        <router-link to="/">
          <img class="w-12 inline-block" src="../assets/logo.png" alt="logo">
        </router-link>
      </div>
      <h1 class="text-3xl font-bold mb-4 text-gray-800">歡迎回來</h1>
      <p class="text-gray-600 mb-8">使用您的 Google 帳號快速登入</p>
      <a class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 inline-flex items-center gap-2" :href="url">
        <i class='bx bxl-google text-xl'></i>
        <span>使用 Google 帳號登入</span>
      </a>
      <p v-if="store.token" class="mt-8">
        <router-link class="text-sm text-gray-500 hover:text-gray-700 underline" to="/home">前往儀表板</router-link>
      </p>
    </div>
  </FullLayout>
</template>
  
<script setup>
import FullLayout from '../layouts/FullLayout.vue'
import { useUserStore } from '../stores/user'

const store = useUserStore()

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&redirect_uri=${REDIRECT_URI}&response_type=code&client_id=${CLIENT_ID}`
</script>