<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="Q-Alarm / Abnahme / WSI" gradient="from-sky-400 to-blue-600">
  <div class="grid gap-2" style="grid-template-columns: repeat(3,minmax(0,1fr));">
    {#each Array(3) as _}<div class="h-40 border rounded-md"></div>{/each}
  </div>
</PrintBase>
