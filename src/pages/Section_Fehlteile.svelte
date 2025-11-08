<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="Fehlteile & Auswertung" gradient="from-cyan-400 to-blue-600">
  <div class="grid gap-2" style="grid-template-columns: 2fr 1fr 1fr;">
    {#each Array(12) as _}<div class="h-12 border rounded-md"></div>{/each}
  </div>
</PrintBase>
