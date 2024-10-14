import type { Plugin } from 'vue'
import i18next from 'i18next'
import I18NextVue from 'i18next-vue' // Correct plugin import

export const setupI18n = (): {
  plugins: (Plugin | [Plugin, ...unknown[]])[]
} => {
  // Create and configure the i18next instance
  i18next.init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          'some.key': 'some translated text',
        },
      },
    },
  })

  return {
    plugins: [
      [I18NextVue, { i18next }], // Use i18next-vue with the initialized i18next instance
    ],
  }
}
