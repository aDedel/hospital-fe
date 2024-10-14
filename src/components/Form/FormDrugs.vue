<script setup lang="ts">
import { handleEvent } from '@/lib/handleEvent'
import { DrugsEnum } from 'hospital-lib'

// Retrieve list of drugs from enum
const listDrugs = Object.values(DrugsEnum)

// Init ref patients register
const drugs = defineModel<DrugsEnum[]>({ default: [] })

/**
 * Change drug value
 */
const changeDrugValue = (drug: DrugsEnum, target: HTMLInputElement): void => {
  if (target.checked) {
    drugs.value.push(drug)
  } else {
    drugs.value = drugs.value.filter(cDrug => cDrug !== drug)
  }
}
</script>

<template>
  <slot name="title"></slot>

  <div class="main">
    <label v-for="drug in listDrugs" :key="`drug-${drug}`">
      <span class="block">{{ $t(`Drug_${drug}`) }}</span>
      <input
        type="checkbox"
        :name="drug"
        :checked="drugs.includes(drug)"
        @change="handleEvent($event, drug, changeDrugValue)"
      />
    </label>

    <div class="button-slot">
      <slot name="button"></slot>
    </div>
  </div>
</template>

<style scoped>
.main {
  @apply grid grid-cols-12 gap-4 mb-4 lg:flex lg:flex-wrap;
}
.main .block {
  @apply flex-1;
}
.main label {
  @apply col-span-6 sm:col-span-3 flex gap-2 items-center bg-zinc-500 dark:bg-zinc-600 rounded-lg py-1 px-2 lg:px-3 text-white;
}
.main input {
  @apply ml-2;
}
.main .button-slot {
  @apply col-span-12;
}
</style>
