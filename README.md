# NutriPlan – frontend

[![CI](https://github.com/kulimaster/food-fe/actions/workflows/ci.yml/badge.svg)](https://github.com/kulimaster/food-fe/actions/workflows/ci.yml)

React frontend aplikace **NutriPlan** pro plánování jídel a sledování výživy (makra, ingredience,
recepty, log aktivit, týdenní plánovač a nákupní seznam).

Backend (.NET 10, REST API) je v samostatném repozitáři [`food-be`](https://github.com/kulimaster/food-be).

**Stack:** Vite, React 19, TypeScript, Tailwind v4, react-i18next (cs/en), Storybook, Vitest,
Playwright. Podrobnosti v
[docs/frontend-plan.md](docs/frontend-plan.md).

## Požadavky

- Node.js 24 (viz `.nvmrc`)
- pnpm – zapnout přes `corepack enable` (verzi určuje `packageManager` v `package.json`)
- Pro práci s daty běžící backend `food-be` na `http://localhost:5201`

## Zprovoznění

```bash
pnpm install
```

`pnpm install` zároveň nainstaluje git hooky (lefthook).

Zkopíruj vzor proměnných prostředí do `.env.local` (není v gitu) a případně uprav:

```bash
cp .env.example .env.local
```

Spusť dev server na http://localhost:5173:

```bash
pnpm dev
```

Pro E2E testy je jednorázově potřeba stáhnout prohlížeč:

```bash
pnpm exec playwright install chromium
```

## Příkazy

| Příkaz                                     | Co dělá                                   |
| ------------------------------------------ | ----------------------------------------- |
| `pnpm dev`                                 | Dev server                                |
| `pnpm build` / `pnpm preview`              | Produkční build / jeho lokální náhled     |
| `pnpm typecheck`                           | Typová kontrola                           |
| `pnpm lint` / `pnpm lint:fix`              | ESLint                                    |
| `pnpm format` / `pnpm format:check`        | Prettier                                  |
| `pnpm test` / `test:run` / `test:coverage` | Unit a komponentové testy (Vitest)        |
| `pnpm test:e2e`                            | E2E testy (Playwright), desktop i mobil   |
| `pnpm storybook` / `build-storybook`       | Katalog komponent (http://localhost:6006) |

## Dokumentace

- [Stav a další kroky](docs/progress.md)
- [Plán frontendu](docs/frontend-plan.md)
- [Struktura repozitáře](docs/repo-structure.md)
- [Rozhodnutí (ADR)](docs/decisions/)
- [Design systém Vitality Core](prototype/DESIGN.md) a prototyp obrazovek v `prototype/`
