<script>
  export let title = 'Q – Quality';
  export let project = '';
  export let ws = '';
  export let atl = '';
  export let month = '2025-11';
  export let days = 31;

  // für Q/D/C
  export let yMax = 10;
  export let target = 3;
  export let numeric = false;       // D kann auch binary sein
  export let deliveryMode = 'binary';

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
      <!-- durchgehende, fette Ziellinie (nur Führung) -->
      <div class="target" style={`top:${targetPos}%`}></div>
    </div>

    <div class="legend">
      <div>Manuell mit Stift ausfüllen: Tageswert pro Spalte eintragen/markieren. Grün/Rot erfolgt nur von Hand am Board.</div>
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
    grid-auto-rows: 140px;          /* Höhe des Zeichenbereichs */
    border:1px solid #aaa;
  }
  .day{
    border-left:1px solid #ddd;
    border-right:1px solid #ddd;
    position:relative;
  }
  .day span{
    position:absolute; bottom:-18px; left:50%; transform:translateX(-50%);
    font-size:10px; color:#333;
  }
  /* horizontale Hilfslinien (Matrix) */
  .grid::before, .grid::after{
    content:'';
    position:absolute; left:0; right:0;
    border-top:1px dashed #ccc;
  }
  .grid::before{ top:25%; }
  .grid::after{ top:75%; }

  /* Fette, durchgehende Ziellinie – NUR Führung */
  .target{
    position:absolute; left:0; right:0; height:0;
    border-top:3px solid #C00000; /* gut sichtbar, durchgehend */
    pointer-events:none;
  }

  .legend{ font-size:11px; color:#444; margin-top:6px;}
  @media print{
    body{ margin:0; }
    .board{ break-inside: avoid; }
  }
</style>    {/if}

    <div class="days-grid" style="grid-template-columns: repeat({days}, 1fr);">
      {#each Array(days) as _, i}
        <div class="day cell"><span class="num">{i+1}</span></div>
      {/each}
    </div>

    {#if type === "D" && deliveryMode === "binary"}
      <div class="binary-legend">Task Sequence: <b>Ja = grün</b> · <b>Nein = rot</b> (manuell markieren)</div>
    {/if}
  </div>

  <div class="footer">
    <div>Anleitung: Täglich IST-Wert einzeichnen. Ziel = fette, durchgängige Linie (falls numerisch).</div>
    <div class="sign">ATL: ____________  Datum: ____________</div>
  </div>
</div>
