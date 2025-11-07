<script>
  import Board from "../components/Board.svelte";
  export let project=""; export let workstation=""; export let atl=""; export let month="";
  function doPrint(){ window.print(); }
</script>

<style>
  .grid { display:grid; grid-template-columns: repeat(2,1fr); gap:16px; }
  @media (max-width:900px){ .grid{ grid-template-columns:1fr; } }
  @media print { .no-print{display:none} .grid{ gap:8px;} @page{ size:A4 landscape; margin:8mm; } body{ background:#fff; } }
  .btn{ padding:8px 12px; border:1px solid var(--stroke); border-radius:10px; background:var(--btn); cursor:pointer; }
</style>

<div class="no-print" style="display:flex; justify-content:flex-end; margin-bottom:8px;">
  <button class="btn" on:click={doPrint}>🖨️ Drucken</button>
</div>

<div class="grid">
  <Board title="Safety (S)"  {project} {workstation} {atl} {month}/>
  <Board title="Quality (Q)" {project} {workstation} {atl} {month}/>
  <Board title="Delivery (D)"{project} {workstation} {atl} {month}/>
  <Board title="Cost (C)"    {project} {workstation} {atl} {month}/>
</div>
