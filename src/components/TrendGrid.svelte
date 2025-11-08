<script>
  /* Präsentations-Chart ohne Datenbindung – zum Ausfüllen per Stift
     props:
       columns  : Anzahl Wochen-Spalten
       guides   : Array mit y%-Hilfslinien, z.B. [25,50,75]
       goal     : Ziel in %
       band     : Breite des Zielbands in %-Punkten (z.B. 5 -> ±5%)
       mode     : "line" | "bar" (nur Optik; beide sind Raster)
  */
  export let columns = 8;
  export let guides = [25,50,75];
  export let goal   = 92;
  export let band   = 4;
  export let mode   = "line";

  const rows = [0,25,50,75,100];

  function yStyle(pct){
    // 0% unten, 100% oben -> translateY per CSS-Calc
    return `top: calc(${100 - pct}%);`;
  }
</script>

<section class="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-900 p-4">
  <!-- Achsen-Balken -->
  <div class="grid grid-cols-[40px_1fr] gap-2">
    <!-- Y-Achse Beschriftung -->
    <div class="flex flex-col justify-between text-[11px] text-black/60 dark:text-white/60">
      {#each rows as r}
        <div>{r}%</div>
      {/each}
    </div>

    <!-- Chartfläche -->
    <div class="relative rounded-xl p-3 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)]"
         style="background-size: 100% calc(25% - 0px), calc(100% / var(--cols)) 100%; --cols:{columns}; min-height: 240px;">

      <!-- Zielband -->
      <div class="absolute left-3 right-3 rounded-md bg-red-500/12 ring-1 ring-red-500/30"
           style="height: calc({band * 1}%); transform: translateY(-50%); {yStyle(goal)}"></div>
      <!-- Ziellinie -->
      <div class="absolute left-3 right-3 h-[3px] bg-red-600 rounded-full"
           style="transform: translateY(-50%); {yStyle(goal)}"></div>

      <!-- Guides -->
      {#each guides as g}
        <div class="absolute left-3 right-3 h-[1px] bg-black/30 dark:bg-white/30"
             style="transform: translateY(-50%); {yStyle(g)}"></div>
      {/each}

      <!-- Spalten-Labels + Marker (Hohlkreise) -->
      <div class="absolute left-3 right-3 bottom-2 grid"
           style="grid-template-columns: repeat({columns}, minmax(0,1fr)); gap: 8px;">
        {#each Array(columns) as _, i}
          <div class="flex flex-col items-center gap-2">
            <!-- Hohlmarker auf Ziellinien-Höhe – wird später mit Stift real markiert -->
            <div class="w-3 h-3 rounded-full border border-black/50 dark:border-white/60 bg-white/20"
                 style="margin-top: calc((100% - 12px) * (100 - {goal}) / 100);"></div>
            <div class="text-[10px] text-black/60 dark:text-white/60">W{i+1}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="mt-2 text-[11px] text-black/60 dark:text-white/60 flex items-center justify-between">
    <span>Führungen: {guides.join(" / ")}%</span>
    <span>Ziel: <b>{goal}%</b> ±{band}%</span>
  </div>
</section>
