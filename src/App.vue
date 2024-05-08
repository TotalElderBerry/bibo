<script setup>
import { useStore } from './store';
import NavBar from './components/NavBar.vue';

const store = useStore()
</script>

<template>
  <div class="container mx-auto">
    <NavBar />
    <!-- <Home /> -->
    <router-view/>
  </div>
</template>

<style scoped>
</style>./store
