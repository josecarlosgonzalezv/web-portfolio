import { SourceLanguageCode, TargetLanguageCode, TranslationResponse } from '@/services/types';

const API_KEY = String(import.meta.env.VITE_DEEPL_API_KEY);
const API_URL = 'https://api-free.deepl.com/v2/translate';

export const translateText = async (text: string, lang: SourceLanguageCode): Promise<string> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      auth_key: API_KEY,
      text: text,
      target_lang: lang,
    }),
  });

  const data: TranslationResponse = await response.json();

  return data.translations[0].text;
};
