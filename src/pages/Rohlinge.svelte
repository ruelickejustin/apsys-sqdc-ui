<script>
  import { ws } from "../lib/wsState";
  import { getKpiFor, setKpiFor } from "../lib/kpiState";
  const KPIS=[{code:"S",label:"Safety"},{code:"Q",label:"Quality"},{code:"D",label:"Delivery"},{code:"C",label:"Cost"}];
  let currentCode="S";
  $: cfg = getKpiFor($ws.current, currentCode);
  const upd=(f,v)=>setKpiFor($ws.current,currentCode,{[f]:v});
  const updTitle=(i,v)=>{ const t=[...(cfg.weeklyTitles||[])]; t[i]=v; upd("weeklyTitles", t); };
</script>

<main class="max-w-5xl mx-auto p-4 space-y-4">
  <h1 class="text-xl font-semibold">Rohlinge – <span class="opacity-70">WS {$ws.current}</span></h1>

  <div class="flex gap-2 flex-wrap">
    {#each KPIS as k}
      <button class="px-3 py-1 rounded-lg border" class:selected={currentCode===k.code} on:click={()=>currentCode=k.code}>{k.label}</button>
    {/each}
  </div>

  <section class="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-900 p-4 grid sm:grid-cols-2 gap-4">
    <label class="block text-sm">Wochen (1–12)
      <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" type="number" min="1" max="12" bind:value={cfg.weeks} on:input={(e)=>upd("weeks", +e.target.value||8)}/>
    </label>

    <label class="block text-sm">Grid-Typ
      <select class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={cfg.gridType} on:change={(e)=>upd("gridType", e.target.value)}>
        <option value="line">Linie (Trend)</option>
        <option value="bar">Balken (Counts)</option>
      </select>
    </label>

    <label class="block text-sm">Ziellinie (%)
      <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" type="number" min="0" max="100" bind:value={cfg.goal} on:input={(e)=>upd("goal", +e.target.value||0)}/>
    </label>

    <label class="block text-sm">Zielband (± %)
      <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" type="number" min="0" max="20" value={cfg.band ?? 4}
             on:input={(e)=>upd("band", Math.max(0, Math.min(20, +e.target.value||0)))}/>
    </label>

    <label class="block text-sm">Hilfslinien (%, kommasepariert)
      <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" value={(cfg.guides||[]).join(",")}
             on:change={(e)=>upd("guides", e.target.value.split(",").map(x=>+x.trim()).filter(x=>!Number.isNaN(x)))}/>
    </label>

    <div class="sm:col-span-2 grid sm:grid-cols-2 gap-3">
      <label class="block text-sm">Wochentitel 1
        <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={cfg.weeklyTitles[0]} on:input={(e)=>updTitle(0,e.target.value)}/>
      </label>
      <label class="block text-sm">Wochentitel 2
        <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={cfg.weeklyTitles[1]} on:input={(e)=>updTitle(1,e.target.value)}/>
      </label>
    </div>
  </section>
</main>

<style>.selected{ background: rgba(99,102,241,.12); border-color: rgba(99,102,241,.4); }</style>
