<script> import { meta } from "../lib/state"; </script>
<main class="max-w-3xl mx-auto p-4 space-y-4">
  <section class="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-900 p-4">
    <h2 class="font-semibold mb-3">Metadaten</h2>
    <div class="grid sm:grid-cols-2 gap-3">
      <label class="block text-sm">Projekt <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={$meta.project} placeholder="ARF / Projekt X"/></label>
      <label class="block text-sm">Workstation <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={$meta.workstation} placeholder="WS01"/></label>
      <label class="block text-sm">ATL <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={$meta.atl} placeholder="Teamlead"/></label>
      <label class="block text-sm">Monat <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" type="month" bind:value={$meta.month}/></label>
    </div>
  </section>
</main>
