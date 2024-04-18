<template>
<HeaderWrapper/>
<main>
  <div class="mx-auto w-11/12 pt-10">
    <slot/>
  </div>
</main>

</template>

<script setup>
import HeaderWrapper from '../components/HeaderWrapper.vue'
</script>