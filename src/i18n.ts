import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import type { App } from 'vue'
import { LanguageEnum } from './configs/language'

export const i18nextPromise = i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    ns: ['common'],
    supportedLngs: Object.values(LanguageEnum),
    fallbackLng: LanguageEnum.En,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      order: ['localStorage', 'navigator'],
    },
    backend: {
      // Translation files URL
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    debug: false,
  })

export default function (app: App) {
  app.use(I18NextVue, { i18next })
  return app
}
