# CLAUDE.md

Instrukce pro Claude Code (a každého přispěvatele) v tomto repozitáři.

## O projektu

**NutriPlan** je aplikace pro plánování jídel a sledování výživy: denní makra (kalorie, bílkoviny,
sacharidy, tuky, vláknina), databáze ingrediencí, vlastní recepty, oblíbená jídla, log aktivit
a týdenní plánovač s nákupním seznamem. Toto repo je **React frontend**. Backend (.NET 10, REST)
je v samostatném repu `../food-be` (repa a backend si ponechávají interní název „Food“).

## Kde co najdeš

- [`docs/progress.md`](docs/progress.md) – **čti jako první**: aktuální stav a další krok
- [`docs/frontend-plan.md`](docs/frontend-plan.md) – stack, fáze, otevřená rozhodnutí
- [`docs/repo-structure.md`](docs/repo-structure.md) – struktura repa a pravidla pro `src/`
- [`docs/decisions/`](docs/decisions/) – zaznamenaná rozhodnutí (ADR)
- [`prototype/DESIGN.md`](prototype/DESIGN.md) – **design systém Vitality Core** (tokeny a pravidla)
- `prototype/<obrazovka>/{mobile,desktop}/` – Stitch prototyp: `code.html` (HTML + Tailwind)
  a `screen.png`; předloha rozložení a stylu, ne kód ke zkopírování
- Backend (přístupný přes `additionalDirectories`):
  - `../food-be/docs/business-description.md` – doménová pravidla
  - `../food-be/docs/database-design.md` – entity a schéma
  - `../food-be/docs/architecture.md` – architektura a technologická rozhodnutí
  - `../food-be/docs/progress.md` – stav backendu a jeho endpointů

## Klíčová pravidla domény

- Shopping list se počítá dynamicky z plánovaných jídel, neukládá se
- Kalorické cíle podporují activity eat-back
- Výpočet cílů z profilu: Mifflin-St Jeor BMR + multiplikátory aktivity, úprava podle cíle, možnost
  ručního přepsání

Podrobnosti a další pravidla viz `../food-be/docs/business-description.md`.

## Příkazy

```bash
pnpm dev             # dev server na http://localhost:5173 (potřebuje .env.local, viz .env.example)
pnpm build           # typecheck + produkční build
pnpm typecheck       # jen typová kontrola
pnpm lint            # ESLint, selže i na varování (lint:fix opraví, co jde)
pnpm format          # Prettier (format:check jen kontroluje)
pnpm test            # Vitest ve watch módu (test:run jednorázově, test:coverage s pokrytím)
pnpm test:e2e        # Playwright proti produkčnímu buildu, desktop + mobile
pnpm storybook       # Storybook na http://localhost:6006 (build-storybook pro statický build)
```

Před dokončením změny musí projít `typecheck`, `lint`, `format:check` a `test:run` (totéž hlídá CI).
Git hooky (lefthook) to částečně dělají samy: pre-commit lint + formát, pre-push typecheck + testy.
Hooky neobcházet (`--no-verify`).

Doplnit, až bude existovat: generování API klienta (fáze 4).

## Konvence

- TypeScript všude, `strict`
- Tailwind jen s tokeny z `prototype/DESIGN.md` (Vitality Core): font Inter, primární smaragdová,
  pevné barvy maker – bílkoviny modrá, sacharidy oranžová, tuky žlutá/amber, vláknina fialová
- Karty bílé se stínem úrovně 1, zaoblení `rounded-lg` (16 px), progress bary „pill“, žádné těžké
  okraje; mobile-first (4sloupcový grid), desktop 12 sloupců do 1140 px
- **Komponenty** (`src/components/<Name>/`): `Name.tsx`, `Name.stories.tsx`, `Name.test.tsx`,
  `index.ts`. Soubor komponenty exportuje jen komponenty – sdílené třídy a helpery do vlastního
  `.ts` (kvůli Fast Refresh). Dostupné: `Icon`, `Button`, `IconButton`, `Card`, `Spinner`,
  `TextField`, `SelectField`, `CalorieRing`, `MacroProgressBar`, `MacroRing`, `MacroChip`,
  `LogItem`, `MealGroup` – před psaním nové komponenty zkontrolovat Storybook.
