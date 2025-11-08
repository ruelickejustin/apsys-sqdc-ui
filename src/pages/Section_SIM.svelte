<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="SIM – Short Interval Management" gradient="from-cyan-400 to-teal-600">
  <div class="text-sm mb-2 opacity-70">Zeitfenster – Maßnahme – Verantwortlich – Termin</div>
  <div class="grid gap-2" style="grid-template-columns: 1.2fr 2fr 1.5fr 1fr;">
    {#each Array(12) as _}
      <div class="border rounded p-2 h-12"></div>
      <div class="border rounded p-2 h-12"></div>
      <div class="border rounded p-2 h-12"></div>
      <div class="border rounded p-2 h-12"></div>
    {/each}
  </div>
</PrintBase>
