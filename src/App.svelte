<script>
  import { route, goto } from "./lib/router";
  import Dashboard from "./pages/Dashboard.svelte";
  import KPIBoard from "./pages/KPIBoard.svelte";
  import PrintPack from "./pages/PrintPack.svelte";
  import Settings from "./pages/Settings.svelte";

  // Board-Metadaten zentral im Header
  let project = ""; let workstation = ""; let atl = ""; let month = "";

  // Route-Daten extrahieren
  $: current = $route;
  function withQuery(qs){
    const p = new URLSearchParams(qs || "");
    return {
      project: p.get("p") ?? project,
      workstation: p.get("w") ?? workstation,
      atl: p.get("a") ?? atl,
      month: p.get("m") ?? month
    };
  }
  function parse(path){
    const [p, q] = path.split("?");
    return { path: p || "/", q: q || "" };
  }
  function navTo(k){ goto(k + `?p=${encodeURIComponent(project)}&w=${encodeURIComponent(workstation)}&a=${encodeURIComponent(atl)}&m=${month}`); }

  // Theme init
  let dark=false; $: document.documentElement.dataset.theme = dark ? "dark" : "light";
</script>

<style>
  :root {
    --bg:#f7f7f9; --card:#fff; --btn:#fff; --fg-strong:#111827; --fg:#1f2937; --fg-soft:#667085; --fg-dim:#6b7280;
    --stroke:#d1d5db; --shadow:0 1px 1px rgba(0,0,0,.03), 0 6px 18px rgba(0,0,0,.06);
    --ok:#b6f2c6; --warn:#ffe8b3; --bad:#ffd1d1; --day-bg:#fafafa;
  }
  [data-theme="dark"]{
    --bg:#0f1115; --card:#171923; --btn:#1f2330; --fg-strong:#f9fafb; --fg:#e5e7eb; --fg-soft:#a3a9b5; --fg-dim:#9aa1ad; --stroke:#2a2f3c; --shadow:none; --day-bg:#141824;
    --ok:#0c4f2e; --warn:#4a3a06; --bad:#4a1010;
  }
  *{ box-sizing:border-box; }
  html, body { height:100%; }
  body { margin:0; background:var(--bg); color:var(--fg); font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, "Noto Sans", Arial; }
  .app { display:grid; grid-template-columns: 240px 1fr; min-height:100vh; }
  .sidebar { border-right:1px solid var(--stroke); background:var(--card); padding:14px; display:grid; grid-template-rows:auto 1fr auto; gap:14px; }
  .brand { font:800 18px system-ui; color:var(--fg-strong); }
  .menu { display:grid; gap:6px; }
  .item { padding:8px 10px; border:1px solid var(--stroke); border-radius:10px; background:var(--btn); cursor:pointer; }
  .item:hover{ filter:brightness(0.98); }
  .content { padding:16px; display:grid; gap:16px; }
  .panel { border:1px solid var(--stroke); border-radius:14px; padding:12px; background:var(--card); box-shadow:var(--shadow); display:grid; gap:12px; }
  .grid { display:grid; grid-template-columns: repeat(4,1fr); gap:12px; }
  @media (max-width:1000px){ .app{ grid-template-columns: 1fr; } .sidebar{ grid-template-rows:auto; gap:8px; } .grid{ grid-template-columns:1fr; } }
  label { display:grid; gap:6px; font-size:12px; color:var(--fg-soft); }
  input { padding:10px 12px; border:1px solid var(--stroke); border-radius:10px; font-size:14px; background:var(--card); color:var(--fg); }
  .toprow { display:grid; gap:12px; }
  .btn { padding:8px 12px; border:1px solid var(--stroke); border-radius:10px; background:var(--btn); cursor:pointer; }
  @media print { .sidebar, .no-print{ display:none !important; } .content{ padding:8mm; } @page{ size:A4 landscape; margin:8mm; } body{ background:#fff; } }
</style>

<div class="app">
  <!-- Sidebar -->
  <aside class="sidebar no-print">
    <div class="brand">SQDC Suite</div>
    <div class="menu">
      <div class="item" on:click={()=>navTo("/")}>🏠 Dashboard</div>
      <div class="item" on:click={()=>navTo("/kpi/safety")}>🦺 Safety</div>
      <div class="item" on:click={()=>navTo("/kpi/quality")}>✅ Quality</div>
      <div class="item" on:click={()=>navTo("/kpi/delivery")}>🚚 Delivery</div>
      <div class="item" on:click={()=>navTo("/kpi/cost")}>💶 Cost</div>
      <div class="item" on:click={()=>navTo("/print")}>🖨️ Drucken</div>
      <div class="item" on:click={()=>navTo("/settings")}>⚙️ Einstellungen</div>
    </div>
    <div style="display:flex; gap:8px; align-items:center;">
      <button class="btn" on:click={()=>{dark=!dark}}>{dark? "☀️ Hell":"🌙 Dunkel"}</button>
    </div>
  </aside>

  <!-- Content -->
  <main class="content">
    <section class="panel">
      <div class="toprow grid">
        <label>Projekt<input bind:value={project} placeholder="z. B. ARF / Projekt X" /></label>
        <label>Workstation<input bind:value={workstation} placeholder="z. B. WS01" /></label>
        <label>ATL<input bind:value={atl} placeholder="Teamlead" /></label>
        <label>Monat<input type="month" bind:value={month} /></label>
      </div>
      <div class="no-print" style="color:var(--fg-dim); font-size:12px;">Diese Metadaten werden an alle KPI-Seiten und den Druck übergeben.</div>
    </section>

    {#key current}
      {#if parse(current).path === "/"}
        <Dashboard {...withQuery(parse(current).q)} bind:project bind:workstation bind:atl bind:month />
      {:else if parse(current).path === "/kpi/safety"}
        <KPIBoard kpi="Safety (S)" {...withQuery(parse(current).q)} />
      {:else if parse(current).path === "/kpi/quality"}
        <KPIBoard kpi="Quality (Q)" {...withQuery(parse(current).q)} />
      {:else if parse(current).path === "/kpi/delivery"}
        <KPIBoard kpi="Delivery (D)" {...withQuery(parse(current).q)} />
      {:else if parse(current).path === "/kpi/cost"}
        <KPIBoard kpi="Cost (C)" {...withQuery(parse(current).q)} />
      {:else if parse(current).path === "/print"}
        <PrintPack {...withQuery(parse(current).q)} />
      {:else if parse(current).path === "/settings"}
        <Settings />
      {:else}
        <div class="panel">Seite nicht gefunden.</div>
      {/if}
    {/key}
  </main>
</div>
