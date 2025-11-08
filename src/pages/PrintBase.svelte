<script>
  export let title="Bereich"; export let subtitle=""; export let gradient="from-slate-400 to-slate-600";
  function printNow(){ window.print(); }
</script>

<main class="max-w-[1050px] mx-auto p-4 space-y-4">
  <section class="rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-900">
    <div class={"p-5 text-white bg-gradient-to-br "+gradient}>
      <div class="text-2xl font-semibold">{title}</div>
      {#if subtitle}<div class="opacity-90 mt-1">{subtitle}</div>{/if}
    </div>
    <div class="p-5">
      <slot/>
      <div class="mt-4 flex gap-2 print:hidden">
        <button class="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20" on:click={printNow}>Drucken (A4 Querformat)</button>
      </div>
    </div>
  </section>
</main>

<style>
  @media print { @page { size: A4 landscape; margin: 10mm; } .print\:hidden{ display:none !important; } }
  :global(body){ background:white !important; } /* Warnung weg */
</style>
