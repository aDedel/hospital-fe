<script setup lang="ts">
import { ref } from 'vue'
import { useTranslation } from 'i18next-vue'
import { DrugsEnum, type PatientsRegister } from 'hospital-lib'
import FormButton from '@/components/Form/FormButton.vue'
import FormDrugs from '@/components/Form/FormDrugs.vue'
import FormPatientsRegister from '@/components/Form/FormPatientsRegister.vue'
import DrugIcon from '@/components/icons/DrugIcon.vue'
import PatientIcon from '@/components/icons/PatientIcon.vue'
import { HospitalApiService } from '@/services/HospitalApiService'

const { t } = useTranslation()

// Model
const patientsRegister = defineModel<PatientsRegister>('patientsRegister', {
  default: {},
})
const drugs = defineModel<DrugsEnum[]>('drugs', { default: [] })

// Ref
const errMsg = ref<string | undefined>()

/**
 * Load patients from hospital API
 */
const loadPatientsFromHospitalApi = async (): Promise<void> => {
  try {
    patientsRegister.value = await new HospitalApiService().getPatients()
    errMsg.value = undefined
  } catch (err) {
    errMsg.value = `${t('Cannot call hospital api')}: ${err instanceof Error ? err.message : ''}`
  }
}

/**
 * Load drugs from hospital API
 */
const loadDrugsFromHospitalApi = async (): Promise<void> => {
  try {
    drugs.value = await new HospitalApiService().getDrugs()
    errMsg.value = undefined
  } catch (err) {
    errMsg.value = `${t('Cannot call hospital api')}: ${err instanceof Error ? err.message : ''}`
  }
}

/**
 * Expose methods
 */
defineExpose({
  loadPatientsFromHospitalApi,
  loadDrugsFromHospitalApi,
})
</script>

<template>
  <form v-on:submit.prevent>
    <div class="flex flex-col gap-2 mb-4">
      <FormPatientsRegister v-model="patientsRegister">
        <template #title>
          <h2 class="img-and-text">
            <PatientIcon class="w-4 h-4" /> {{ $t('Patients') }}
          </h2>
        </template>
        <template #button>
          <FormButton class="w-full" :onClick="loadPatientsFromHospitalApi">
            {{ $t('Load patients') }}
          </FormButton>
        </template>
      </FormPatientsRegister>

      <FormDrugs v-model="drugs">
        <template #title>
          <h2 class="img-and-text">
            <DrugIcon class="w-4 h-4" /> {{ $t('Drugs') }}
          </h2>
        </template>
        <template #button>
          <FormButton class="w-full" :onClick="loadDrugsFromHospitalApi">
            {{ $t('Load drugs') }}
          </FormButton>
        </template>
      </FormDrugs>
    </div>

    <div v-if="errMsg" name="error" v-bind:err="errMsg">
      <span class="border rounded-lg border-red-700 p-1 text-error bold">
        {{ $t('Error') }}: {{ errMsg }}
      </span>
    </div>
  </form>
</template>

<style scoped></style>
