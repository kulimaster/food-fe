# 0002 – Design systém Vitality Core a název NutriPlan

- **Stav:** přijato
- **Datum:** 2026-09-24

## Kontext

Původní plán počítal s vizuálním motivem „Nutrition Facts label" (papír, inkoust, lesní zelená,
zlatá, Barlow Condensed). Následně vznikl prototyp v Google Stitch s vlastním design systémem
„Vitality Core" a názvem aplikace NutriPlan. Oba směry se vylučují.

## Rozhodnutí

- Frontend se staví podle Stitch prototypu a design systému Vitality Core
  (`prototype/DESIGN.md`): Inter, primární smaragdová, pevné barvy maker, bílé karty s jemnými
  stíny, zaoblení, mobile-first.
- Aplikace se jmenuje **NutriPlan**. Repozitáře a backend si ponechávají interní název „Food".
- Motiv „Nutrition Facts label" se opouští.

## Důsledky

- Design tokeny v Tailwindu se berou z `prototype/DESIGN.md`; ten je zdrojem pravdy pro vizuál.
- Obrazovky, které prototyp nemá (Profile, Log Meal, Activity Log), se navrhnou ve stejném stylu.
- Prvky prototypu mimo dohodnutý rozsah (hydratace, recept dne, týdenní trend) se neimplementují
  bez samostatného rozhodnutí; hydrataci backend nepodporuje.
