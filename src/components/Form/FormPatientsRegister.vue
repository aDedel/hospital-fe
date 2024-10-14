<script setup lang="ts">
import { handleEvent } from '@/lib/handleEvent'
import { convertToBoolean } from '@/lib/utils'
import { PatientStatesEnum, type PatientsRegister } from 'hospital-lib'

const disableDeadState = convertToBoolean(
  import.meta.env.VITE_DISABLE_DEAD_STATE,
)

// Init ref patients register
const patientsRegister = defineModel<PatientsRegister>({ default: {} })

// Retrieve list of patient states from enum
const listPatientStates = Object.values(PatientStatesEnum).filter(
  state => !disableDeadState || state !== PatientStatesEnum.Dead,
)

/**
 * Change state value
 */
const changeStateValue = (
  state: PatientStatesEnum,
  target: HTMLInputElement,
): void => {
  // Reset dead people, not administrable
  const deadState = !disableDeadState ? {} : { [PatientStatesEnum.Dead]: 0 }

  patientsRegister.value = {
    ...patientsRegister.value,
    ...deadState,
    [state]: parseInt(target.value, 10) || 0,
  }
}
</script>

<template>
  <slot name="title"></slot>

  <div class="main">
    <label v-for="(state, index) in listPatientStates" :key="`state-${index}`">
      <span class="block">{{ $t(`PatientState_${state}`) }}</span>
      <input
        type="number"
        :name="state"
        :value="patientsRegister[state] || 0"
        @input="handleEvent($event, state, changeStateValue)"
        class="appearance-none"
        min="0"
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
  @apply col-span-6 lg:col-span-3 flex gap-2 items-center bg-zinc-500 dark:bg-zinc-600 rounded-lg py-1 px-2 lg:px-3 text-white;
}
.main input {
  @apply w-14 h-8 ml-2 text-right;
  @apply border-0 rounded-lg;
}
.main .button-slot {
  @apply col-span-12;
}
</style>
