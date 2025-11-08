<script>
  export let title="KPI";
  export let icon="📊";
  export let metaLine="";
  export let pictos=[]; // z.B. ["🧯","🛡️"]
</script>

<header class="rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-900">
  <div class="p-5 text-white bg-gradient-to-br from-slate-700 to-slate-900">
    <div class="text-3xl">{icon}</div>
    <div class="text-2xl font-semibold mt-1">{title}</div>
    <div class="mt-2 text-sm text-white/80">{metaLine}</div>
    {#if pictos.length}
      <div class="mt-3 flex flex-wrap gap-2">
        {#each pictos as p}
          <span class="px-2 py-1 rounded-md bg-white/10 backdrop-blur text-sm">{p}</span>
        {/each}
      </div>
    {/if}
  </div>
</header>
