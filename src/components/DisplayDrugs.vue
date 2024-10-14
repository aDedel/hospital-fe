<script setup lang="ts">
import { DrugsEnum } from 'hospital-lib'

defineProps<{
  drugs: DrugsEnum[]
}>()
</script>

<template>
  <div class="flex flex-col">
    <span v-for="drug in drugs" :key="`drug-${drug}`">
      {{ $t(`Drug_${drug}`) }}
    </span>
  </div>
</template>
