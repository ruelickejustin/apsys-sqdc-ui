<script>
  import LetterBoard from "../components/LetterBoard.svelte";
  import { project, workstation, atl, month } from "../store.js";
  export let letter = "S";
  export let title = "Safety";
</script>

<div class="container">
  <h2>{title} (Board)</h2>
  <p>Tippe auf einen Tag, um den Status durch die Farben zu wechseln. Halte für eine Notiz.</p>
  <LetterBoard {letter} project={$project} workstation={$workstation} atl={$atl} month={$month} />
</div>

<style>
  .container{ max-width:600px; margin:auto; padding:16px; }
</style>
