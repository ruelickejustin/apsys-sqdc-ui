<script>
  import { goto } from "../lib/router";
  import { meta, pickEpu } from "../lib/state";
  let chosen = $meta.epu || "";
  function next(){ pickEpu(chosen||"EPU-1"); goto("/workstations"); }
</script>

<main class="max-w-md mx-auto p-6 space-y-3">
  <h1 class="text-2xl font-semibold mb-2">Anmelden</h1>
  <label class="block text-sm">EPU / Team
    <input class="mt-1 w-full border rounded-lg p-2 bg-transparent" bind:value={chosen} placeholder="z. B. ARF – Team A">
  </label>
  <button class="px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20" on:click={next}>
    weiter zu Workstations
  </button>
</main>
