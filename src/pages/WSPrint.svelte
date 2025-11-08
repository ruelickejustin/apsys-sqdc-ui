<script>
  import { session, wsConfig, getWS, catalog } from "../lib/model";
  let tab = "S"; // S,Q,D,C
  $: cfg = $wsConfig?.[$session.epuId]?.[$session.wsId] || {};
  $: ws = getWS($session.epuId, $session.wsId);
  $: picto = catalog.pictos.find(p=>p.id===cfg.pictoId);
  function printNow(){ window.print(); }
</script>

<main class="max-w-[1200px] mx-auto p-4 space-y-3">
  <div class="flex items-center gap-2">
    <a href="#/ws-setup" class="px-3 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">← Einstellungen</a>
    <div class="ml-auto flex gap-2">
      {#each ["S","Q","D","C"] as t}
        <button
          type="button"
          on:click={()=>tab=t}
          class={"px-3 py-1 rounded-lg border " +
                 (tab===t ? "bg-black/5 dark:bg-white/10" : "")}
        >{t}</button>
      {/each}
      <button
        type="button"
        on:click={printNow}
        class="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 print:hidden"
      >
        Drucken (A4 quer)
      </button>
    </div>
  </div>

  <section class="rounded-2xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900 p-0">
    <!-- Kopf -->
    <div class="p-4 bg-gradient-to-r from-slate-200 to-slate-300 flex items-center gap-3">
      <div class="text-2xl">{picto?.icon || "📄"}</div>
      <div class="text-xl font-semibold">{ws?.name} – {tab}</div>
      <div class="ml-auto text-sm opacity-80">
        ATL: {cfg.atl || ws?.atl} · Ziel: {cfg.target || "–"} · Takt: {cfg.takt || "–"} · Monat: {cfg.month || "–"}
      </div>
    </div>

    <!-- Inhalt: großes Führungsraster -->
    <div class="p-4">
      <div class="grid grid-cols-31 gap-1 text-[10px] relative">
        {#each Array(31) as _, i}
          <div class="border rounded-sm h-24 flex flex-col">
            <div class="px-1 py-0.5 opacity-60">{i+1}</div>
            <div class="flex-1 border-t border-dashed"></div>
          </div>
        {/each}

        <!-- fette, durchgezogene Ziellinie (mittig) -->
        <div class="absolute left-0 right-0" style="top: 50%;">
          <div class="h-[4px] bg-red-600 rounded-full"></div>
        </div>
      </div>

      <div class="mt-2 text-[11px] text-black/70 dark:text-white/70">
        Hinweis: Tageswerte handschriftlich in die Spalten eintragen. Ziellinie ist Referenz – nicht gestrichelt.
      </div>
    </div>
  </section>
</main>

<style>
  @media print {
    @page { size: A4 landscape; margin: 10mm; }
    .print\:hidden { display: none !important; }
    body { background: white !important; }
    main { max-width: none !important; padding: 0 !important; }
  }
  :global(.grid-cols-31){ grid-template-columns: repeat(31,minmax(0,1fr)); }
</style>
