# Stav a další kroky

Přehled stavu projektu, aby šlo navázat bez znovuodvozování kontextu. **Aktualizovat na konci každé
pracovní session**: je to první věc, kterou číst, a poslední, kterou upravit.

Poslední aktualizace: 2026-10-11

## Co existuje

**Fáze 1 (založení projektu), 2 (design systém) a 3 (kostra aplikace) jsou hotové.**

### Základ (fáze 1)

- **Projekt:** Vite 8, React 19, TypeScript 6 (strict + `noUncheckedIndexedAccess`), alias `@/`,
  pnpm 12 (`packageManager`), Node 24 (`.nvmrc`).
- **Styly:** Tailwind v4, tokeny Vitality Core v `src/styles/theme.css`. Výchozí barvy, fonty,
  zaoblení a stíny Tailwindu jsou vypnuté. Inter lokálně přes `@fontsource-variable/inter`.
- **Kvalita:** ESLint 10 (typescript-eslint strict type-checked, react-hooks, jsx-a11y, storybook,
  zákaz importů mezi features přes `@/features/*`), Prettier s řazením Tailwind tříd.
- **Testy:** Vitest + Testing Library (jsdom); Playwright E2E proti produkčnímu buildu (desktop +
  mobile).
- **Git hooky (lefthook):** pre-commit ESLint + Prettier, pre-push typecheck + unit testy.
- **Env:** `src/env.ts` validuje `VITE_API_URL` (Zod); vzor `.env.example`, lokálně `.env.local`.
- **CI:** GitHub Actions (`quality` vč. buildu Storybooku + `e2e`), Dependabot, šablona PR.

### Design systém (fáze 2)

- **Storybook 10** (`pnpm storybook`, port 6006): addony docs + a11y, viewporty mobile/desktop,
  přepínač jazyka v liště. Stránky _Foundations/Tokens_ (čte přímo `theme.css`) a
  _Foundations/i18n_.
- **i18n** (`src/i18n/`, ADR 0003): react-i18next, cs + en, typované klíče, detekce jazyka (uložená
  volba → prohlížeč → angličtina), `setLanguage()` volbu ukládá a nastavuje `<html lang>`.
  `useFormatters()` formátuje kcal, gramy, čísla, procenta a data podle jazyka. Testy hlídají
  shodu klíčů a placeholderů cs/en a české plurály.
- **Ikony:** Material Symbols jako SVG (`@material-symbols/svg-400` + `vite-plugin-svgr`), registr
  42 ikon + 5 plných variant v `src/components/Icon/icons.ts`, komponenta `<Icon>`.
- **Favicon** a apple-touch-icon vyříznuté z loga (lístek s vidličkou), `theme-color`.
- **Komponenty** (`src/components/`), všechny se stories a testy:
  - `Button`, `IconButton` (povinný `label`), `Spinner`, `Card`
  - `TextField`, `SelectField` (popisek, nápověda, chyba, jednotka; připravené pro React Hook Form)
  - `CalorieRing`, `MacroProgressBar`, `MacroRing`, `MacroChip` (ARIA `meter`)
  - `LogItem`, `MealGroup` (jídla dne podle backendového `MealSlot`)
- **Přístupnost:** axe bez porušení u všech stories; testy ověřují názvy, role a popisy.
- **Testy:** 89 unit/komponentových testů, stories testované přes `composeStories`.

### Kostra aplikace (fáze 3)

- **Routing:** React Router 8 (data mode), `src/app/routes.tsx`; každá obrazovka se načítá až při
  první návštěvě (vlastní chunk). Adresy v `paths` (`src/app/navigation.ts`): `/`, `/log`,
  `/planner`, `/shopping-list`, `/recipes`, `/recipes/new`, `/recipes/:recipeId`, `/ingredients`,
  `/activity`, `/profile`. Obrazovky jsou zatím prázdné (`<Page>` + „Připravujeme“).
- **Layout** (`src/app/layout`): desktop (od `md`) postranní panel se všemi obrazovkami, mobil
  horní lišta s logem + spodní lišta (Přehled, Plánovač, Nákup, Recepty, Více → Ingredience,
  Aktivity, Profil). Log Meal není v menu (akce, ne místo). Odkaz „Přeskočit na obsah“, po
  navigaci fokus na obsah, obnovení scrollu.
