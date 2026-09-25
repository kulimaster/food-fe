# NutriPlan – plán frontendu

Souhrn dohodnutých technologií a postupu pro React frontend aplikace NutriPlan.

## Rozhodnuto

- **Název aplikace:** NutriPlan (repa zůstávají `food-fe` / `food-be`)
- **Repozitáře:** frontend (`food-fe`) a backend (`food-be`) jsou samostatná repa, viz
  [repo-structure.md](repo-structure.md)
- **Backend:** C# / .NET 10, REST API s OpenAPI dokumentem (`/openapi/v1.json`, Scalar UI na
  `/scalar` v Development, lokálně `http://localhost:5201`)
- **Framework:** React + TypeScript (strict)
- **Styling:** Tailwind (v4) s design tokeny ze Stitch design systému **Vitality Core**
  ([`prototype/DESIGN.md`](../prototype/DESIGN.md), rozhodnutí viz
  [ADR 0002](decisions/0002-design-system-vitality-core.md))
  - Styl: moderní, čistý, „clean-plate" – hodně prostoru, bílé karty s jemnými stíny, zaoblení
  - Barvy: primární smaragdová; makra – bílkoviny modrá, sacharidy oranžová, tuky žlutá/amber,
    vláknina fialová
  - Font: Inter
  - Ikony: Material Symbols (stejné jako v prototypu) jako **SVG, ne webfont** –
    `@material-symbols/svg-400` + `vite-plugin-svgr`, vše přes vlastní komponentu `<Icon>`
    (velikost, barva, přístupnost na jednom místě). Webfont zamítnut (stahuje všechny ikony,
    problikává text názvu, horší přístupnost, bez typové kontroly); Lucide zamítnut (jiný styl
    než prototyp, chybí část ikon)
  - Mobile-first, prototyp má každou obrazovku ve verzi mobile i desktop
- **Jazyk:** aplikace vícejazyčná od začátku – čeština a angličtina s přepínáním, `react-i18next`;
  výchozí podle prohlížeče, jinak angličtina ([ADR 0003](decisions/0003-i18n-react-i18next.md)).
  Kód, názvy komponent a Storybook anglicky.
- **Nástroj pro vývoj:** Claude Code (přes `additionalDirectories` vidí i `../food-be`)

## Stack

| Oblast                    | Nástroj                                                                     | K čemu                                                   |
| ------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------- |
| Build a vývoj             | Vite + TypeScript                                                           | Založení, spouštění a build projektu, typová kontrola    |
| Správce balíčků           | pnpm (přes corepack)                                                        | Instalace závislostí, lockfile                           |
| Routing                   | React Router                                                                | Přechody mezi obrazovkami                                |
| Data z API                | TanStack Query                                                              | Načítání dat, cache, loading a chybové stavy             |
| Formuláře                 | React Hook Form + Zod                                                       | Formuláře a validace                                     |
| API klient                | Generovaný z OpenAPI (`openapi-typescript` + `openapi-fetch`)               | Typy entit přímo z backendu                              |
| Mockování                 | MSW (Mock Service Worker)                                                   | Mocky pro testy, Storybook a vývoj bez běžícího backendu |
| Katalog komponent         | Storybook (+ addon a11y)                                                    | Design systém a komponenty izolovaně                     |
| Lint a formátování        | ESLint (flat config, `jsx-a11y`) + Prettier (`prettier-plugin-tailwindcss`) | Jednotný styl, odhalení chyb                             |
| Unit a komponentové testy | Vitest + Testing Library                                                    | Logika, hooky, komponenty                                |
| E2E testy                 | Playwright                                                                  | Klíčové uživatelské scénáře v prohlížeči                 |
| Git hooky                 | lefthook                                                                    | Lint a formát před commitem, testy před pushem           |
| Proměnné prostředí        | Zod (`src/env.ts`)                                                          | Validace `VITE_*` proměnných při startu                  |
| Vícejazyčnost             | react-i18next + i18next, `Intl`                                             | Překlady cs/en, formát čísel a dat podle jazyka          |
| Ikony                     | Material Symbols (`@material-symbols/svg-400` + `vite-plugin-svgr`)         | Ikony jako React komponenty přes `<Icon>`                |
| CI                        | GitHub Actions                                                              | Typecheck, lint, testy, build na každý PR                |
| Závislosti                | Dependabot                                                                  | Pravidelné aktualizace                                   |

## Postup

1. ✅ **Založení projektu:** Vite + React + TS (strict) + Tailwind s tokeny, ESLint, Prettier,
   Vitest, Playwright, git hooky, `.env.example` s typovou validací, CI workflow, Dependabot.
   Testy a kvalita od začátku, ne až na konci.
2. ✅ **Design systém** – každá komponenta se story a testem:
   1. Storybook (+ addon a11y, ukázka tokenů), build Storybooku v CI
   2. i18n: react-i18next, překlady cs/en s typovou kontrolou klíčů, formátování čísel a dat,
      přepínač jazyka ve Storybooku
   3. Ikony (`<Icon>`) a logo jako favicon
   4. Základní prvky: `Button`, `Card`, formulářové prvky (`Input`, `Select`, `Label`, chyba)
   5. Makro komponenty: `CalorieRing`, `MacroProgressBar`, `MacroRing`, `MacroChip`
   6. Položka logu (`LogItem`) a skupina jídla
   7. Dokumentace (`CLAUDE.md`, `progress.md`)
3. **Kostra aplikace:** providery, routing, layout (spodní navigace na mobilu, postranní panel na
   desktopu), přepínač jazyka, error boundary, stránka 404, prázdné obrazovky
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

## Prototyp

Předlohou UI je export ze Google Stitch v `prototype/` (každá obrazovka `mobile/` a `desktop/`,
v každé `code.html` + `screen.png`):

| Obrazovka v plánu              | Prototyp                                                         |
| ------------------------------ | ---------------------------------------------------------------- |
| Dashboard                      | `daily-dashboard/`                                               |
| Ingredients                    | `ingredients-database/`                                          |
| Recipes (recipe builder)       | `recipe-builder/`                                                |
| Weekly Planner + Shopping List | `weekly-planner-shopping-list/` (v prototypu na jedné obrazovce) |
| Přihlášení / onboarding        | `login-onboarding/`                                              |
| Profile                        | chybí – navrhnout ve stylu Vitality Core                         |
| Log Meal                       | chybí – v dashboardu jen tlačítko „Log Food"                     |
| Activity Log                   | chybí                                                            |

Prototyp obsahuje i prvky mimo dohodnutý rozsah (hydratace / příjem vody, „Recipe of the Day",
týdenní trend). Hydrataci backend nemá vůbec (žádná entita ani endpoint); recept dne a trend by
bylo potřeba ověřit. Bez dohody se neimplementují.

## Zbývá rozhodnout

- [ ] Autentizace: backend navrhuje ASP.NET Core Identity + JWT (`food-be/docs/architecture.md`),
      zatím nepotvrzeno a vědomě odloženo. Na frontendu pak volba ukládání tokenu a refresh.
- [ ] Hosting frontendu (backend: viz `food-be/docs/deployment.md`)
- [ ] Planner a Shopping List: jedna obrazovka jako v prototypu, nebo dvě
- [ ] Prvky prototypu mimo rozsah (hydratace, recept dne, týdenní trend): dělat, nebo vynechat
- [ ] Návrh chybějících obrazovek (Profile, Log Meal, Activity Log)
