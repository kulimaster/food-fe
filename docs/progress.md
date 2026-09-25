# Stav a další kroky

Přehled stavu projektu, aby šlo navázat bez znovuodvozování kontextu. **Aktualizovat na konci každé
pracovní session**: je to první věc, kterou číst, a poslední, kterou upravit.

Poslední aktualizace: 2026-09-25

## Co existuje

**Fáze 1 (založení projektu) je hotová.**

- **Projekt:** Vite 8, React 19, TypeScript 6 (strict + `noUncheckedIndexedAccess`), alias `@/`,
  pnpm 12 (`packageManager`), Node 24 (`.nvmrc`). Aplikace je zatím jen zástupná stránka
  (`src/app/App.tsx`).
- **Styly:** Tailwind v4, tokeny Vitality Core v `src/styles/theme.css`. Výchozí barvy, fonty,
  zaoblení a stíny Tailwindu jsou vypnuté. Inter lokálně přes `@fontsource-variable/inter`.
  `prototype/` je vyloučený ze skenování tříd.
- **Kvalita:** ESLint 10 (typescript-eslint strict type-checked, react-hooks, jsx-a11y, zákaz
  importů mezi features přes `@/features/*`), Prettier s řazením Tailwind tříd.
- **Testy:** Vitest + Testing Library (jsdom) v `vite.config.ts`; Playwright E2E proti produkčnímu
  buildu, projekty desktop a mobile (Pixel 7), testy v `e2e/`.
- **Git hooky (lefthook):** pre-commit ESLint + Prettier na staged soubory, pre-push typecheck +
  unit testy. Instalace přes skript `prepare`.
- **Env:** `src/env.ts` validuje `VITE_API_URL` přes Zod při startu; vzor v `.env.example`, lokálně
  `.env.local` (ignorovaný).
- **CI:** GitHub Actions (`quality` + `e2e`), Dependabot (npm týdně, actions měsíčně), šablona PR.
- **Claude:** `.claude/settings.json` (přístup k `../food-be`), `.claude/launch.json` (dev server).
- **Dokumentace:** plán, struktura repa, ADR 0001 (oddělená repa) a 0002 (Vitality Core, NutriPlan).

## Rozhodnutí a poznámky z fáze 1

- **ESLint 10:** `eslint-plugin-jsx-a11y` 6.10.2 oficiálně podporuje jen ESLint ≤ 9, ale používá jen
  API, které ESLint 10 zachoval; povoleno v `pnpm-workspace.yaml` (`peerDependencyRules`). Odebrat,
  až plugin vydá podporu.
- **pnpm blokuje instalační skripty závislostí.** Každý nový balíček se skriptem je potřeba výslovně
  povolit/zakázat v `pnpm-workspace.yaml` (`allowBuilds`), jinak `pnpm install` selže (i v CI).
- **lefthook bez lint-staged:** lefthook umí pracovat se staged soubory sám.
- **Tokeny:** zdrojem pravdy je `prototype/DESIGN.md`, ne `code.html` (ten se liší v zaoblení
  a barvách tuků/vlákniny). Barvy tuků (`#f59e0b`) a vlákniny (`#7c3aed`) v `DESIGN.md` chybí –
  navrženy a schváleny.
- **Hranice features:** ESLint hlídá jen importy přes `@/features/*`, relativní import do jiné
  feature neodhalí (případně později `eslint-plugin-boundaries`).

## Další krok

**Fáze 2 – design systém**, rozdělená na kroky v `frontend-plan.md`: Storybook → i18n
(react-i18next, cs/en, ADR 0003) → ikony (Material Symbols jako SVG přes `<Icon>`) a favicon →
základní prvky → makro komponenty → položka logu → dokumentace. Každá komponenta se story a testem,
žádné texty natvrdo (vše přes překlady). Začít krokem 1: Storybook.

Poznámka k CI: E2E v CI zamrzalo, když Playwright spouštěl server přes `pnpm build`/`pnpm preview`
(vite preview se po testech neukončil). Proto `webServer` volá `tsc`/`vite` napřímo – neměnit zpět.

## Otevřené body

Viz sekce „Zbývá rozhodnout" v [frontend-plan.md](frontend-plan.md).
