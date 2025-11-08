<script>
  export let title="Vorschau"; export let icon="📊"; export let gradient="from-slate-300 to-slate-500";
</script>
<div class="rounded-2xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900">
  <div class={"p-4 text-white bg-gradient-to-br "+gradient}>
    <div class="flex items-center gap-3"><div class="text-2xl drop-shadow">{icon}</div><div class="text-lg font-semibold drop-shadow">{title}</div></div>
  </div>
  <div class="p-3 space-y-3">
    <div class="h-20 rounded-md border border-dashed border-black/30 dark:border-white/30 relative overflow-hidden p-2 grid grid-cols-8 gap-1">
      {#each Array(8) as _,i}<div class="border border-black/20 dark:border-white/20 rounded-sm"></div>{/each}
      <div class="absolute left-2 right-2 top-1/2 h-[3px] bg-red-600/90 rounded-full pointer-events-none"></div>
    </div>
    <div class="grid grid-cols-31 gap-0.5 text-[9px]">
      {#each Array(31) as _,i}<div class="h-4 border rounded flex items-center justify-center border-black/20 dark:border-white/20">{i+1}</div>{/each}
    </div>
    <p class="text-[10px] text-black/60 dark:text-white/60">Ziel-Linie + Handraster</p>
  </div>
</div>
<style>:global(.grid-cols-31){ grid-template-columns: repeat(31,minmax(0,1fr)); }</style>
