/**
 * Composable for section-based scroll navigation.
 * Use for single-page layouts where the nav bar scrolls to sections and syncs the active tab with the URL.
 * SECTION_TABS is the single source of truth for section order and ids; SECTION_IDS is derived from it.
 */

export interface SectionTab {
  name: string;
  value: string;
  route: string;
  elementId: string;
}

export const SECTION_TABS: SectionTab[] = [
  { name: 'Home', value: 'home', route: '/home', elementId: 'home-section' },
  { name: 'About me', value: 'about', route: '/about', elementId: 'about-section' },
  { name: 'Resume', value: 'resume', route: '/resume', elementId: 'resume-section' },
  { name: 'Skills', value: 'skills', route: '/skills', elementId: 'skills-section' },
  { name: 'Projects', value: 'projects', route: '/projects', elementId: 'projects-section' },
  { name: 'Contact', value: 'contact', route: '/contact', elementId: 'contact-section' },
];

export const SECTION_IDS: readonly string[] = SECTION_TABS.map((t) => t.elementId);

export type SectionId = (typeof SECTION_TABS)[number]['elementId'];

/**
 * Scrolls to the element with the given id. Uses scrollIntoView so it works with any scroll container.
 * If the element is not in the DOM yet, waits for it (e.g. useful on initial route load).
 */
export function scrollToSection(
  id: string,
  options: {
    behavior?: ScrollBehavior;
  } = {}
): void {
  const behavior = options.behavior ?? 'smooth';
  const tryScroll = (): boolean => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior, block: 'start' });
      return true;
    }
    return false;
  };

  if (tryScroll()) return;

  const maxWait = 80;
  let attempts = 0;
  const waitForElement = () => {
    attempts++;
    if (tryScroll() || attempts >= maxWait) return;
    requestAnimationFrame(waitForElement);
  };

  requestAnimationFrame(waitForElement);
}

export function getActiveSectionId(sectionIds: readonly string[], offset = 100): string | null {
  for (const id of sectionIds) {
    const el = document.getElementById(id);

    if (!el) continue;

    const rect = el.getBoundingClientRect();

    if (rect.top <= offset && rect.bottom > offset) {
      return id;
    }
  }

  const lastId = sectionIds[sectionIds.length - 1];

  return lastId ?? null;
}
