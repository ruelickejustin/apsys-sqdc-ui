<script>
  import { route } from "../lib/router";
  import { ws, pickWs, meta } from "../lib/state";

  let r; route.subscribe(v=>r=v);
  $: seg = r.split("/").filter(Boolean); // ["kpi", ":ws", "d"]
  $: wsId = seg[1];
  $: ($ws.id!==wsId) && pickWs($meta.epu, wsId);

  function printNow(){ window.print(); }
</script>

<main class="max-w-[1100px] mx-auto p-4 space-y-3">
  <section class="rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
    <div class="p-5 text-white bg-gradient-to-br from-indigo-400 to-violet-600">
      <div class="text-2xl font-semibold">Delivery – {$ws.id}</div>
      <div class="text-sm opacity-90">Takt/Zyklus – Einhaltung, OTIF</div>
    </div>
    <div class="p-5">
      <!-- Wochenraster -->
      <div class="grid grid-cols-8 gap-2 mb-2">
        {#each Array(8) as _,i}<div class="h-24 border border-dashed rounded-md flex items-end justify-center text-[10px] text-black/60 dark:text-white/60">W{i+1}</div>{/each}
      </div>
      <!-- Monatsraster + Ziel-Legende -->
      <div class="mb-3 grid grid-cols-31 gap-1 text-[10px]">
        {#each Array(31) as _,i}<div class="border rounded-sm h-6 flex items-center justify-center">{i+1}</div>{/each}
      </div>
      <div class="flex items-center gap-6 text-xs text-black/70 dark:text-white/70">
        <span class="inline-flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>Ziel erreicht</span>
        <span class="inline-flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>Risiko</span>
        <span class="inline-flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-orange-500 inline-block"></span>knapp verfehlt</span>
        <span class="inline-flex items-center gap-1"><span class="w-3 h-3 rounded-full bg-rose-600 inline-block"></span>deutlich verfehlt</span>
      </div>
      <div class="mt-4 print:hidden">
        <button class="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20" on:click={printNow}>Drucken (A4 Querformat)</button>
      </div>
    </div>
  </section>
</main>

<style>
  @media print { @page { size: A4 landscape; margin: 10mm; } .print\:hidden { display:none !important; } }
  :global(.grid-cols-31){ grid-template-columns: repeat(31,minmax(0,1fr)); }
</style>
