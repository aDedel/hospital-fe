<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import type { CountdownInterface } from '@/types/Countdown'

// Define model
const countdown = defineModel<CountdownInterface>({
  default: {
    isEnabled: true,
    counter: 10,
  },
})

// Define props
const props = defineProps<{ class: string }>()

// Watch for changes on field "isEnabled"
watch(
  () => countdown.value.isEnabled,
  isEnabled => {
    return isEnabled ? startCountdown() : clearCounterInterval()
  },
)

let intervalId: ReturnType<typeof setInterval> | null = null

/**
 * Start countdown
 */
const startCountdown = (): void => {
  clearCounterInterval()

  if (countdown.value.isEnabled) {
    intervalId = setInterval(() => {
      if (countdown.value.counter > 0) {
        countdown.value.counter -= 1
      } else {
        clearCounterInterval()
      }
    }, 1000)
  }
}

/**
 * Clear counter timeout
 */
const clearCounterInterval = (): void => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

/**
 * Restart countdown
 */
const restartCountdown = (counter: number): void => {
  countdown.value = {
    counter,
    isEnabled: true,
  }
  startCountdown()
}

// On mounted
onMounted((): void => {
  startCountdown()
})

// On unmounted
onUnmounted((): void => {
  clearCounterInterval()
})

// Expose methods
defineExpose({
  restartCountdown,
})
</script>

<template>
  <span :class="props.class">{{ countdown.counter }}</span>
</template>
