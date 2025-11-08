<script>
  import PrintBase from "./PrintBase.svelte";
  export let title="Bereich";
  export let type="list";       // "list" | "matrix" | "canvas"
  export let rows=12, cols=6;   // für matrix/list
</script>

<PrintBase title={title}>
  {#if type==="list"}
    <div class="grid gap-2" style="grid-template-columns: 2fr 1fr 1fr 1fr;">
      {#each Array(rows) as _}
        <div class="border rounded p-2 h-10"></div><div class="border rounded p-2 h-10"></div><div class="border rounded p-2 h-10"></div><div class="border rounded p-2 h-10"></div>
      {/each}
    </div>
  {:else if type==="matrix"}
    <div class="grid gap-2" style={`grid-template-columns: repeat(${cols}, minmax(0,1fr));`}>
      {#each Array(rows*cols) as _}<div class="border rounded h-10"></div>{/each}
    </div>
  {:else}
    <div class="h-[560px] border-2 border-dashed rounded-xl"></div>
  {/if}
</PrintBase>
