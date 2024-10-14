<script setup lang="ts">
// Props
const props = defineProps<{
  onClick?: () => void | Promise<void>
  class?: string
  theme?: string
}>()
</script>

<template>
  <button
    type="button"
    :class="`button ${theme || 'primary'} ${props.class || ''}`"
    @click="onClick"
  >
    <slot />
  </button>
</template>
