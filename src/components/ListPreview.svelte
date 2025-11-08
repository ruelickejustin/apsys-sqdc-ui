<script> export let lines=5; </script>
<div class="mt-2 p-3 bg-white/50 dark:bg-white/5 rounded-xl ring-1 ring-black/10 dark:ring-white/10">
  <div class="space-y-1">
    {#each Array(lines) as _,i}
      <div class="h-3 rounded bg-black/10 dark:bg-white/10"></div>
    {/each}
  </div>
</div>
