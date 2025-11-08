<script>
  import LetterBoard from "../components/LetterBoard.svelte";
  import { project, workstation, atl, month } from "../store.js";
  function printNow(){ window.print(); }
</script>

<div class="page">
  <button on:click={printNow} class="no-print print-btn">Drucken</button>
  <div class="boards">
    <LetterBoard letter="S" project={$project} workstation={$workstation} atl={$atl} month={$month}/>
    <LetterBoard letter="Q" project={$project} workstation={$workstation} atl={$atl} month={$month}/>
    <LetterBoard letter="D" project={$project} workstation={$workstation} atl={$atl} month={$month}/>
    <LetterBoard letter="C" project={$project} workstation={$workstation} atl={$atl} month={$month}/>
  </div>
</div>

<style>
  .print-btn{ margin-bottom:16px; padding:8px 12px; border-radius:8px; }
  .boards{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:24px; }
  @media print { .no-print{ display:none; } @page{ size:A4 landscape; margin:10mm; } }
</style>
