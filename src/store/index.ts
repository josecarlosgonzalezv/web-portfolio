import { defineStore } from 'pinia';
import { WebState } from '@/store/types';

export const useWebStore = defineStore('WebStore', {
  state: (): WebState => ({
    theme: 'dark',
  }),

  actions: {
    updateTheme(theme: string) {
      this.theme = theme;
    },
  },
});

export type Store = ReturnType<typeof useWebStore>;
