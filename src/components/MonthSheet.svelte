<script>
  export let label = "KPI";
  export let help  = "Ziel als fette Linie einzeichnen. Tageswerte als Punkte/Striche.";
  export let days  = 31; // 28..31
</script>

<section class="space-y-3">
  <header class="flex items-center gap-3">
    <div class="text-2xl">📊</div>
    <div>
      <div class="text-lg font-semibold">{label}</div>
      <div class="text-xs opacity-70">{help}</div>
    </div>
  </header>

  <!-- Wochen-Raster (W1..W8) zum Handeintrag -->
  <div class="grid sm:grid-cols-8 gap-2">
    {#each Array(8) as _,i}
      <div class="h-24 border border-dashed rounded-md flex items-end justify-center text-[11px] opacity-70">W{i+1}</div>
    {/each}
  </div>

  <!-- Monats-Raster: 31 Felder in einer Zeile -->
  <div class="relative">
    <div class="grid gap-[4px]" style="grid-template-columns: repeat({days}, minmax(0,1fr));">
      {#each Array(days) as _,i}
        <div class="h-10 border rounded-md text-[10px] flex items-center justify-center">{i+1}</div>
      {/each}
    </div>
    <!-- fette Ziellinie -->
    <div class="absolute left-0 right-0" style="top: 50%;">
      <div class="h-[4px] bg-red-600 rounded-full"></div>
    </div>
  </div>

  <!-- Legende -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] opacity-80">
    <div class="flex items-center gap-2"><span class="inline-block w-3 h-3 rounded bg-green-500"></span> Ziel erreicht</div>
    <div class="flex items-center gap-2"><span class="inline-block w-3 h-3 rounded bg-yellow-400"></span> Risiko</div>
    <div class="flex items-center gap-2"><span class="inline-block w-3 h-3 rounded bg-orange-500"></span> knapp verfehlt</div>
    <div class="flex items-center gap-2"><span class="inline-block w-3 h-3 rounded bg-red-600"></span> deutlich verfehlt</div>
  </div>
</section>
