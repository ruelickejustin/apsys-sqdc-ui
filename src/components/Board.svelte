<script>
  import { onMount } from "svelte";
  export let title = "Board";
  export let project = "";
  export let workstation = "";
  export let atl = "";
  export let month = "";

  let status = [];
  let notes = [];
  let days = 31;

  const daysInMonth = (yyyyMM) => {
    if (!yyyyMM) return 31;
    const [y, m] = yyyyMM.split("-").map(Number);
    return new Date(y, m, 0).getDate();
  };
  const key = () => `sqdc:${title}:${project}:${workstation}:${month}`;

  function load() {
    days = daysInMonth(month);
    status = Array.from({ length: days }, (_, i) => status[i] ?? 0);
    notes  = Array.from({ length: days }, (_, i) => notes[i] ?? "");
    try {
      const raw = localStorage.getItem(key());
      if (raw) {
        const obj = JSON.parse(raw);
        if (Array.isArray(obj.status)) status = obj.status.slice(0, days);
        if (Array.isArray(obj.notes))  notes  = obj.notes.slice(0, days);
      }
    } catch {}
  }
  function save(){ try { localStorage.setItem(key(), JSON.stringify({ status, notes })); } catch {} }

  function cycle(i){ status[i] = ((status[i] ?? 0) + 1) % 4; save(); }
  let pressTimer;
  const startPress = (i)=>{ clearTimeout(pressTimer); pressTimer = setTimeout(()=>editNote(i), 500); };
  const endPress = ()=>clearTimeout(pressTimer);
  function editNote(i){
    const n = prompt(`Notiz für Tag ${i+1}:`, notes[i] ?? "");
    if (n !== null){ notes[i] = n.trim(); save(); }
  }
  function clearAll(){ status = status.map(()=>0); notes = notes.map(()=> ""); save(); }
  function allGreen(){ status = status.map(()=>1); save(); }

  function exportJSON(){
    const payload = { v:1, title, project, workstation, atl, month, status, notes };
    const a = document.createElement("a");
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    a.download = `${title}-${project}-${workstation}-${month}.json`.replace(/\s+/g,"_");
    a.click();
  }
  function importJSON(ev){
    const f = ev.target.files?.[0]; if(!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const o = JSON.parse(r.result);
        if (Array.isArray(o.status)) status = o.status.slice(0, days);
        if (Array.isArray(o.notes))  notes  = o.notes.slice(0, days);
        save();
      } catch(e){ alert("Import fehlgeschlagen: "+e); }
    };
    r.readAsText(f); ev.target.value = "";
  }

  $: load();
  onMount(load);
</script>

<style>
  .card { border:1px solid var(--stroke); border-radius:14px; padding:12px; background:var(--card); box-shadow:var(--shadow); display:grid; gap:10px; }
  .head { display:flex; align-items:center; justify-content:space-between; gap:8px; }
  .head h3{ margin:0; font: 700 16px system-ui; color:var(--fg-strong); }
  .meta { font-size:12px; color:var(--fg-dim); }
  .actions { display:flex; gap:6px; flex-wrap:wrap; }
  .btn { padding:7px 10px; border:1px solid var(--stroke); background:var(--btn); border-radius:10px; font-size:12px; cursor:pointer; }
  .grid { display:grid; grid-template-columns: repeat(31, minmax(22px,1fr)); gap:3px; }
  .day { height:26px; border:1px dashed var(--stroke); border-radius:6px; font-size:11px; display:grid; place-items:center; color:var(--fg-soft); position:relative; user-select:none; touch-action:manipulation; background:var(--day-bg); }
  .day[data-s="1"]{ background:var(--ok);   color:#073b17; border-style:solid; }
  .day[data-s="2"]{ background:var(--warn); color:#5b3f00; border-style:solid; }
  .day[data-s="3"]{ background:var(--bad);  color:#4a0f0f; border-style:solid; }
  .note-dot{ position:absolute; right:3px; bottom:3px; width:6px; height:6px; border-radius:50%; background:var(--fg-strong); opacity:.55; }
  .legend{ display:flex; gap:8px; align-items:center; font-size:11px; color:var(--fg-dim); }
  .swatch{ width:14px; height:14px; border-radius:4px; border:1px solid var(--stroke); }
  .sw-ok{background:var(--ok);} .sw-warn{background:var(--warn);} .sw-bad{background:var(--bad);}
</style>

<div class="card">
  <div class="head">
    <h3>{title}</h3>
    <div class="actions no-print">
      <button class="btn" on:click={clearAll}>Alle leeren</button>
      <button class="btn" on:click={allGreen}>Alle grün</button>
      <button class="btn" on:click={exportJSON}>Export</button>
      <label class="btn" style="cursor:pointer">Import
        <input type="file" accept="application/json" on:change={importJSON} style="display:none">
      </label>
    </div>
  </div>

  <div class="meta">{project || "—"} – {workstation || "—"} | ATL: {atl || "—"} | {month || "Monat"}</div>

  <div class="legend no-print">
    <span>Tippen: Status wechseln · Long-press: Notiz</span>
    <span class="swatch sw-ok"></span>grün
    <span class="swatch sw-warn"></span>gelb
    <span class="swatch sw-bad"></span>rot
  </div>

  <div class="grid">
    {#each Array(days) as _, i}
      <div class="day"
        data-s={status[i] ?? 0}
        on:click={() => cycle(i)}
        on:pointerdown={() => startPress(i)}
        on:pointerup={endPress}
        on:pointerleave={endPress}
        title={notes[i] ? `Tag ${i+1}: ${notes[i]}` : `Tag ${i+1}`}>
        {i+1}
        {#if notes[i]}<span class="note-dot"></span>{/if}
      </div>
    {/each}
  </div>
</div>
