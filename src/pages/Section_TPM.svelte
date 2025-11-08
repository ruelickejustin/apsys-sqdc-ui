<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="TPM / Wartung" gradient="from-stone-400 to-slate-600">
  <div class="space-y-2">
    {#each Array(10) as _}<div class="h-12 border rounded-md"></div>{/each}
  </div>
</PrintBase>
