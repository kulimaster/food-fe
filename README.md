# NutriPlan – frontend

React frontend aplikace **NutriPlan** pro plánování jídel a sledování výživy (makra, ingredience,
recepty, log aktivit, týdenní plánovač a nákupní seznam).

Backend (.NET 10, REST API) je v samostatném repozitáři [`food-be`](https://github.com/kulimaster/food-be).

## Stav

Projekt je ve fázi plánování, kód zatím neexistuje. Aktuální stav viz
[docs/progress.md](docs/progress.md).

## Požadavky

- Node.js (verze v `.nvmrc`, jakmile bude projekt založen)
- pnpm (přes `corepack enable`)
- Běžící backend `food-be` na `http://localhost:5201`, nebo MSW mocky

## Dokumentace

- [Plán frontendu](docs/frontend-plan.md)
- [Struktura repozitáře](docs/repo-structure.md)
- [Stav a další kroky](docs/progress.md)
- [Design systém Vitality Core](prototype/DESIGN.md) a prototyp obrazovek v `prototype/`
