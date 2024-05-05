<script setup>
import NavBar from './components/NavBar.vue';
import Home from './pages/Home.vue';
</script>

<template>
  <div class="container mx-auto">
    <NavBar />
    <!-- <Home /> -->
    <router-view/>
  </div>
</template>

<style scoped>
</style>
