import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Load translations from /locales
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // Default language
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },
    backend: {
      loadPath: '/i18n/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;