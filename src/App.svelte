<script>
  import Board from './components/Board.svelte';

  let project = '';
  let ws = '';
  let atl = '';
  let month = new Date().toISOString().slice(0,7); // YYYY-MM

  let yMaxQ = 10, targetQ = 3;
  let yMaxD = 1,  targetD = 1, deliveryMode = 'binary';
  let yMaxC = 1.5, targetC = 1;

  $: days = getDays(month);
  function getDays(mm){ const [y,m]=mm.split('-').map(Number); return new Date(y,m,0).getDate(); }

  function saveCfg(){
    const key = `sqdc:${project}:${ws}`;
    localStorage.setItem(key, JSON.stringify({project,ws,atl,month,yMaxQ,targetQ,yMaxD,targetD,yMaxC,targetC,deliveryMode}));
    alert('Konfiguration gespeichert.');
  }
  function loadCfg(){
    const key = `sqdc:${project}:${ws}`;
    const raw = localStorage.getItem(key);
    if(!raw){ alert('Keine gespeicherte Konfiguration.'); return; }
    const v = JSON.parse(raw);
    ({project,ws,atl,month,yMaxQ,targetQ,yMaxD,targetD,yMaxC,targetC,deliveryMode} = v);
  }
  function printBoards(){ window.print(); }
</script>

<header class="top">
  <h1>SQDC – Rohlinge (A4 quer, manuelle Eintragung am Board)</h1>
</header>

<section class="panel">
  <div class="grid">
    <label>Projekt<input bind:value={project} placeholder="z. B. ARF" /></label>
    <label>Workstation<input bind:value={ws} placeholder="z. B. WS-01" /></label>
    <label>ATL<input bind:value={atl} placeholder="Teamlead" /></label>
    <label>Monat<input type="month" bind:value={month} /></label>
  </div>

  <div class="grid grid3">
    <fieldset>
      <legend>Q – Quality</legend>
      <label>Y-Max<input type="number" step="0.1" bind:value={yMaxQ} /></label>
      <label>Ziel<input type="number" step="0.1" bind:value={targetQ} /></label>
    </fieldset>

    <fieldset>
      <legend>D – Delivery</legend>
      <label>Y-Max<input type="number" step="0.1" bind:value={yMaxD} /></label>
      <label>Ziel<input type="number" step="0.1" bind:value={targetD} /></label>
      <label>Modus
        <select bind:value={deliveryMode}>
          <option value="binary">Task Sequence (Ja/Nein)</option>
          <option value="numeric">Numerisch</option>
        </select>
      </label>
    </fieldset>

    <fieldset>
      <legend>C – Cost</legend>
      <label>Y-Max<input type="number" step="0.1" bind:value={yMaxC} /></label>
      <label>Ziel<input type="number" step="0.1" bind:value={targetC} /></label>
    </fieldset>
  </div>

  <div class="actions">
    <button on:click={saveCfg}>Konfig speichern</button>
    <button on:click={loadCfg}>Konfig laden</button>
    <button class="primary" on:click={printBoards}>Drucken / PDF</button>
  </div>
</section>

<section class="sheet">
  <Board title="S – Safety"  {project} {ws} {atl} {month} {days} type="S" />
  <Board title="Q – Quality" {project} {ws} {atl} {month} {days} type="Q" yMax={yMaxQ} target={targetQ} numeric={true} />
  <Board title="D – Delivery" {project} {ws} {atl} {month} {days} type="D" yMax={yMaxD} target={targetD} deliveryMode={deliveryMode} />
  <Board title="C – Cost"    {project} {ws} {atl} {month} {days} type="C" yMax={yMaxC} target={targetC} numeric={true} />
</section>

