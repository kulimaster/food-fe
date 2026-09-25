# 0003 – Vícejazyčnost přes react-i18next

- **Stav:** přijato
- **Datum:** 2026-09-25

## Kontext

Aplikace NutriPlan musí umožnit přepínání jazyka, na začátku mezi češtinou a angličtinou. Prototyp
ze Stitche je v angličtině. Kód, názvy komponent a Storybook zůstávají anglicky.

## Rozhodnutí

- Překlady přes **`react-i18next` + `i18next`**: nejrozšířenější řešení pro React, typová kontrola
  klíčů v TypeScriptu, detekce jazyka, načítání překladů podle potřeby, správné plurály (čeština
  má tři tvary: 1 jídlo, 2 jídla, 5 jídel).
- Jazyky: **čeština (`cs`) a angličtina (`en`)**.
- Výchozí jazyk podle prohlížeče; když prohlížeč nemá ani jeden z podporovaných jazyků, použije se
  **angličtina**. Zvolený jazyk se pamatuje.
- Čísla, jednotky a data se formátují podle jazyka přes `Intl` (např. `1 850,5 kcal` vs.
  `1,850.5 kcal`).
- i18n se zavádí ve fázi 2 hned po Storybooku, před komponentami s vlastními texty. Storybook dostane
  přepínač jazyka. Přepínač v aplikaci přijde s layoutem ve fázi 3.

## Zvažované alternativy

- **Lingui:** menší, překlady kompilované při buildu; menší komunita.
- **Paraglide:** velmi malý a typově bezpečný; novější, méně odzkoušený.

## Důsledky

- Žádné texty pro uživatele natvrdo v komponentách; vždy přes překladové klíče.
- Každý nový text je potřeba přidat do obou jazyků (hlídá TypeScript / test).
- Komponenty je potřeba kontrolovat v obou jazycích (čeština má delší slova).
