<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="Workstation Audit" gradient="from-zinc-400 to-slate-600">
  <div class="space-y-2">
    {#each Array(8) as _}<div class="h-12 border rounded-md"></div>{/each}
  </div>
</PrintBase>
