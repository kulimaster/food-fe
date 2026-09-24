# CLAUDE.md

Instrukce pro Claude Code (a každého přispěvatele) v tomto repozitáři.

## O projektu

**Food** je aplikace pro plánování jídel a sledování výživy: denní makra (kalorie, bílkoviny,
sacharidy, tuky, vláknina), databáze ingrediencí, vlastní recepty, oblíbená jídla, log aktivit
a týdenní plánovač s nákupním seznamem. Toto repo je **React frontend**. Backend (.NET 10, REST)
je v samostatném repu `../food-be`.

## Kde co najdeš

- [`docs/progress.md`](docs/progress.md) – **čti jako první**: aktuální stav a další krok
- [`docs/frontend-plan.md`](docs/frontend-plan.md) – stack, fáze, otevřená rozhodnutí
- [`docs/repo-structure.md`](docs/repo-structure.md) – struktura repa a pravidla pro `src/`
- [`docs/decisions/`](docs/decisions/) – zaznamenaná rozhodnutí (ADR)
- `prototype/` – HTML prototyp jako předloha UI
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

Projekt ještě není založený (fáze 1). Doplnit, jakmile budou existovat: dev server, Storybook,
testy, E2E, lint, typecheck, generování API klienta.

## Konvence

- TypeScript všude, `strict`
- Tailwind jen s našimi design tokeny (papír, inkoust, lesní zelená, zlatá; Barlow Condensed)
- Vizuální motiv „Nutrition Facts label", vyhnout se generickému dashboardovému vzhledu
- Každá komponenta v `src/components/` má svou story a test
- Obrazovky a jejich logika patří do `src/features/<doména>/`; feature neimportuje z jiné feature
- Typy entit se berou z vygenerovaného klienta v `src/api/`, ne ručně

## Co nedělat

- Nepřidávat nové knihovny bez domluvy
- Nepoužívat výchozí barvy Tailwindu mimo tokeny
- Neupravovat vygenerovaný kód v `src/api/` ručně
- Nekopírovat backendovou dokumentaci do tohoto repa, odkazovat na ni

## Způsob práce

- **Malé, postupné kroky.** Jedna změna najednou, pracovat po fázích podle `docs/frontend-plan.md`.
- **Před větší implementací navrhnout plán** a počkat na schválení.
- **Ptát se u nejasností** a rozhodnutí (pojmenování, knihovny) místo předpokládání.
- **Vždy potvrdit před `git commit`**, a znovu zvlášť před `git push`.
- Po změně rozhodnutí aktualizovat příslušný dokument v `docs/`; na konci práce aktualizovat
  `docs/progress.md`.
