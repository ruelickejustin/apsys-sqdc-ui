<script>
  import MiniChart from "../components/MiniChart.svelte";
  import { meta } from "../lib/state";
  export let title="Safety"; export let icon="🦺"; export let gradient="from-green-400 to-emerald-600";
  function printNow(){ window.print(); }
</script>
<main class="max-w-7xl mx-auto p-6 space-y-4">
  <section class="rounded-2xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900">
    <div class={"p-5 text-white bg-gradient-to-br "+gradient}>
      <div class="text-3xl">{icon}</div>
      <div class="text-2xl font-semibold mt-1">{title}</div>
    </div>
    <div class="p-5">
      <div class="text-sm text-black/60 dark:text-white/60 mb-3">
        {$meta.project || "Projekt …"} – {$meta.workstation || "WS …"} – ATL: {$meta.atl || "…"} – {$meta.month || "Monat …"}
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <MiniChart title="Kennzahl 1 (Woche)"/>
        <MiniChart title="Kennzahl 2 (Woche)"/>
      </div>
      <section class="mt-4 rounded-2xl ring-1 ring-black/10 dark:ring-white/10 p-4 relative">
        <h3 class="font-medium mb-2">Monatsraster</h3>
        <div class="grid grid-cols-31 gap-1 text-[10px]">
          {#each Array(31) as _,i}
            <div class="border rounded-sm h-8 flex items-center justify-center">{i+1}</div>
          {/each}
        </div>
        <!-- fette, sichtbare Ziel-Linie -->
        <div class="absolute left-4 right-4 -translate-y-1/2 pointer-events-none" style="top: calc(50% + 2.25rem);">
          <div class="h-[4px] bg-red-600 rounded-full"></div>
        </div>
        <p class="mt-2 text-[11px] opacity-70">Ziel-KPI: fette Linie (Referenz). Ist-Werte täglich per Hand eintragen.</p>
      </section>
      <div class="mt-4 flex gap-2 print:hidden">
        <button type="button" on:click={printNow} class="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20">Drucken (A4 Quer)</button>
      </div>
    </div>
  </section>
</main>
<style>
  @media print {
    @page { size: A4 landscape; margin: 12mm; }
    .print\:hidden { display: none !important; }
    body { background: white !important; }
  }
  :global(.grid-cols-31){ grid-template-columns: repeat(31,minmax(0,1fr)); }
</style>
