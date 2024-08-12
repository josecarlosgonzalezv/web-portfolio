import { defineStore } from 'pinia';
import { Lang, WebState } from '@/store/types';

export const useWebStore = defineStore('WebStore', {
  state: (): WebState => ({
    theme: 'dark',
    lang: {
      source: 'en',
      target: 'en-GB',
    },
  }),

  actions: {
    updateTheme(theme: string) {
      this.theme = theme;
    },

    updateLang(lang: Lang) {
      this.lang = lang;
    },
  },
});

export type Store = ReturnType<typeof useWebStore>;
