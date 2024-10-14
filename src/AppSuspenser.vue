<script setup lang="ts">
import App from './App.vue'
import LoaderIcon from '@/components/icons/LoaderIcon.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <App />
    </template>
    <template #fallback>
      <h1 class="img-and-text items-center h-screen justify-center">
        <LoaderIcon class="w-8 h-8" />
        <span class="ml-2">{{ $t('Loading...') }}</span>
      </h1>
    </template>
  </Suspense>
</template>
