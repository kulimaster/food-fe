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

Projekt ještě není založený (fáze 1). Doplnit, jakmile budou existovat: dev server, Storybook,
testy, E2E, lint, typecheck, generování API klienta.

## Konvence

- TypeScript všude, `strict`
- Tailwind jen s tokeny z `prototype/DESIGN.md` (Vitality Core): font Inter, primární smaragdová,
  pevné barvy maker – bílkoviny modrá, sacharidy oranžová, tuky žlutá/amber, vláknina fialová
- Karty bílé se stínem úrovně 1, zaoblení `rounded-lg` (16 px), progress bary „pill“, žádné těžké
  okraje; mobile-first (4sloupcový grid), desktop 12 sloupců do 1140 px
- Každá komponenta v `src/components/` má svou story a test
- Obrazovky a jejich logika patří do `src/features/<doména>/`; feature neimportuje z jiné feature
- Typy entit se berou z vygenerovaného klienta v `src/api/`, ne ručně

## Co nedělat

- Nepřidávat nové knihovny bez domluvy
- Nepoužívat výchozí barvy Tailwindu mimo tokeny, nepoužívat barvu makra pro jiný účel
- Nekopírovat `code.html` z prototypu do `src/` jako celek; rozložit ho na komponenty
- Neupravovat vygenerovaný kód v `src/api/` ručně
- Nekopírovat backendovou dokumentaci do tohoto repa, odkazovat na ni

## Způsob práce

- **Malé, postupné kroky.** Jedna změna najednou, pracovat po fázích podle `docs/frontend-plan.md`.
- **Před větší implementací navrhnout plán** a počkat na schválení.
- **Ptát se u nejasností** a rozhodnutí (pojmenování, knihovny) místo předpokládání.
- **Vždy potvrdit před `git commit`**, a znovu zvlášť před `git push`.
- Po změně rozhodnutí aktualizovat příslušný dokument v `docs/`; na konci práce aktualizovat
  `docs/progress.md`.
