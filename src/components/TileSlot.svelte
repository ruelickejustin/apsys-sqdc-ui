<script>
  export let title=""; export let href="#/"; export let icon="📄"; export let picto="";
</script>
<a href={href} class="block rounded-xl ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900 hover:-translate-y-0.5 transition p-3">
  <div class="flex items-center gap-2 text-sm font-medium">
    {#if picto}<img src={"/src/assets/pictos/"+picto} alt="" class="h-5 w-5 object-contain"/>{:else}<span class="text-lg">{icon}</span>{/if}
    <span>{title}</span>
  </div>
  <div class="mt-2 h-28 border border-dashed rounded-md opacity-80"></div>
</a>
