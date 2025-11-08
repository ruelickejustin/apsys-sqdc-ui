<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="5S / Bereiche / Audit" gradient="from-lime-400 to-green-600">
  <div class="grid gap-2" style="grid-template-columns: repeat(10,minmax(0,1fr));">
    {#each Array(20) as _}<div class="h-12 border rounded-md"></div>{/each}
  </div>
</PrintBase>