- **Testy komponent** vykreslují stories přes `composeStories` (story = ukázka i testovací případ);
  pro vlastní `onClick` apod. vykreslit komponentu přímo se `Story.args` (typy spy ze Storybooku
  nesedí s Vitestem 5). Texty z `Intl` porovnávat přes `plainSpaces()` z `@/test/text`.
- **Přístupnost:** interaktivní prvky vždy s přístupným názvem (`IconButton` má povinný `label`),
  průběh jako `role="meter"` s `aria-valuetext`; nové stories zkontrolovat v panelu Accessibility.
- **Třídy** skládat přes `cx()` z `@/lib/cx` (bez tailwind-merge – konfliktní třídy
  nekombinovat, `className` u komponent je pro layout). Ikony: `<Icon name="…" />`; novou ikonu
  přidat do registru `src/components/Icon/icons.ts` (jen registrované jdou do bundlu).
- **Barvy maker:** `macroClasses` z `src/components/Macro/macros.ts` – základní barva (`fill`,
  `stroke`) na pruhy a prstence, `-strong` varianta (`text`) na text (oranžová a amber nesplňují
  kontrast)
- Obrazovky a jejich logika patří do `src/features/<doména>/`; feature neimportuje z jiné feature
- Typy entit se berou z vygenerovaného klienta v `src/api/`, ne ručně
- Aplikace je vícejazyčná (cs + en, `react-i18next`, ADR 0003): žádné texty pro uživatele natvrdo,
  vždy přes překladové klíče v obou jazycích; čísla a data formátovat podle jazyka (`Intl`).
  Kód, názvy komponent a Storybook jsou anglicky. Texty v `src/i18n/locales/{en,cs}.ts` (klíče
  typované z `en.ts`), `useTranslation()` + `useFormatters()` z `@/i18n/format`. Pozor na české
  pády – raději celé věty na klíč než skládání slov.

## Co nedělat

- Nepřidávat nové knihovny bez domluvy (a u balíčku s instalačním skriptem rozhodnout
  `allowBuilds` v `pnpm-workspace.yaml`, jinak `pnpm install` selže)
- Nečíst `import.meta.env` přímo; používat validované `env` z `@/env`
- Nepoužívat výchozí barvy Tailwindu mimo tokeny, nepoužívat barvu makra pro jiný účel
- Nepoužívat `outline` / `outline-variant` na text – jsou pro okraje a nesplňují kontrast (4,3 : 1);
  pro vedlejší text `on-surface-variant`
- Nekopírovat `code.html` z prototypu do `src/` jako celek; rozložit ho na komponenty
- Neupravovat vygenerovaný kód v `src/api/` ručně
- Nepojmenovávat soubory ve stejné složce tak, aby se lišily jen velikostí písmen a příponou
  (`tokens.test.ts` vs. `Tokens.test.tsx`) – na Windows je TypeScript bere jako jeden a jeden
  potichu vynechá
- Nekopírovat backendovou dokumentaci do tohoto repa, odkazovat na ni

## Způsob práce

- **Malé, postupné kroky.** Jedna změna najednou, pracovat po fázích podle `docs/frontend-plan.md`.
- **Před větší implementací navrhnout plán** a počkat na schválení.
- **Ptát se u nejasností** a rozhodnutí (pojmenování, knihovny) místo předpokládání.
- **Vždy potvrdit před `git commit`**, a znovu zvlášť před `git push`. Výjimka: uvnitř schválené
  fáze commitovat každý krok bez ptaní a pushnout až na konci fáze.
- Po změně rozhodnutí aktualizovat příslušný dokument v `docs/`; na konci práce aktualizovat
  `docs/progress.md`.
