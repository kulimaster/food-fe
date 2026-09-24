# 0001 – Samostatná repa pro frontend a backend

- **Stav:** přijato
- **Datum:** 2026-09-24

## Kontext

Původní návrh počítal s monorepem (`backend/` + `frontend/`), aby Claude Code při práci na
frontendu viděl backendové entity a endpointy. Backend `food-be` (.NET 10) už ale existoval jako
samostatné repo s vlastní historií, `CLAUDE.md` a dokumentací.

## Rozhodnutí

- Frontend žije v samostatném repu `food-fe`, kód přímo v kořeni (bez podsložky `frontend/`).
- Kontraktem mezi repy je OpenAPI dokument backendu (`/openapi/v1.json`); frontend z něj generuje
  typy a klienta.
- Claude Code vidí backend přes `additionalDirectories: ["../food-be"]` v `.claude/settings.json`.
- Doménová dokumentace (business popis, návrh DB, architektura) zůstává v `food-be/docs/`;
  frontend na ni odkazuje a nekopíruje ji.

## Důsledky

- Obě repa musí ležet vedle sebe (`repo/food-be`, `repo/food-fe`), jinak nefungují relativní odkazy.
- Změny API se do frontendu promítají přegenerováním klienta; nekompatibilní změnu odhalí typecheck.
- Nezávislé verzování, CI a nasazení obou částí.
