<script>
  import { route, back } from "../lib/router";
</script>
<header class="sticky top-10 z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-black/10 dark:border-white/10">
  <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
    {#if $route !== "/login"}
      <button type="button" on:click={back}
        class="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-sm">
        ← Zurück
      </button>
    {/if}
    <nav class="ml-auto flex gap-2 text-sm">
      <a href="#/login" class="px-3 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">Anmelden</a>
      <a href="#/workstations" class="px-3 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">Workstations</a>
      <a href="#/board" class="px-3 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">Board</a>
    </nav>
  </div>
</header>
