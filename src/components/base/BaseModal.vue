<template>
  <div
    class="modal fade"
    tabindex="-1"
    ref="modalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog" :class="dialogClass">
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineExpose } from 'vue'
import { Modal } from 'bootstrap'

const modalRef = ref<HTMLElement | null>(null)
let modalInstance: Modal | null = null

defineProps<{dialogClass?: string}>()

onMounted(() => {
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value, {
      backdrop: 'static',
      keyboard: false
    })
  }
})

function show() {
  modalInstance?.show()
}

function hide() {
  modalInstance?.hide()
}

defineExpose({ show, hide })
</script>
