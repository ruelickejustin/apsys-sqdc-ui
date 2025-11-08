<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="Andon / Eskalation" gradient="from-red-500 to-rose-700">
  <div class="space-y-2">
    {#each Array(10) as _}<div class="h-10 border rounded-md"></div>{/each}
  </div>
</PrintBase>
