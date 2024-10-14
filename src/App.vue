<script setup lang="ts">
import { /*RouterLink,*/ RouterView } from 'vue-router'
import { i18nextPromise } from '@/i18n'
import ToggleLanguage from './components/ToggleLanguage.vue'

await i18nextPromise
</script>

<template>
  <header class="header-app">
    <span class="font-bold">PPL</span>
    <!-- <nav class="flex-1 flex items-center justify-center gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav> -->
    <div>
      <ToggleLanguage />
    </div>
  </header>

  <main class="main-app">
    <RouterView />
  </main>

  <footer class="footer-app">
    <span class="px-4">PPL</span>
    <span class="px-4">
      &copy; {{ new Date().getFullYear() }}
      <a href="https://www.propulse-lab.com">Propulse Lab</a>
    </span>
  </footer>
</template>

<style scoped>
.main-app {
  @apply flex-1;
}
.header-app {
  @apply flex gap-4 items-center justify-between;
}
.footer-app {
  @apply text-xs;
  @apply flex items-center justify-center divide-x;
}
</style>
