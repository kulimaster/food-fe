# Stav a další kroky

Přehled stavu projektu, aby šlo navázat bez znovuodvozování kontextu. **Aktualizovat na konci každé
pracovní session**: je to první věc, kterou číst, a poslední, kterou upravit.

Poslední aktualizace: 2026-09-24

## Co existuje

- Dokumentace: `docs/frontend-plan.md`, `docs/repo-structure.md`, tento soubor,
  `docs/decisions/0001-separate-repositories.md`
- `CLAUDE.md`, `README.md`, `.gitignore`, `.editorconfig`
- `.claude/settings.json`: přístup k `../food-be` přes `additionalDirectories`, oprávnění podle vzoru
  z `food-be` (`git commit` a `git push` vždy vyžadují potvrzení)
- Zatím žádný kód, projekt není založený

## Rozhodnuto v této session

- Dvě samostatná repa (`food-fe`, `food-be`) místo monorepa; kontrakt přes OpenAPI
- Doménová dokumentace zůstává v `food-be/docs/`, frontend na ni odkazuje
- Stack doplněn o pnpm, ESLint + Prettier, Vitest + Testing Library, Playwright, lefthook,
  GitHub Actions, Dependabot
- Testy a CI se nastavují už ve fázi 1

## Další krok

**Fáze 1 – založení projektu:** Vite + React + TS (strict) + Tailwind v4, ESLint, Prettier, Vitest,
Playwright, lefthook + lint-staged, `.env.example` + `src/env.ts`, `.nvmrc`, CI workflow, Dependabot.

## Otevřené body

Viz sekce „Zbývá rozhodnout" v [frontend-plan.md](frontend-plan.md).
