<template>
  <div id="app-wrapper">
    <AppHeader />
    <main class="flex-grow-1"> <router-view />
    </main>
    <AppFooter /> </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<style>
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1a1e22;
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

</style>
