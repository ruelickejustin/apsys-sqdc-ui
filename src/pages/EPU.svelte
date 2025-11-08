<script>
  import { session, getEPU } from "../lib/model";
  $: epu = getEPU($session.epuId);
  function openWS(wsId){
    session.update(s=>({ ...s, wsId })); location.hash = "/ws-setup";
  }
</script>

<main class="max-w-6xl mx-auto p-6 space-y-4">
  <h1 class="text-2xl font-semibold">{$session.project} – {epu?.name}</h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each epu?.workstations || [] as w}
      <button type="button" on:click={()=>openWS(w.id)}
        class="text-left rounded-2xl overflow-hidden shadow ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900 hover:-translate-y-0.5 transition p-0">
        <div class="p-4 bg-gradient-to-br from-slate-200 to-slate-300">
          <div class="text-xl font-semibold">{w.name}</div>
          <div class="opacity-80 text-sm">ATL: {w.atl}</div>
        </div>
        <div class="p-3 text-sm text-black/70 dark:text-white/70">
          Vorschau: Setup & Rohlinge
        </div>
      </button>
    {/each}
  </div>
</main>
