<script> export let rows=4; export let cols=6; </script>
<div class="mt-2 p-3 bg-white/50 dark:bg-white/5 rounded-xl ring-1 ring-black/10 dark:ring-white/10">
  <div class="grid gap-1" style="grid-template-columns: repeat({cols}, minmax(0,1fr));">
    {#each Array(rows*cols) as _,i}
      <div class="h-4 rounded bg-black/10 dark:bg-white/10"></div>
    {/each}
  </div>
</div>
