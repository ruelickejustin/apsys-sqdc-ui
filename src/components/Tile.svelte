<script>
  export let title = "Bereich";
  export let icon  = "📄";
  export let href  = "#/";
  export let gradient = "from-slate-300 to-slate-500";
  export let subtitle = "";
</script>
<a href={href} class="block rounded-2xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900 hover:-translate-y-0.5 transition">
  <div class={"p-4 text-white bg-gradient-to-br "+gradient}>
    <div class="text-2xl">{icon}</div>
    <div class="text-lg font-semibold mt-1">{title}</div>
    {#if subtitle}<div class="text-xs opacity-90 mt-1">{subtitle}</div>{/if}
  </div>
  <div class="p-3 text-xs text-black/60 dark:text-white/60">Antippen/Click</div>
</a>
