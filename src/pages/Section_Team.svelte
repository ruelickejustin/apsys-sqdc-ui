<script>import PrintBase from "./PrintBase.svelte";</script>
<PrintBase title="Team & Skills" gradient="from-purple-400 to-violet-700">
  <div class="grid gap-2" style="grid-template-columns: repeat(6,minmax(0,1fr));">
    {#each Array(24) as _}<div class="h-16 border rounded-md"></div>{/each}
  </div>
</PrintBase>
