<script>
  import Board from "../components/Board.svelte";
  import { goto } from "../lib/router";

  export let kpi = "Safety (S)";
  export let project=""; export let workstation=""; export let atl=""; export let month="";
  function back(){ goto("/"); }
</script>

<style>
  .wrap{ display:grid; gap:16px; }
  .toolbar{ display:flex; gap:8px; }
  .btn{ padding:8px 12px; border:1px solid var(--stroke); border-radius:10px; background:var(--btn); cursor:pointer; }
</style>

<div class="wrap">
  <div class="toolbar no-print">
    <button class="btn" on:click={back}>← Zurück</button>
  </div>
  <Board title={kpi} {project} {workstation} {atl} {month}/>
</div>
