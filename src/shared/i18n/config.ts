import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { STORAGE_KEYS } from "../config/constants";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || "ru";

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: savedLanguage,
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
