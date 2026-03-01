# Jose Carlos González — Web Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-josecarlosgonzalezv.github.io-blue?style=flat-square&logo=github)](https://josecarlosgonzalezv.github.io/web-portfolio/)
[![CI/CD](https://github.com/josecarlosgonzalezv/web-portfolio/actions/workflows/cicd.yml/badge.svg)](https://github.com/josecarlosgonzalezv/web-portfolio/actions/workflows/cicd.yml)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vuetify](https://img.shields.io/badge/Vuetify-3-1867c0?style=flat-square&logo=vuetify)](https://vuetifyjs.com/)

Personal portfolio built with **Vue 3**, **TypeScript**, and **Vuetify 3**. Features smooth animations, a responsive layout, dark/light theme switcher, and auto-deploys to GitHub Pages via GitHub Actions.

🔗 **[View live →](https://josecarlosgonzalezv.github.io/web-portfolio/)**

---

## Sections

| Section | Description |
|---|---|
| **Home** | Introduction and call to action |
| **About** | Background, values, and personal story |
| **Skills** | Categorized tech skills (Frontend, Testing, DevOps, AI & Automation, Game Dev) |
| **Experience** | Professional timeline (Lumen, EY / Accenture, EVAD) |
| **Projects** | Showcased projects with video demos |
| **Resume** | Downloadable CV |
| **Contact** | Contact form with validation |

---

## Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Vue 3 (Composition API) + TypeScript |
| **UI Library** | Vuetify 3 + Material Design Icons |
| **State** | Pinia |
| **Routing** | Vue Router 5 |
| **Animations** | @vueuse/motion |
| **Styling** | SCSS + Vuetify theming |
| **Form validation** | @vuelidate/core |
| **Build** | Vite 7 |
| **Linting** | ESLint + Prettier |
| **Package manager** | pnpm |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [pnpm](https://pnpm.io/) v9+

```bash
# Install pnpm if you don't have it
npm install -g pnpm
```

### Installation

```bash
# Clone the repository
git clone https://github.com/josecarlosgonzalezv/web-portfolio.git
cd web-portfolio

# Install dependencies
pnpm install
```

### Development

```bash
pnpm serve
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
pnpm build
```

Output is generated in the `dist/` folder.

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm serve` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm deploy` | Deploy `dist/` to the `gh-pages` branch |
| `pnpm lint` | Run ESLint and auto-fix issues |
| `pnpm lint:checker` | Run ESLint without fixing (used in CI) |
| `pnpm prettier` | Format source files with Prettier |
| `pnpm prettier:checker` | Check formatting without modifying files (used in CI) |

---

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ArrowDown/
│   ├── CustomDivider/
│   ├── Drawer/
│   ├── Footer/
│   ├── NavBar/
│   ├── ProjectCard/
│   ├── SectionLayout/
│   └── ThemeSelector/
├── composables/       # Vue composables
├── constants/         # Shared types and breakpoints
├── data/              # Static data (projects, skills, experience)
├── services/          # Router configuration
├── styles/            # Global styles
└── views/             # Page-level components
    ├── Home/
    ├── About/
    ├── Skills/
    ├── Experience/
    ├── Projects/
    ├── Resume/
    └── Contact/
```

---

## CI/CD

The project uses **GitHub Actions** (`.github/workflows/cicd.yml`) with the following pipeline:

1. **On every PR to `main`**: runs lint and prettier checks, then builds the project.
2. **On merge to `main`**: additionally creates a versioned GitHub Release (based on `package.json` version) and deploys the build to **GitHub Pages**.

---

## Contact

- **Portfolio** — [josecarlosgonzalezv.github.io/web-portfolio](https://josecarlosgonzalezv.github.io/web-portfolio/)
- **LinkedIn** — [linkedin.com/in/josegnzl](https://www.linkedin.com/in/josegnzl/)
- **Email** — sbgonzalezjosecarlos@gmail.com
