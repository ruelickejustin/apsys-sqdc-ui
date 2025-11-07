<script>
  import { goto } from "../lib/router";
  export let project=""; export let workstation=""; export let atl=""; export let month="";
  const cards = [
    { key:"/kpi/safety",  title:"Safety (S)",  emoji:"🦺", desc:"Regeln, Beinaheunfälle, 5S" },
    { key:"/kpi/quality", title:"Quality (Q)", emoji:"✅", desc:"Fehler, PC09, Erstpassquote" },
    { key:"/kpi/delivery",title:"Delivery (D)",emoji:"🚚", desc:"Takt, Sequenz, Liefertreue" },
    { key:"/kpi/cost",    title:"Cost (C)",    emoji:"💶", desc:"Plan vs. Ist, Aufwand" },
    { key:"/print",       title:"Drucken",     emoji:"🖨️", desc:"A4 quer, druckfertig" },
    { key:"/settings",    title:"Einstellungen",emoji:"⚙️",desc:"Dark-Mode, Reset, Backup" }
  ];
  function open(key){ goto(`${key}?p=${encodeURIComponent(project)}&w=${encodeURIComponent(workstation)}&a=${encodeURIComponent(atl)}&m=${month}`); }
</script>

<style>
  .grid{ display:grid; grid-template-columns: repeat(3,1fr); gap:16px; }
  @media (max-width:900px){ .grid{ grid-template-columns: 1fr; } }
  .card{ border:1px solid var(--stroke); background:var(--card); border-radius:14px; padding:14px; box-shadow:var(--shadow); display:grid; gap:8px; }
  .h{ display:flex; align-items:center; gap:10px; font-weight:800; color:var(--fg-strong); }
  .h span{ font-size:22px; }
  .desc{ color:var(--fg-dim); font-size:13px; }
  .btn{ justify-self:start; padding:8px 12px; border:1px solid var(--stroke); background:var(--btn); border-radius:10px; cursor:pointer; }
</style>

<div class="grid">
  {#each cards as c}
  <div class="card">
    <div class="h"><span>{c.emoji}</span>{c.title}</div>
    <div class="desc">{c.desc}</div>
    <button class="btn" on:click={()=>open(c.key)}>Öffnen</button>
  </div>
  {/each}
</div>
