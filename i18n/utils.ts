import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n";
import { LANGUAGE_KEY } from "./index";

export const setAppLanguage = async (lang: string) => {
  await i18n.changeLanguage(lang);

  if (Platform.OS === "web") {
    localStorage.setItem("app_language", lang);
  } else {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  }
};
