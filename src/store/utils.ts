import { Store, useWebStore } from '@/store';
import { Ref } from 'vue';
import { Lang } from '@/store/types';

export const initStore = (store: Ref<Store>) => (store.value = useWebStore());

export const updateThemeStore = (store: Store, newTheme: string) => store.updateTheme(newTheme);
export const updateLangStore = (store: Store, newLang: Lang) => store.updateLang(newLang);

export const getStoredTheme = (store: Store) => store.theme;
export const getStoredLang = (store: Store) => store.lang;
