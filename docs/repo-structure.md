# Food – struktura repozitáře

Uspořádání repozitáře `food-fe` tak, aby se v něm snadno orientoval člověk i Claude Code.

## Základní princip

- **Dvě samostatná repa:** `food-be` (.NET 10, REST API) a `food-fe` (React). Obě leží vedle sebe
  v `C:\Users\Martin\repo\`.
- **Kontrakt mezi nimi je OpenAPI:** backend vystavuje `/openapi/v1.json` (a Scalar UI na `/scalar`
  v Development), frontend z něj generuje typy a klienta. Ručně psané typy entit nejsou.
- **Claude vidí i backend:** `.claude/settings.json` přidává `../food-be` přes `additionalDirectories`.
- **Doménová dokumentace žije v backendu** (`food-be/docs/business-description.md`,
  `database-design.md`, `architecture.md`). Frontend na ni odkazuje, nekopíruje ji, aby se dvě verze
  nerozešly. Ve `food-fe/docs/` jsou jen věci specifické pro frontend.
- **`CLAUDE.md`:** stručné instrukce, které Claude Code načítá automaticky. Dlouhé popisy patří do
  `docs/`, `CLAUDE.md` na ně jen odkazuje.

## Struktura

```
food-fe/
├── CLAUDE.md                  ← instrukce pro Claude (a každého přispěvatele)
├── README.md                  ← popis projektu a setup pro lidi
├── .claude/
│   ├── settings.json          ← oprávnění, přístup k ../food-be
│   └── launch.json            ← dev server a Storybook pro náhled
├── .github/
│   ├── workflows/ci.yml       ← typecheck, lint, testy, build, build Storybooku
│   ├── dependabot.yml         ← aktualizace závislostí
│   └── pull_request_template.md
├── docs/
│   ├── frontend-plan.md       ← stack a fáze
│   ├── repo-structure.md      ← tento soubor
│   ├── progress.md            ← aktuální stav, číst jako první
│   └── decisions/             ← ADR: důležitá rozhodnutí (NNNN-nazev.md)
├── prototype/
│   └── food-prototype.html    ← HTML prototyp jako předloha UI
├── public/
├── e2e/                       ← Playwright testy
├── src/
│   ├── app/                   ← providery (QueryClient, Router), layout, error boundary, 404
│   ├── api/                   ← vygenerovaný API klient a typy (needitovat ručně)
│   ├── components/            ← design systém: znovupoužitelné komponenty + .stories.tsx
│   ├── features/              ← obrazovky podle domény
│   │   ├── dashboard/
│   │   ├── meals/
│   │   ├── ingredients/
│   │   ├── recipes/
│   │   ├── planner/
│   │   ├── shopping-list/
│   │   ├── activity/
│   │   └── profile/
│   ├── lib/                   ← utility, formátování, doménové výpočty (BMR apod.)
│   ├── mocks/                 ← MSW handlery
│   ├── styles/                ← Tailwind tokeny (barvy, fonty)
│   ├── test/                  ← setup pro Vitest, test utils
│   ├── env.ts                 ← typově ověřené proměnné prostředí (Zod)
│   ├── routes.tsx
│   └── main.tsx
├── .editorconfig
├── .env.example               ← vzor proměnných prostředí (VITE_API_URL…), .env se necommituje
├── .gitignore
├── .nvmrc                     ← verze Node
├── eslint.config.js
├── prettier.config.js
├── package.json               ← včetně "engines" a "packageManager"
├── pnpm-lock.yaml
├── playwright.config.ts
├── tsconfig.json              ← strict
└── vite.config.ts             ← včetně konfigurace Vitestu
```

### Uvnitř jedné feature

```
features/recipes/
├── components/                ← komponenty používané jen v této oblasti
├── api.ts                     ← TanStack Query hooky (useRecipes, useCreateRecipe…)
├── schemas.ts                 ← Zod schémata formulářů
├── RecipesPage.tsx            ← obrazovka (route)
└── *.test.tsx
```

Pravidlo: feature smí importovat z `components/`, `lib/`, `api/`, ale ne z jiné feature. Co je potřeba
sdílet, přesune se do `components/` nebo `lib/`.

## Proč `features/` místo složek podle typu

Dělení podle domény (`features/recipes/`, `features/planner/`…) kopíruje backendové entity. Všechno
k jedné oblasti je na jednom místě, což usnadňuje orientaci vám i Claudovi. Dělení podle typu souboru
(`pages/`, `hooks/`, `services/`) rozhází jednu funkci do mnoha složek.

## Zásady pro `CLAUDE.md`

- Držet ho **stručný a konkrétní**.
- Když Claude opakovaně dělá stejnou chybu, **přidat pravidlo**.
- Aktualizovat ho spolu se změnami v projektu (nové příkazy, nové konvence).

## Zdroje

- Dokumentace Claude Code (`CLAUDE.md`, nastavení, oprávnění): https://docs.claude.com/en/docs/claude-code/overview
