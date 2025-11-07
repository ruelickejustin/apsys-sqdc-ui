<script>
  let info = "";
  function toggleTheme(){
    const cur = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = cur;
  }
  function wipe(){
    if (confirm("Wirklich alle SQDC-Daten im Browser löschen?")) {
      Object.keys(localStorage).forEach(k => { if (k.startsWith("sqdc:")) localStorage.removeItem(k); });
      info = "Lokale SQDC-Daten gelöscht.";
    }
  }
  function backup(){
    const dump = {};
    Object.keys(localStorage).forEach(k => { if (k.startsWith("sqdc:")) dump[k] = JSON.parse(localStorage.getItem(k)); });
    const a = document.createElement("a");
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dump, null, 2));
    a.download = "sqdc-backup.json"; a.click();
  }
  function restore(ev){
    const f = ev.target.files?.[0]; if(!f) return;
    const r = new FileReader();
    r.onload = () => {
      try{
        const obj = JSON.parse(r.result);
        Object.entries(obj).forEach(([k,v]) => localStorage.setItem(k, JSON.stringify(v)));
        info = "Backup importiert.";
      } catch(e){ info = "Fehler: "+e; }
    };
    r.readAsText(f); ev.target.value = "";
  }
</script>

<style>
  .panel{ border:1px solid var(--stroke); background:var(--card); border-radius:14px; padding:14px; box-shadow:var(--shadow); display:grid; gap:10px; }
  .row{ display:flex; gap:8px; flex-wrap:wrap; }
  .btn{ padding:8px 12px; border:1px solid var(--stroke); border-radius:10px; background:var(--btn); cursor:pointer; }
  .info{ color:var(--fg-dim); font-size:13px; }
</style>

<div class="panel">
  <div class="row">
    <button class="btn" on:click={toggleTheme}>🌗 Hell/Dunkel</button>
    <button class="btn" on:click={backup}>💾 Backup exportieren</button>
    <label class="btn" style="cursor:pointer">📥 Backup importieren
      <input type="file" accept="application/json" on:change={restore} style="display:none">
    </label>
    <button class="btn" on:click={wipe}>🧹 Browserdaten löschen</button>
  </div>
  {#if info}<div class="info">{info}</div>{/if}
</div>
