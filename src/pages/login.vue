<template>
<FullLayout>
  <div class=" text-center bg-white p-5">
    <div class="mb-4">
      <router-link to="/">
        <img class="w-8 inline-block" src="../assets/logo.png" alt="logo">
      </router-link>
    </div>
    <h1 class="text-2xl/loose mb-8">登入</h1>
    <p class="mb-8">
      <a class="bg-white px-4 py-2 rounded-lg shadow hover:shadow-xl transition-shadow" :href="url"><i class='bx bxl-google'></i>使用Google帳號登入</a>
    </p>
    <p>
      <router-link class=" text-xs underline" to="/">回首頁</router-link>
    </p>
  </div>
</FullLayout>
</template>
  
<script setup>
import FullLayout from '../layouts/FullLayout.vue'
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&redirect_uri=${REDIRECT_URI}&response_type=code&client_id=${CLIENT_ID}`
</script>