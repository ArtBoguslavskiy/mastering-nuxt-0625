<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <label
    class="rounded text-white font-bold py-2 px-4 cursor-pointer"
    :class="{
      'bg-green-500': modelValue,
      'bg-gray-500': !modelValue,
    }"
  >
    <input
      type="checkbox"
      :value="modelValue"
      class="hidden"
      @input="() => $emit('update:modelValue', !modelValue)"
    >
    {{ modelValue ? 'Completed!' : 'Mark as complete' }}
  </label>
</template>

<style scoped>
::selection {
  display: none;
}
</style>
