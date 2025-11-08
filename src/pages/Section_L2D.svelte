<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="Left-to-Do" gradient="from-rose-400 to-orange-500">
  <div class="text-sm mb-2 opacity-70">Aufgabe – Verantwortlich – Fällig – Status</div>
  <div class="grid gap-2" style="grid-template-columns: 2fr 1.2fr 1fr 1fr;">
    {#each Array(18) as _}
      <div class="border rounded p-2 h-10"></div>
      <div class="border rounded p-2 h-10"></div>
      <div class="border rounded p-2 h-10"></div>
      <div class="border rounded p-2 h-10"></div>
    {/each}
  </div>
</PrintBase>
