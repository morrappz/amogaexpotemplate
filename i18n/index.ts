import i18n from "i18next"; // setup i18next
import { initReactI18next } from "react-i18next"; //connect i18next to react
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage"; // save to local storage
import translationEn from "./locales/en-US/translations.json";
import translationTe from "./locales/te-TE/translations.json";
import translationHi from "./locales/hi-HI/translations.json";
import translationVi from "./locales/vi-VI/translations.json";
import translationMs from "./locales/ms-MS/translations.json";
import { Platform } from "react-native";

const resources = {
  "en-US": { translation: translationEn },
  en: { translation: translationEn },
  "te-TE": { translation: translationTe },
  te: { translation: translationTe },
  "hi-HI": { translation: translationHi },
  hi: { translation: translationHi },
  "vi-VI": { translation: translationVi },
  vi: { translation: translationVi },
  "ms-MS": { translation: translationMs },
};

export const LANGUAGE_KEY = "@app_language";

const initI18n = async () => {
  try {
    let savedLanguage;
    // Try to get saved language preference
    if (Platform.OS === "web") {
      savedLanguage = localStorage.getItem("app_language");
    } else {
      savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    }

    // Determine which language to use
    let selectedLanguage = savedLanguage;
    console.log("selected-language-----", selectedLanguage);

    if (!selectedLanguage) {
      // If no saved language, use device locale or fallback
      const deviceLocales = Localization.getLocales();
      console.log("device-locale------", deviceLocales);
      const deviceLocale = deviceLocales[0]?.languageTag || "en-US";
      const languageCode = deviceLocale.split("-")[0];

      // Try exact locale match first
      if (deviceLocale in resources) {
        selectedLanguage = deviceLocale;
      }

      // Then try language code match
      else if (languageCode in resources) {
        selectedLanguage = languageCode;
      } else {
        selectedLanguage = "en-US";
      }
    }

    await i18n.use(initReactI18next).init({
      resources,
      lng: selectedLanguage,
      fallbackLng: {
        "en-*": ["en-US", "en"],
        "te-*": ["te-IN", "te", "en-US"],
        "hi-*": ["hi-IN", "hi", "en-US"],
        "vi-*": ["vi-VN", "vi", "en-US"],
        "ms-*": ["ms-MY", "ms", "en-US"],

        default: ["en-US"],
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

    // Save the selected language
    if (!savedLanguage) {
      if (Platform.OS === "web") {
        localStorage.setItem("app_language", selectedLanguage);
      } else {
        await AsyncStorage.setItem(LANGUAGE_KEY, selectedLanguage);
      }
    }
  } catch (error) {
    console.error("Error initializing i18n:", error);

    // Initialize with defaults if there's an error
    await i18n.use(initReactI18next).init({
      resources,
      lng: "en-US",
      fallbackLng: "en-US",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  }
};

initI18n();

export default i18n;
