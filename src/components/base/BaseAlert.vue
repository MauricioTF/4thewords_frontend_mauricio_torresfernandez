<template>
  <div v-if="message" :class="`alert alert-${type}`" role="alert">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: 'success' | 'danger' | 'warning' | 'info'
  message: string
}>()
</script>
