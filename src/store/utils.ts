import { Store, useWebStore } from '@/store';
import { Ref } from 'vue';

export const initStore = (store: Ref<Store>) => (store.value = useWebStore());
export const updateThemeStore = (store: Store, newTheme: string) => store.updateTheme(newTheme);
export const getStoredTheme = (store: Store) => store.theme;
