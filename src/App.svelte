<script>
  let project = "";
  let workstation = "";
  let atl = "";
  let month = "";

  function resetAll() {
    project = workstation = atl = month = "";
  }
  function printBoards() {
    window.print();
  }
</script>

<style>
  :root { --stroke: #d0d5dd; }
  * { box-sizing: border-box; }
  body { margin: 0; }
  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px;
    display: grid;
    gap: 16px;
  }
  header {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    border: 1px solid var(--stroke); border-radius: 12px; padding: 12px; background: #fff;
  }
  header h1 { margin: 0; font-size: 20px; font-weight: 700; }
  .toolbar { display: flex; gap: 8px; flex-wrap: wrap; }
  button {
    padding: 8px 12px; border: 1px solid var(--stroke); border-radius: 8px;
    background: white; cursor: pointer;
  }
  .panel {
    border: 1px solid var(--stroke); border-radius: 12px; padding: 12px; background: #fff;
  }
  .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  label { display: grid; gap: 6px; font-size: 12px; color: #475467; }
  input { padding: 10px 12px; border: 1px solid var(--stroke); border-radius: 8px; font-size: 14px; }
  .boards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .board {
    border: 1px solid var(--stroke); border-radius: 12px; background: #fff; padding: 12px; display: grid; gap: 10px;
  }
  .board h3 { margin: 0; font-size: 16px; font-weight: 700; }
  .meta { font-size: 12px; color: #667085; }
  .month-grid { display: grid; grid-template-columns: repeat(31, 1fr); gap: 2px; border-top: 1px solid var(--stroke); padding-top: 8px; }
  .day {
    border: 1px dashed var(--stroke); min-height: 22px; font-size: 10px; display: grid; place-items: center;
    color: #98a2b3; user-select: none;
  }
  @media print { .no-print { display: none !important; } .container { padding: 0; } }
</style>

<div class="container">
  <header>
    <h1>SQDC Board – Rohling</h1>
    <div class="toolbar no-print">
      <button on:click={resetAll} title="Alles zurücksetzen">Zurücksetzen</button>
      <button on:click={printBoards} title="Drucken">Drucken</button>
    </div>
  </header>

  <section class="panel">
    <div class="grid3">
      <label>Projekt<input bind:value={project} placeholder="z. B. ARF / Projekt X" /></label>
      <label>Workstation<input bind:value={workstation} placeholder="z. B. WS01" /></label>
      <label>ATL<input bind:value={atl} placeholder="Teamlead" /></label>
    </div>
    <div class="grid2" style="margin-top:12px">
      <label>Monat<input type="month" bind:value={month} /></label>
      <div></div>
    </div>
  </section>

  <section class="boards">
    <article class="board">
      <h3>Safety (S)</h3>
      <div class="meta">{project || "—"} – {workstation || "—"} | ATL: {atl || "—"} | {month || "Monat auswählen"}</div>
      <div><strong>Regel:</strong> Farbliche Eintragung erfolgt ausschließlich <em>manuell</em> durch das Team.</div>
      <div class="month-grid">{#each Array(31) as _, i}<div class="day">{i + 1}</div>{/each}</div>
    </article>

    <article class="board">
      <h3>Quality (Q)</h3>
      <div class="meta">{project || "—"} – {workstation || "—"} | ATL: {atl || "—"} | {month || "Monat auswählen"}</div>
      <div><strong>Ziellinie:</strong> Auf dem Ausdruck wird eine deutliche, durchgezogene Ziellinie als Führung vorgesehen.</div>
      <div class="month-grid">{#each Array(31) as _, i}<div class="day">{i + 1}</div>{/each}</div>
    </article>

    <article class="board">
      <h3>Delivery (D)</h3>
      <div class="meta">{project || "—"} – {workstation || "—"} | ATL: {atl || "—"} | {month || "Monat auswählen"}</div>
      <div><strong>Einfach messbar:</strong> z. B. „Task Sequence eingehalten?“ (Team markiert Ja/Nein pro Tag).</div>
      <div class="month-grid">{#each Array(31) as _, i}<div class="day">{i + 1}</div>{/each}</div>
    </article>

    <article class="board">
      <h3>Cost (C)</h3>
      <div class="meta">{project || "—"} – {workstation || "—"} | ATL: {atl || "—"} | {month || "Monat auswählen"}</div>
      <div><strong>Beispiel:</strong> geplanter vs. realer Aufwand – Eintragung per Stift.</div>
      <div class="month-grid">{#each Array(31) as _, i}<div class="day">{i + 1}</div>{/each}</div>
    </article>
  </section>
</div>
