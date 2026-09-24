# Food – plán frontendu

Souhrn dohodnutých technologií a postupu pro React frontend aplikace Food.

## Rozhodnuto

- **Repozitáře:** frontend (`food-fe`) a backend (`food-be`) jsou samostatná repa, viz
  [repo-structure.md](repo-structure.md)
- **Backend:** C# / .NET 10, REST API s OpenAPI dokumentem (`/openapi/v1.json`, Scalar UI na
  `/scalar` v Development, lokálně `http://localhost:5201`)
- **Framework:** React + TypeScript (strict)
- **Styling:** Tailwind (v4) s vlastními design tokeny převzatými z prototypu
  - Barvy: papír, inkoust, lesní zelená, zlatá
  - Font: Barlow Condensed
  - Vizuální motiv: „Nutrition Facts label" (tlusté černé linky, výrazné kalorie, odsazené řádky maker
    s progress bary)
- **Nástroj pro vývoj:** Claude Code (přes `additionalDirectories` vidí i `../food-be`)

## Stack

| Oblast | Nástroj | K čemu |
|---|---|---|
| Build a vývoj | Vite + TypeScript | Založení, spouštění a build projektu, typová kontrola |
| Správce balíčků | pnpm (přes corepack) | Instalace závislostí, lockfile |
| Routing | React Router | Přechody mezi obrazovkami |
| Data z API | TanStack Query | Načítání dat, cache, loading a chybové stavy |
| Formuláře | React Hook Form + Zod | Formuláře a validace |
| API klient | Generovaný z OpenAPI (`openapi-typescript` + `openapi-fetch`) | Typy entit přímo z backendu |
| Mockování | MSW (Mock Service Worker) | Mocky pro testy, Storybook a vývoj bez běžícího backendu |
| Katalog komponent | Storybook (+ addon a11y) | Design systém a komponenty izolovaně |
| Lint a formátování | ESLint (flat config, `jsx-a11y`) + Prettier (`prettier-plugin-tailwindcss`) | Jednotný styl, odhalení chyb |
| Unit a komponentové testy | Vitest + Testing Library | Logika, hooky, komponenty |
| E2E testy | Playwright | Klíčové uživatelské scénáře v prohlížeči |
| Git hooky | lefthook + lint-staged | Lint a formát před commitem |
| CI | GitHub Actions | Typecheck, lint, testy, build na každý PR |
| Závislosti | Dependabot | Pravidelné aktualizace |

## Postup

1. **Založení projektu:** Vite + React + TS (strict) + Tailwind, ESLint, Prettier, Vitest,
   Playwright, git hooky, `.env.example` s typovou validací, CI workflow, Dependabot. Testy
   a kvalita od začátku, ne až na konci.
2. **Design systém:** tokeny v Tailwindu a základní komponenty (nutriční label, progress bary maker,
   tlačítka, karty, formulářové prvky), vše rovnou ve Storybooku a s testy
3. **Kostra aplikace:** providery, routing, layout, navigace, error boundary, stránka 404, osm
   prázdných obrazovek
4. **Napojení na API:** vygenerovaný klient a typy, TanStack Query, jednotné zobrazování chyb z API,
   MSW mocky
5. **Obrazovky postupně:**
   1. Ingredients
   2. Profile
   3. Log Meal
   4. Recipes (včetně recipe builderu)
   5. Activity Log
   6. Dashboard
   7. Weekly Planner
   8. Shopping List (počítaný dynamicky z plánovaných jídel, neukládá se)
6. **Autentizace:** přihlášení a chráněné stránky
7. **Doladění:** responzivita pro mobil, E2E pokrytí hlavních scénářů, sběr chyb (např. Sentry),
   build a nasazení

Jako předloha UI a chování slouží HTML prototyp s osmi obrazovkami (`prototype/food-prototype.html`).

## Zbývá rozhodnout

- [ ] Autentizace: backend navrhuje ASP.NET Core Identity + JWT (`food-be/docs/architecture.md`),
      zatím nepotvrzeno a vědomě odloženo. Na frontendu pak volba ukládání tokenu a refresh.
- [ ] Jazyk UI: čeština, angličtina, nebo i18n od začátku
- [ ] Hosting frontendu (backend: viz `food-be/docs/deployment.md`)
- [ ] Doplnit HTML prototyp do `prototype/`
