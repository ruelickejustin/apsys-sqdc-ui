<div class="mt-2 relative p-3 bg-white/50 dark:bg-white/5 rounded-xl ring-1 ring-black/10 dark:ring-white/10">
  <div class="grid gap-[2px] opacity-90" style="grid-template-columns: repeat(7, minmax(0,1fr));">
    {#each Array(35) as _,i}
      <div class="h-3 rounded bg-black/10 dark:bg-white/10"></div>
    {/each}
  </div>
  <div class="absolute left-3 right-3" style="top:55%;">
    <div class="h-[3px] rounded-full bg-red-600"></div>
  </div>
</div>
