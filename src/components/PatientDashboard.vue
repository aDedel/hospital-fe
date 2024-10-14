<script setup lang="ts">
import { ref } from 'vue'
import DisplayCountdown from '@/components/DisplayCountdown.vue'
import FormButton from '@/components/Form/FormButton.vue'
import PatientForm from '@/components/PatientForm.vue'
import PatientHistory from '@/components/PatientHistory.vue'
import ActionIcon from '@/components/icons/ActionIcon.vue'
import AdministerIcon from '@/components/icons/AdministerIcon.vue'
import HistoryIcon from '@/components/icons/HistoryIcon.vue'
import ProcessStartIcon from '@/components/icons/ProcessStartIcon.vue'
import ProcessStopIcon from '@/components/icons/ProcessStopIcon.vue'
import QuarantineIcon from '@/components/icons/QuarantineIcon.vue'
import RecycleIcon from '@/components/icons/RecycleIcon.vue'
import type { CountdownInterface } from '@/types/Countdown'
import type { HistoryInterface } from '@/types/History'
import { convertToBoolean } from '@/lib/utils'
import { DrugsEnum, type PatientsRegister, Quarantine } from 'hospital-lib'

defineProps<{
  title: string
}>()

const apiInterval = parseInt(import.meta.env.VITE_API_INTERVAL, 10) || 30
const overloadPatients = convertToBoolean(
  import.meta.env.VITE_OVERLOAD_PATIENTS,
)

let intervalAutomaticProcess: ReturnType<typeof setInterval> | undefined

// Ref for PatientForm
type PatientFormInstance = InstanceType<typeof PatientForm>
const patientFormRef = ref<PatientFormInstance | null>(null)
// Ref for Countdown
type CountdownInstance = InstanceType<typeof DisplayCountdown>
const countdownRef = ref<CountdownInstance | null>(null)
// Refs
const patientsRegister = ref<PatientsRegister>({})
const drugs = ref<DrugsEnum[]>([])
const histories = ref<HistoryInterface[]>([])
const isAutomaticProcessEnabled = ref<boolean>(false)
const countdown = ref<CountdownInterface>({
  isEnabled: isAutomaticProcessEnabled.value,
  counter: apiInterval,
})

/**
 * Administrate register
 */
const administrateRegister = (): PatientsRegister => {
  const quarantine = new Quarantine(patientsRegister.value)
  quarantine.setDrugs(drugs.value)
  quarantine.wait40Days()

  const report = quarantine.report()
  if (histories.value.length >= 10) {
    histories.value.shift()
  }
  histories.value.push({
    date: new Date(),
    patientsRegister: patientsRegister.value,
    drugs: drugs.value,
    report,
  })

  // According to the configuration, overload patient state
  if (overloadPatients) {
    patientsRegister.value = report
  }

  return report
}

/**
 * Start/Stop automatic process
 */
const toggleAutomaticProcess = (): void => {
  if (isAutomaticProcessEnabled.value) {
    if (intervalAutomaticProcess) {
      clearInterval(intervalAutomaticProcess)
    }

    isAutomaticProcessEnabled.value = false

    // Stop countdown
    countdown.value.isEnabled = false
  } else {
    doAutomaticProcess()

    // Start automatic process
    intervalAutomaticProcess = setInterval(
      () => {
        doAutomaticProcess()
      },
      (apiInterval + 1) * 1000,
    )

    isAutomaticProcessEnabled.value = true
  }
}

/**
 * Do automatic process
 */
const doAutomaticProcess = async (): Promise<void> => {
  if (patientFormRef.value) {
    await patientFormRef.value?.loadPatientsFromHospitalApi()
    await patientFormRef.value?.loadDrugsFromHospitalApi()
    administrateRegister()

    // Restart countdown
    restartCountdown()
  }
}

/**
 * Reset histories
 */
const resetHistories = (): void => {
  histories.value = []
}

/**
 * Restart countdown
 */
const restartCountdown = (): void => {
  countdownRef.value?.restartCountdown(apiInterval)
}
</script>

<template>
  <div class="p-4">
    <h1 class="img-and-text">
      <QuarantineIcon class="w-6 h-6" />
      {{ title }}
    </h1>

    <PatientForm
      ref="patientFormRef"
      v-model:patientsRegister="patientsRegister"
      v-model:drugs="drugs"
    />

    <h2 class="img-and-text">
      <ActionIcon class="w-4 h-4" />{{ $t('Actions') }}
    </h2>
    <div class="grid grid-cols-12 lg:flex gap-2 mb-12">
      <FormButton :onclick="administrateRegister" class="col-span-12">
        <div class="img-and-text">
          <AdministerIcon class="w-6 h-6" /> {{ $t('Administer medications') }}
        </div>
      </FormButton>

      <FormButton :onclick="toggleAutomaticProcess" class="col-span-12">
        <div class="img-and-text">
          <ProcessStopIcon v-if="isAutomaticProcessEnabled" class="w-6 h-6" />
          <ProcessStartIcon v-else class="w-6 h-6" />
          {{
            $t(
              (isAutomaticProcessEnabled ? 'Stop' : 'Start') +
                ' automatic process',
            )
          }}
          <DisplayCountdown
            ref="countdownRef"
            v-if="isAutomaticProcessEnabled"
            v-model="countdown"
            class="text-xs border-2 border-white rounded-full w-6 h-6 flex items-center justify-center"
          />
        </div>
      </FormButton>

      <FormButton
        theme="bg-red-700"
        class="text-white col-span-12"
        :onclick="resetHistories"
      >
        <div class="img-and-text">
          <RecycleIcon class="w-6 h-6" /> {{ $t('Reset history') }}
        </div>
      </FormButton>
    </div>

    <PatientHistory :histories="histories">
      <template #title>
        <h2 class="img-and-text">
          <HistoryIcon class="w-4 h-4" /> {{ $t('History') }}
        </h2>
      </template>
    </PatientHistory>
  </div>
</template>
