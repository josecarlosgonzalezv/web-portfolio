import type { SocialLink } from '@/constants/types';
import socialLinksJson from '@/data/socialLinks.json';

export function useSocialLinks(): SocialLink[] {
  return Array.isArray(socialLinksJson) ? (socialLinksJson as SocialLink[]) : [];
}
