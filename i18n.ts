import i18n, { Module } from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en.json';
import es from './locales/es.json';
import zh from './locales/zh.json';

// 配置语言检测
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lng: string) => void) => {
    const savedDataJSON = await AsyncStorage.getItem('user-language');
    const lng = savedDataJSON ? savedDataJSON : null;
    const selectLanguage = lng || 'en';
    callback(selectLanguage);
  },
  init: () => { },
  cacheUserLanguage: (lng: string) => {
    AsyncStorage.setItem('user-language', lng);
  }
};
i18n
  .use(languageDetector as Module)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      es: { translation: es },
      zh: { translation: zh }
    },
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  });

export default i18n;
