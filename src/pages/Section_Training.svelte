<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="Training / Kompetenz" gradient="from-amber-400 to-yellow-600">
  <div class="grid gap-2" style="grid-template-columns: 1.5fr 1fr 1fr;">
    {#each Array(12) as _}<div class="h-12 border rounded-md"></div>{/each}
  </div>
</PrintBase>
