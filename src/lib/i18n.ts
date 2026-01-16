import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import statusRu from "@/locales/ru/status.json";

i18next.use(initReactI18next).init({
  resources: {
    ru: {
      status: statusRu,
    },
  },
  debug: true,
  defaultNS: "status",
  lng: "ru",
  fallbackLng: "ru",
});

export const i18n = i18next;

export default i18next;