<style>
  .top{ padding:8px 0; }
  .panel{ border:1px solid #ddd; border-radius:8px; padding:12px; margin-bottom:12px; }
  .grid{ display:grid; grid-template-columns: repeat(4, minmax(140px,1fr)); gap:10px; }
  .grid3{ grid-template-columns: repeat(3, minmax(180px,1fr)); }
  label{ display:flex; flex-direction:column; gap:4px; font-size:14px; }
  input, select{ padding:6px 8px; border:1px solid #bbb; border-radius:6px; }
  fieldset{ border:1px solid #bbb; border-radius:8px; padding:8px; }
  legend{ padding:0 6px; font-weight:600; }
  .actions{ display:flex; gap:8px; margin-top:10px; }
  button{ padding:8px 10px; border:1px solid #333; background:#fff; border-radius:8px; }
  .primary{ background:#0a66ff; color:#fff; border-color:#0a66ff; }
  .sheet{ margin-top:12px; }
  @media print{ .panel, .top{ display:none; } }
</style>    deliveryMode = v.deliveryMode || "binary";
  }
  function printBoards(){ window.print(); }
</script>

<div class="wrap">
  <!-- TOPBAR -->
  <header class="topbar">
    <h1>SQDC Board – Rohlinge</h1>
    <div class="meta">
      <span>{project || "Projekt"}</span> ·
      <span>{ws || "Workstation"}</span> ·
      <span>{atl || "ATL"}</span>
    </div>
  </header>

  <!-- CONTROL PANEL -->
  <section class="panel">
    <div class="grid2">
      <label>
        Projekt
        <input bind:value={project} placeholder="z. B. ARF" />
      </label>
      <label>
        Workstation
        <input bind:value={ws} placeholder="z. B. WS-01" />
      </label>
      <label>
        ATL
        <input bind:value={atl} placeholder="Teamlead" />
      </label>
      <label>
        Monat
        <input type="month" bind:value={month} />
      </label>
    </div>

    <div class="grid3">
      <fieldset>
        <legend>Q – Quality</legend>
        <label>
          Y-Max
          <input type="number" step="0.1" bind:value={yMaxQ} />
        </label>
        <label>
          Ziel
          <input type="number" step="0.1" bind:value={targetQ} />
        </label>
      </fieldset>

      <fieldset>
        <legend>D – Delivery</legend>
        <label>
          Y-Max
          <input type="number" step="0.1" bind:value={yMaxD} />
        </label>
        <label>
          Ziel
          <input type="number" step="0.1" bind:value={targetD} />
        </label>
        <label>
          Modus
          <select bind:value={deliveryMode}>
            <option value="binary">Task Sequence (Ja/Nein)</option>
            <option value="numeric">Numerisch</option>
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>C – Cost</legend>
        <label>
          Y-Max
          <input type="number" step="0.1" bind:value={yMaxC} />
        </label>
        <label>
          Ziel
          <input type="number" step="0.1" bind:value={targetC} />
        </label>
      </fieldset>
    </div>

    <div class="actions">
      <button on:click={saveCfg}>Konfig speichern</button>
      <button on:click={loadCfg}>Konfig laden</button>
      <button class="primary" on:click={printBoards}>Drucken / PDF</button>
    </div>
  </section>

  <!-- PRINT SHEET -->
  <section class="sheet a4">
    <Board
      title="S – Safety"
      project={project}
      ws={ws}
      atl={atl}
      month={month}
      days={days}
      type="S" />

    <Board
      title="Q – Quality"
      project={project}
      ws={ws}
      atl={atl}
      month={month}
      days={days}
      type="Q"
      yMax={yMaxQ}
      target={targetQ}
      numeric={true} />

    <Board
      title="D – Delivery"
      project={project}
      ws={ws}
      atl={atl}
      month={month}
      days={days}
      type="D"
      yMax={yMaxD}
      target={targetD}
      deliveryMode={deliveryMode} />

    <Board
      title="C – Cost"
      project={project}
      ws={ws}
      atl={atl}
      month={month}
      days={days}
      type="C"
      yMax={yMaxC}
      target={targetC}
      numeric={true} />
  </section>
</div>    deliveryMode = v.deliveryMode || "binary";
  }
  function printBoards(){ window.print(); }
</script>

<div class="wrap">
  <header class="topbar">
    <h1>SQDC Board – Rohlinge</h1>
    <div class="meta">
      <span>{project || "Projekt"}</span> · <span>{ws || "Workstation"}</span> · <span>{atl || "ATL"}</span>
    </div>
  </header>

  <section class="panel">
    <div class="grid2">
      <label>Projekt<input bind:value={project} placeholder="z. B. ARF" /></label>
      <label>Workstation<input bind:value={ws} placeholder="z. B. WS-01" /></label>
      <label>ATL<input bind:value={atl} placeholder="Teamlead" /></label>
      <label>Monat<input type="month" bind:value={month} /></label>
    </div>

    <div class="grid3">
      <fieldset>
        <legend>Q – Quality</legend>
        <label>Y-Max<input type="number" step="0.1" bind:value={yMaxQ} /></label>
        <label>Ziel<input type="number" step="0.1" bind:value={targetQ} /></label>
      </fieldset>

      <fieldset>
        <legend>D – Delivery</legend>
        <label>Y-Max<input type="number" step="0.1" bind:value={yMaxD} /></label>
        <label>Ziel<input type="number" step="0.1" bind:value={targetD} /></label>
        <label class="row">
          Modus
          <select bind:value={deliveryMode}>
            <option value="binary">Task Sequence (Ja/Nein)</option>
            <option value="numeric">Numerisch</option>
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>C – Cost</legend>
        <label>Y-Max<input type="number" step="0.1" bind:value={yMaxC} /></label>
        <label>Ziel<input type="number" step="0.1" bind:value={targetC} /></label>
      </fieldset>
    </div>

    <div class="actions">
      <button on:click={saveCfg}>Konfig speichern</button>
      <button on:click={loadCfg}>Konfig laden</button>
      <button class="primary" on:click={printBoards}>Drucken / PDF</button>
    </div>
  </section>

  <section class="sheet a4">
    <Board title="S – Safety"
           project={project} ws={ws} atl={atl} month={month} days={days}
           type="S" />

    <Board title="Q – Quality"
           project={project} ws={ws} atl={atl} month={month} days={days}
           type="Q" yMax={yMaxQ} target={targetQ} numeric={true} />

    <Board title="D – Delivery"
           project={project} ws={ws} atl={atl} month={month} days={days}
           type="D" yMax={yMaxD} target={targetD} deliveryMode={deliveryMode} />

    <Board title="C – Cost"
           project={project} ws={ws} atl={atl} month={month} days={days}
           type="C" yMax={yMaxC} target={targetC} numeric={true} />
  </section>
</div>    <div class="meta">
      <span>{project || "Projekt"}</span> · <span>{ws || "Workstation"}</span> · <span>{atl || "ATL"}</span>
    </div>
  </header>

  <section class="panel">
    <div class="grid2">
      <label>Projekt<input bind:value={project} placeholder="z. B. ARF" /></label>
      <label>Workstation<input bind:value={ws} placeholder="z. B. WS-01" /></label>
      <label>ATL<input bind:value={atl} placeholder="Teamlead" /></label>
      <label>Monat<input type="month" bind:value={month} /></label>
    </div>

    <div class="grid3">
      <fieldset>
        <legend>Q – Quality</legend>
        <label>Y-Max<input type="number" step="0.1" bind:value={yMaxQ} /></label>
        <label>Ziel<input type="number" step="0.1" bind:value={targetQ} /></label>
      </fieldset>

      <fieldset>
        <legend>D – Delivery</legend>
        <label>Y-Max<input type="number" step="0.1" bind:value={yMaxD} /></label>
        <label>Ziel<input type="number" step="0.1" bind:value={targetD} /></label>
        <label class="row">
          Modus
          <select bind:value={deliveryMode}>
            <option value="binary">Task Sequence (Ja/Nein)</option>
            <option value="numeric">Numerisch</option>
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>C – Cost</legend>
        <label>Y-Max<input type="number" step="0.1" bind:value={yMaxC} /></label>
        <label>Ziel<input type="number" step="0.1" bind:value={targetC} /></label>
      </fieldset>
    </div>

    <div class="actions">
      <button on:click={saveCfg}>Konfig speichern</button>
      <button on:click={loadCfg}>Konfig laden</button>
      <button class="primary" on:click={printBoards}>Drucken / PDF</button>
    </div>
  </section>

  <section class="sheet a4">
    <Board title="S – Safety"    {project} {ws} {atl} {month} {days} type="S" />
    <Board title="Q – Quality"   {project} {ws} {atl} {month} {days} type="Q" yMax={yMaxQ} target={targetQ} numeric />
    <Board title="D – Delivery"  {project} {ws} {atl} {month} {days} type="D" yMax={yMaxD} target={targetD} {deliveryMode} />
    <Board title="C – Cost"      {project} {ws} {atl} {month} {days} type="C" yMax={yMaxC} target={targetC} numeric />
  </section>
</div>    if (!raw) return alert("Keine gespeicherte Konfiguration gefunden.");
    const v = JSON.parse(raw);
    ({ project, ws, atl, month, yMaxQ, targetQ, yMaxD, targetD, yMaxC, targetC, deliveryMode } = v);
  }
  function printBoards() { window.print(); }
</script>

<!-- ======== UI: Kopf / Setup ======== -->
<div class="wrap">
  <header class="topbar">
    <h1>SQDC Board – Rohlinge</h1>
    <div class="meta">
      <span>{project || "Projekt"}</span> · <span>{ws || "Workstation"}</span> · <span>{atl || "ATL"}</span>
    </div>
  </header>

  <section class="panel">
    <div class="grid2">
      <label>Projekt<input bind:value={project} placeholder="z. B. ARF" /></label>
      <label>Workstation<input bind:value={ws} placeholder="z. B. WS-01" /></label>
      <label>ATL<input bind:value={atl} placeholder="Teamlead" /></label>
      <label>Monat<input type="month" bind:value={month} /></label>
    </div>

    <div class="grid3">
      <fieldset>
        <legend>Q – Quality</legend>
        <label>Y-Max<input type="number" step="0.1" bind:value={yMaxQ} /></label>
        <label>Ziel<input type="number" step="0.1" bind:value={targetQ} /></label>
      </fieldset>

      <fieldset>
        <legend>D – Delivery</legend>
        <label>Y-Max<input type="number" step="0.1" bind:value={yMaxD} /></label>
        <label>Ziel<input type="number" step="0.1" bind:value={targetD} /></label>
        <label class="row">
          Modus
          <select bind:value={deliveryMode}>
            <option value="binary">Task Sequence (Ja/Nein)</option>
            <option value="numeric">Numerisch</option>
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>C – Cost</legend>
        <label>Y-Max<input type="number" step="0.1" bind:value={yMaxC} /></label>
        <label>Ziel<input type="number" step="0.1" bind:value={targetC} /></label>
      </fieldset>
    </div>

    <div class="actions">
      <button on:click={saveCfg}>Konfig speichern</button>
      <button on:click={loadCfg}>Konfig laden</button>
      <button class="primary" on:click={printBoards}>Drucken / PDF</button>
    </div>
  </section>

  <!-- ======== A4-Preview: 3 Rohlinge ======== -->
  <section class="sheet a4">
    <Board title="S – Safety"    {project} {ws} {atl} {month} days={days} type="S" />

    <Board title="Q – Quality"   {project} {ws} {atl} {month} days={days}
           type="Q" yMax={yMaxQ} target={targetQ} numeric />

    <Board title="D – Delivery"  {project} {ws} {atl} {month} days={days}
           type="D" yMax={yMaxD} target={targetD} {deliveryMode} />

    <Board title="C – Cost"      {project} {ws} {atl} {month} days={days}
           type="C" yMax={yMaxC} target={targetC} numeric />
  </section>
</div>

<!-- ======== Board-Komponente (inline) ======== -->
<script>
  export let title, project, ws, atl, month, days, type;
  export let yMax = 0, target = 0, numeric = false;
  export let deliveryMode = "binary";

  $: targetPos = numeric || type === "Q" || type === "C" || (type === "D" && deliveryMode === "numeric")
      ? pct(target, yMax) : 0;
</script>

<svelte:fragment slot="Board">
</svelte:fragment>

<div class="board">
  <div class="head">
    <div class="left">
      <h2>{title}</h2>
      <div class="sub">{project || "Projekt"} · {ws || "WS"} · {atl || "ATL"}</div>
    </div>
    <div class="right">{new Date(month + "-01").toLocaleDateString("de-DE",{month:"long",year:"numeric"})}</div>
  </div>

  <div class="canvas">
    <!-- Ziel-Linie: durchgängig & fett (nur bei numerischen KPIs) -->
    {#if (numeric || (type === "D" && deliveryMode === "numeric"))}
      <div class="target-line" style={`bottom:${targetPos}%;`}></div>
      <div class="ymax">Y-Max: {yMax}</div>
      <div class="target-label">Ziel: {target}</div>
    {/if}

    <!-- Raster: 1..days (Operator füllt später mit Stift aus) -->
    <div class="days-grid" style={`grid-template-columns: repeat(${days}, 1fr);`}>
      {#each Array(days) as _, i}
        <div class="day cell"><span class="num">{i+1}</span></div>
      {/each}
    </div>

    <!-- Delivery binär: Kästchen-Matrix statt Skalendiagramm -->
    {#if type === "D" && deliveryMode === "binary"}
      <div class="binary-legend">Task Sequence: <b>Ja = grün</b> · <b>Nein = rot</b> (manuell markieren)</div>
    {/if}
  </div>

  <div class="footer">
    <div>Anleitung: Täglich IST-Wert einzeichnen. Ziel wird als Linie gezeigt (falls numerisch).</div>
    <div class="sign">ATL: ____________  Datum: ____________</div>
  </div>
</div>

<style>
  /* Komponentenspezifisch */
  .board { page-break-inside: avoid; border: 1px solid var(--line); border-radius: 10px; padding: 12px; margin: 10px 0; background: white; }
  .head { display:flex; justify-content:space-between; align-items:end; margin-bottom:6px; }
  .head h2 { margin:0; font-size:18px; }
  .sub { font-size:12px; color:#666; }
  .right { font-weight:600; }
  .canvas { position:relative; border:1px solid var(--line); border-radius:8px; padding:8px; min-height:180px; }
  .days-grid { display:grid; gap:2px; }
  .day.cell { border:1px solid var(--grid); height:32px; position:relative; background:#fff; }
  .day.cell .num { position:absolute; bottom:2px; right:4px; font-size:10px; color:#777; }
  .target-line { position:absolute; left:6px; right:6px; height:0; border-top:4px solid var(--target); }
  .ymax, .target-label { position:absolute; right:10px; background:#fff; padding:2px 6px; font-size:11px; }
  .ymax { top:6px; border:1px solid var(--line); border-radius:6px; }
  .target-label { bottom:6px; border:1px solid var(--target); color:#222; border-radius:6px; }
  .binary-legend { position:absolute; left:10px; top:6px; font-size:12px; background:#fff; padding:2px 6px; border:1px dashed var(--line); border-radius:6px; }
  .footer { display:flex; justify-content:space-between; font-size:11px; margin-top:6px; }
</style>
