<script>
  import { goto } from "../lib/router";
  import { meta, pickWs } from "../lib/state";

  // später aus Excel/JSON: hier Demo
  const list = ["WS01","WS02","WS03","WS04"].map(id=>({id, name:`Workstation ${id}`}));

  function open(ws){ pickWs($meta.epu, ws.id); goto("/board/"+ws.id); }
</script>

<main class="max-w-4xl mx-auto p-6">
  <h1 class="text-2xl font-semibold mb-4">Workstation auswählen</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#each list as w}
      <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer text-center" on:click={()= on:keydown={(e)=>{if(e.key==="Enter"||e.key===" "){{()=;}}} role="button" tabindex="0">open(w)}>
        <div class="text-3xl mb-2">🛠️</div>
        <div class="text-lg font-medium">{w.name}</div>
      </div>
    {/each}
  </div>
</main>
