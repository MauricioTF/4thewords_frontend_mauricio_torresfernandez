<template>
  <button :type="type" class="btn btn-primary">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
}>()
</script>
