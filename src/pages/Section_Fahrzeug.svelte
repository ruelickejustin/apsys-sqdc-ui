<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="Fahrzeugordner" gradient="from-slate-400 to-slate-700">
  <div class="space-y-2">
    {#each Array(6) as _}<div class="h-14 border rounded-md"></div>{/each}
  </div>
</PrintBase>
