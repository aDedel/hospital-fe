<script setup lang="ts">
import { ref } from 'vue'
import { useTranslation } from 'i18next-vue'
import { LanguageEnum } from '@/configs/language'

const { i18next } = useTranslation()

const langKey = 'lang'
const listLanguages = Object.values(LanguageEnum)
const currentLang = ref(localStorage.getItem(langKey) || LanguageEnum.En)

/**
 * Change language
 */
const changeLanguage = (lang: LanguageEnum | string): void => {
  // Set selected language to locale storage
  localStorage.setItem(langKey, lang)
  currentLang.value = lang

  // Change language
  i18next.changeLanguage(lang)
}
</script>

<template>
  <div class="flex divide-x divide-zinc-400 dark:divide-zinc-500">
    <button
      v-for="lang in listLanguages"
      :key="`lang-${lang}`"
      :class="`lang ${lang === currentLang ? 'selected' : ''}`"
      @click="changeLanguage(lang)"
    >
      {{ $t(`lang-${lang}`) }}
    </button>
  </div>
</template>

<style scoped>
.lang {
  @apply inline cursor-pointer px-2;
}
.lang.selected {
  @apply text-secondaryColor font-bold;
}
</style>
