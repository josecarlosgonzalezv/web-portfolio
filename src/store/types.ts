import { SourceLanguageCode, TargetLanguageCode } from '@/services/types';

export interface WebState {
  theme: string;
  lang: Lang;
}

export interface Lang {
  source: SourceLanguageCode;
  target: TargetLanguageCode;
}
