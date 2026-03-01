---
name: sync-cv-to-portfolio
description: Syncs portfolio content from the full CV PDF. Reads public/cv-full.pdf and updates src/data/skills.ts (skillsCategories) and src/views/About/About.vue (bio paragraphs) to match the CV. Use when the user updates their CV, wants to refresh portfolio content from their CV, or says something like "update portfolio from CV", "sync CV", or "my CV changed".
---

# Sync CV to Portfolio

Reads `public/cv-full.pdf` and updates two files to match the CV content.

## Files to update

| File | What to extract from CV |
|------|------------------------|
| `src/data/skills.ts` | Tech Stack section → `skillsCategories` array |
| `src/views/About/About.vue` | "About me" / profile summary → bio `<p>` paragraphs |

## Step-by-step

### 1. Read the CV

Read `public/cv-full.pdf`. Look for these sections:
- **Profile/summary block** at the top (short intro paragraphs — the "who I am" text).
- **Tech Stack** or **Skills** section (usually a table or list grouped by area: Frontend, Testing, DevOps, etc.).
- Ignore experience timeline, education dates, and contact info — those go in other files.

### 2. Update `src/data/skills.ts`

Replace `skillsCategories` with the categories found in the CV's tech stack. Keep the same TypeScript structure:

```ts
export const skillsCategories: SkillsCategory[] = [
  { title: 'Frontend', skills: ['...'] },
  { title: 'Testing',  skills: ['...'] },
  // one entry per category found in the CV
];
```

Do not touch `skillsData` (legacy list) or the `SkillsCategory` interface.

### 3. Update `src/views/About/About.vue`

Replace only the `<p>` elements inside `.about-content` that describe the professional profile. Keep:
- The `<h2>Get to know me!</h2>` heading.
- The final personal paragraph (hobbies, Korok seeds, etc.) if it exists and is not in the CV.

Do not touch the template structure, script, or style blocks.

### 4. Update icon map in `src/views/Skills/Skills.vue`

If new category names are added that don't have an icon in `categoryIcon()`, add sensible MDI icons:

```ts
const icons: Record<string, string> = {
  Frontend:           'mdi-web',
  Testing:            'mdi-test-tube',
  'DevOps & CI/CD':   'mdi-cloud-braces',
  'AI & Automation':  'mdi-robot',
  'Tools & Leadership': 'mdi-briefcase-outline',
  'Game Dev':         'mdi-gamepad-variant',
  // add new ones here
};
```

## Rules

- Keep all existing TypeScript types and exports — only replace data values.
- Write clean, idiomatic English in bio paragraphs (no raw PDF line breaks or OCR artifacts).
- If the CV is ambiguous, prefer the most recent/senior framing of the role.
- Do not update `public/cv-compact.pdf`, `src/data/projects.ts`, `src/data/experience.ts`, or any other file unless explicitly asked.
- After changes, confirm which fields were updated and what was changed.
