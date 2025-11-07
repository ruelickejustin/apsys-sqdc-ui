<script>
  export let title = 'Q – Quality';
  export let project = '';
  export let ws = '';
  export let atl = '';
  export let month = '2025-11';
  export let days = 31;

  export let yMax = 10;
  export let target = 3;
  export let numeric = false;        // für Q/C
  export let deliveryMode = 'binary';// für D

  // Position der Ziellinie (oben=0%, unten=100%)
  $: targetPos = Math.max(0, Math.min(100, 100 - (target / (yMax || 1)) * 100));
</script>

<section class="board">
  <header class="hdr">
    <div class="t">{title}</div>
    <div class="m">{project} · {ws} · {atl} · {month}</div>
  </header>

  <div class="chart">
    <div class="ylabels">
      <div>Y-Max: {yMax}</div>
      <div>Ziel: {target}</div>
    </div>

    <div class="grid">
      {#each Array(days) as _, i}
        <div class="day"><span>{i + 1}</span></div>
      {/each}
      <!-- durchgehende, fette Ziellinie (nur Führung, keine Vorfärbung) -->
      <div class="target" style={`top:${targetPos}%`}></div>
    </div>

    <div class="legend">
      <div>Manuell mit Stift ausfüllen: Tageswert je Spalte einzeichnen. Farbe (grün/rot) erfolgt ausschließlich von Hand am Board.</div>
    </div>
  </div>
</section>

<style>
  .board{
    width: 100%;
    border: 2px solid #222;
    border-radius: 6px;
    padding: 12px;
    box-sizing: border-box;
    page-break-inside: avoid;
    margin-bottom: 16px;
    background: #fff;
  }
  .hdr{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;}
  .hdr .t{ font-weight:700; font-size:18px;}
  .hdr .m{ font-size:12px; color:#333;}
  .chart{ position:relative; }
  .ylabels{ font-size:12px; margin-bottom:4px; display:flex; gap:16px; }
  .grid{
    position:relative;
    display:grid;
    grid-template-columns: repeat(31, 1fr);
    grid-auto-rows: 140px;          /* Zeichenhöhe */
    border:1px solid #aaa;
    background:
      linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px) 0 0 / calc(100%/31) 100%,
      linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px) 0 0 / 100% 20%;
  }
  .day{
    position:relative;
  }
  .day span{
    position:absolute; bottom:-18px; left:50%; transform:translateX(-50%);
    font-size:10px; color:#333;
  }
  /* Fette, durchgehende Ziellinie – NUR Führung */
  .target{
    position:absolute; left:0; right:0; height:0;
    border-top:3px solid #C00000; /* gut sichtbar, durchgehend */
    pointer-events:none;
  }
  .legend{ font-size:11px; color:#444; margin-top:6px;}
  @media print{
    body{ margin:0; background:#fff; }
    .board{ break-inside: avoid; }
  }
</style>
