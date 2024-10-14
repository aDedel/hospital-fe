<script setup lang="ts">
import { PatientStatesEnum, type PatientsRegister } from 'hospital-lib'

const listPatientStates = Object.values(PatientStatesEnum)

defineProps<{
  patientsRegister: PatientsRegister
}>()
</script>

<template>
  <div class="flex flex-col">
    <span v-for="state in listPatientStates" :key="`state-${state}`">
      {{ $t(`PatientState_${state}`) }} : {{ patientsRegister[state] || '0' }}
    </span>
  </div>
</template>