- **Přepínač jazyka** dole v postranním panelu a v menu „Více“ (`LanguageSwitcher`).
- **Chyby** (`src/app/errors`): 404 uvnitř rámu, chyba obrazovky nechá navigaci a nabídne
  „Zkusit znovu“ / „Zpět na přehled“, chyba rámu → celostránková hláška.
- **Testy:** 119 unit/komponentových, E2E (desktop + mobil): navigace, „Více“, jazyk vč. reloadu,
  404, skip link.

## Rozhodnutí a poznámky

- **ESLint 10:** `eslint-plugin-jsx-a11y` 6.10.2 oficiálně podporuje jen ESLint ≤ 9, ale používá jen
  API, které ESLint 10 zachoval; povoleno v `pnpm-workspace.yaml` (`peerDependencyRules`). Odebrat,
  až plugin vydá podporu.
- **pnpm blokuje instalační skripty závislostí** – rozhodnuto v `allowBuilds` (`lefthook`, `esbuild`:
  `false`). Nový balíček se skriptem je potřeba přidat, jinak `pnpm install` selže (i v CI).
- **pnpm 12 před `pnpm exec` sám srovná `node_modules` s `package.json`** – pozor při `git stash`
  (odinstaluje balíčky, které ve stashi nejsou; pak `pnpm install`).
- **Tokeny:** zdrojem pravdy je `prototype/DESIGN.md`, ne `code.html`. Odchylky a doplňky:
  - barvy tuků `#f59e0b` a vlákniny `#7c3aed` v `DESIGN.md` chybí – navrženy a schváleny
  - textové varianty `macro-*-strong` (sacharidy `#9d4300`, tuky `#8a5a00`) – oranžová a amber
    nesplňují kontrast pro text
  - tlačítka `rounded-lg` podle `DESIGN.md` (prototyp má místy „pilulky“)
  - ikony jídel dne v primární barvě, ne v barvách maker (ty jsou vyhrazené makrům)
- **Tailwind skenuje `src/` výslovně** (`@source '../'` v `index.css`) – automatická detekce
  v dev serveru Storybooku nezachytila stories načítané na vyžádání (komponenty bez stylů).
- **Storybook addon-vitest** zatím nepodporuje Vitest 5 → stories se testují přes `composeStories`
  v běžném Vitestu. Přidat addon, až podporu dostane.
- **Kontrast:** `outline` na text nesplňuje 4,5 : 1 na pozadí `background` – na text se nepoužívá.
- **Hranice features:** ESLint hlídá jen importy přes `@/features/*`, relativní import do jiné
  feature neodhalí (případně později `eslint-plugin-boundaries`).
- **Obrazovky (2026-10-11):** Shopping List je samostatná obrazovka (prototyp ji má s plánovačem),
  hydratace se nedělá. Recept dne a týdenní trend zatím nerozhodnuto.
- **React Router zapisuje vyřešené `lazy` trasy zpět do objektů tras** – každý router v testech
  musí dostat vlastní kopii (`cloneRoutes` v `src/test/router.tsx`), jinak se testy ovlivňují.
- **react-hooks 7 (`set-state-in-effect`):** nenastavovat stav v efektu; odvodit ho (např. menu
  „Více“ si pamatuje adresu, na které bylo otevřené, a po navigaci je zavřené samo).
- **Storybook dev server** po přidání nového souboru se stories občas hlásí
  „importers[path] is not a function“ – stačí znovu načíst Storybook.
- **CI E2E:** Playwright `webServer` volá `tsc`/`vite` napřímo (přes pnpm se `vite preview` po
  testech neukončil a job visel) – neměnit zpět.
- **Zapisování souborů Claudem:** escape sekvence ` ` se při zápisu přes nástroje převádějí na
  skutečné znaky (ESLint `no-irregular-whitespace`) – pro testy s `Intl` používat `plainSpaces()`.

## Další krok

**Fáze 4 – napojení na API:** vygenerovaný klient a typy z OpenAPI backendu
(`openapi-typescript` + `openapi-fetch`), TanStack Query, jednotné zobrazování chyb z API, MSW
mocky (testy, Storybook, vývoj bez backendu). Před začátkem ověřit stav backendu
(`../food-be/docs/progress.md`, které endpointy existují, jak spustit `food-api` a kde je OpenAPI
dokument) a navrhnout plán ke schválení. Autentizace je až fáze 6 – backend ji zatím nemá
(`UserId` se posílá v těle požadavku); s tím počítat v klientovi.

## Otevřené body

Viz sekce „Zbývá rozhodnout" v [frontend-plan.md](frontend-plan.md).
