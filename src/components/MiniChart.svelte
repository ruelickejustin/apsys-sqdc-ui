<script> export let title="Kennzahl"; export let weeks=8; </script>
<section class="rounded-2xl ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900 p-3">
  <div class="text-sm font-medium mb-2">{title}</div>
  <div class="grid grid-cols-8 gap-1">
    {#each Array(weeks) as _, i}
      <div class="h-24 border border-dashed rounded-sm border-black/30 dark:border-white/30 flex items-end justify-center text-[10px] text-black/60 dark:text-white/60">W{i+1}</div>
    {/each}
  </div>
  <div class="mt-2 text-[10px] text-black/50 dark:text-white/50">Raster für Handeintrag.</div>
</section>
