<script setup lang="ts">
import { computed } from 'vue'
import type { HistoryInterface } from '@/types/History'
import DisplayDrugs from '@/components/DisplayDrugs.vue'
import DisplayPatientRegister from '@/components/DisplayPatientRegister.vue'
import { convertToBoolean } from '@/lib/utils'

const historyOrderAsc = convertToBoolean(import.meta.env.VITE_HISTORY_ORDER_ASC)

const props = defineProps<{
  histories: HistoryInterface[]
}>()

const historiesDisplay = computed(() =>
  historyOrderAsc ? props.histories : [...props.histories].reverse(),
)

const formatDate = (date: Date): string => {
  // Then specify how you want your dates to be formatted
  return new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(date)
}
</script>

<template>
  <div class="history">
    <slot name="title"></slot>

    <div class="table">
      <table>
        <thead>
          <tr>
            <th>{{ $t('Date') }}</th>
            <th>{{ $t('Initial state') }}</th>
            <th>{{ $t('Drugs') }}</th>
            <th>{{ $t('Final state') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(history, index) in historiesDisplay"
            :key="`report-${index}`"
          >
            <td>
              {{ formatDate(history.date) }}
            </td>
            <td>
              <DisplayPatientRegister
                :patients-register="history.patientsRegister"
              />
            </td>
            <td>
              <DisplayDrugs :drugs="history.drugs" />
            </td>
            <td>
              <DisplayPatientRegister :patients-register="history.report" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.main {
  @apply p-4;
}

.table {
  @apply w-full  rounded-xl overflow-hidden;
  @apply shadow-md shadow-black/10;
}
</style>
