<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ label }}</label>
    <select
      :id="id"
      class="form-select"
      v-model="localValue"
      :required="required"
    >
      <option disabled value="">Seleccione una opción</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  id: string
  label: string
  modelValue: string | number
  options: { value: string | number; label: string }[]
  required?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    localValue.value = newVal
  }
)

watch(localValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>
