<script>
  import { session, ensureWS, updateWS, catalog, getWS } from "../lib/model";
  $: ws = getWS($session.epuId, $session.wsId);
  $: form = ensureWS($session.epuId, $session.wsId);

  function save(){
    updateWS($session.epuId, $session.wsId, form);
    location.hash = "/ws-print";
  }
</script>

<main class="max-w-3xl mx-auto p-6 space-y-4">
  <h1 class="text-2xl font-semibold">{ws?.name} – Einstellungen</h1>
  <section class="rounded-2xl ring-1 ring-black/10 dark:ring-white/10 p-4 bg-white dark:bg-neutral-900">
    <div class="grid sm:grid-cols-2 gap-4">
      <label class="text-sm">Monat
        <input type="month" class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={form.month} />
      </label>
      <label class="text-sm">ATL (Teamlead)
        <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={form.atl} placeholder={ws?.atl} />
      </label>
      <label class="text-sm">Takt / Zyklus
        <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={form.takt} placeholder="z.B. 20 min" />
      </label>
      <label class="text-sm">Ziel (KPI)
        <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={form.target} placeholder="z.B. 95%" />
      </label>
      <label class="text-sm">Piktogramm
        <select class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={form.pictoId}>
          <option value="">– optional –</option>
          {#each catalog.pictos as p}
            <option value={p.id}>{p.icon} {p.label}</option>
          {/each}
        </select>
      </label>
      <label class="text-sm">Notiz (optional)
        <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={form.note} placeholder="Hinweis…" />
      </label>
    </div>

    <div class="mt-4 flex gap-2">
      <button type="button" class="px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20" on:click={save}>
        Bestätigen & Rohlinge anzeigen
      </button>
      <a href="#/epu" class="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">Zurück</a>
    </div>
  </section>
</main>
