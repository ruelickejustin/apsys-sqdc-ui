<script>
  let proj = "Projekt X";
  let ws = "WS01";
  let atl = "ATL Name";
  let month = new Date().toISOString().slice(0,7);
  let yQ = 10, tQ = 3;
  let yD = 1,  tD = 1, dMode = "NUMERISCH";
  let yC = 1.5, tC = 1.0;
  let gridH = 6, gridW = 7, margin = 10;
  let show = { S:true, Q:true, D:true, C:true };
  let step = 1;
  const COLORS = { blue:'#1E3246', red:'#DC3223', green:'#19AA6E', grey:'#D2D7DC' };
  function saveCfg(){
    const cfg = {proj,ws,atl,month,yQ,tQ,yD,tD,dMode,yC,tC,gridH,gridW,margin,show};
    localStorage.setItem('sqdc_cfg', JSON.stringify(cfg));
    alert("Konfiguration gespeichert.");
  }
  function loadCfg(){
    const s = localStorage.getItem('sqdc_cfg'); if(!s) return alert("Keine Konfiguration gefunden.");
    const c = JSON.parse(s);
    ({proj,ws,atl,month,yQ,tQ,yD,tD,dMode,yC,tC,gridH,gridW,margin,show} = c);
    alert("Konfiguration geladen.");
  }
  function daysInMonth(ym){ const [y,m]=ym.split('-').map(Number); return new Date(y,m,0).getDate(); }
  function mm(val){ return val*3.7795275591 }
  function drawBoardSVG({kpi, yMax, target, month, proj, ws, atl, gridH, gridW, margin, dMode}) {
    const days = daysInMonth(month);
    const pageW = mm(297 - 2*margin), pageH = mm(210 - 2*margin);
    const cellW = mm(gridW), cellH = mm(gridH);
    const chartX = mm(22), chartY = mm(36);
    const ySteps = Math.max(6, Math.floor((pageH - chartY - mm(22)) / cellH));
    const chartW = cellW * days;
    const chartH = cellH * ySteps;
    const svgNS='http://www.w3.org/2000/svg';
    const s = document.createElementNS(svgNS,'svg');
    s.setAttribute('width', pageW); s.setAttribute('height', pageH);
    s.setAttribute('viewBox', `0 0 ${pageW} ${pageH}`);
    const el=(n,a,t)=>{const e=document.createElementNS(svgNS,n); for(const k in a) e.setAttribute(k,a[k]); if(t) e.textContent=t; return e;};
    s.appendChild(el('text',{x:mm(5),y:mm(10),fill:COLORS.blue,'font-size':'18','font-weight':'700'},`${proj} – ${ws} – ${kpi}`));
    s.appendChild(el('text',{x:mm(5),y:mm(17),fill:'#333','font-size':'12'},`ATL: ${atl}   |   ${new Date(month+'-01').toLocaleString('de-DE',{month:'long',year:'numeric'})}`));
    if(kpi==='Safety'){
      s.appendChild(el('rect',{x:mm(5),y:mm(30),width:pageW-mm(10),height:pageH-mm(45),fill:'none',stroke:'#000','stroke-width':1}));
      s.appendChild(el('text',{x:mm(8),y:mm(40),'font-size':'13',fill:'#111'},'EHS-Hinweis/Checkliste – Team trägt täglich manuell ein (kein Autocolor).'));
      return s;
    }
    s.appendChild(el('rect',{x:chartX,y:chartY,width:chartW,height:chartH,fill:'none',stroke:'#000','stroke-width':1}));
    for(let i=0;i<=ySteps;i++){
      const y = chartY + i*cellH;
      s.appendChild(el('line',{x1:chartX,y1:y,x2:chartX+chartW,y2:y,stroke:COLORS.grey,'stroke-width':(i%5===0?1.2:0.6)}));
      const v = (ySteps-i) * (yMax/ySteps);
      if(i%2===0) s.appendChild(el('text',{x:chartX-mm(6),y:y+4,'text-anchor':'end','font-size':'10',fill:'#333'}, (yMax<5? v.toFixed(1):Math.round(v)).toString()));
    }
    for(let d=0; d<days; d++){
      const x = chartX + d*cellW;
      s.appendChild(el('line',{x1:x,y1:chartY,x2:x,y2:chartY+chartH,stroke:COLORS.grey,'stroke-width':0.6}));
      s.appendChild(el('text',{x:x+cellW/2,y:chartY+chartH+mm(5),'text-anchor':'middle','font-size':'10'}, String(d+1)));
    }
    const ty = chartY + (1 - (target/yMax)) * chartH;
    s.appendChild(el('line',{x1:chartX,y1:ty,x2:chartX+chartW,y2:ty,stroke:COLORS.red,'stroke-width':3}));
    s.appendChild(el('text',{x:chartX+chartW/2,y:chartY+chartH+mm(12),'text-anchor':'middle','font-size':'12',fill:'#111'},'Tag im Monat'));
    s.appendChild(el('text',{x:chartX-mm(16),y:chartY-6,'text-anchor':'start','font-size':'12',fill:'#111'},'Wert'));
    if(kpi==='Delivery' && dMode==='BINÄR'){
      s.appendChild(el('text',{x:chartX+mm(5),y:chartY+mm(5),'font-size':'12',fill:'#111'},'Modus: BINÄR (Ja/Nein)'));
    }
    return s;
  }
  function render(kpi, yMax, target){
    const host = document.getElementById(`p-${kpi}`);
    host.innerHTML = "";
    host.appendChild(drawBoardSVG({kpi, yMax, target, month, proj, ws, atl, gridH, gridW, margin, dMode}));
  }
  function previewAll(){
    if(show.Q) render('Quality', yQ, tQ);
    if(show.D) render('Delivery', yD, tD);
    if(show.C) render('Cost',    yC, tC);
    if(show.S) render('Safety',  1,  0);
  }
  $: if(step===2) previewAll();
</script>

<style>
  :root{ --blue:#1E3246; --bg:#f5f7fa; --card:#fff; --bd:#e6e8eb; }
  *{box-sizing:border-box}
  body{margin:0;font-family:system-ui,Segoe UI,Arial,sans-serif;background:var(--bg);color:#0f172a}
  .wrap{max-width:1200px;margin:0 auto;padding:20px}
  .h1{font-weight:700;color:var(--blue);font-size:20px;margin:8px 0 16px}
  .stepper{display:flex;gap:8px;margin:10px 0 18px;flex-wrap:wrap}
  .step{padding:8px 12px;border-radius:999px;border:1px solid var(--bd);background:var(--card)}
  .step.active{background:var(--blue);color:#fff;border-color:var(--blue)}
  .cards{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .card{background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:14px}
  label{display:block;margin:6px 0 4px;font-size:12px;color:#334155}
  input,select{width:100%;padding:10px;border:1px solid #cdd5df;border-radius:10px;background:#fff}
  .row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
  .btns{display:flex;gap:10px;margin-top:10px;flex-wrap:wrap}
  button{cursor:pointer;padding:10px 14px;border-radius:10px;border:1px solid #cdd5df;background:#fff}
  .primary{background:var(--blue);color:#fff;border-color:var(--blue)}
  .pages{display:grid;grid-template-columns:1fr;gap:16px}
  .page{background:#fff;border:1px solid var(--bd);border-radius:12px;padding:10mm}
  .page h2{margin:0 0 8px 0;color:var(--blue)}
  @media print{
    .stepper,.cards,.btns,.h1{display:none}
    .wrap{padding:0}
    .page{border:none;border-radius:0;page-break-after:always}
    @page{ size:A4 landscape; margin:10mm }
  }
</style>

<div class="wrap">
  <div class="h1">SQDC Board Generator (modern · A4 · offline)</div>

  <div class="stepper">
    <div class="step {step===1?'active':''}" on:click={()=>step=1}>1 Setup</div>
    <div class="step {step===2?'active':''}" on:click={()=>step=2}>2 Vorschau</div>
    <div class="step {step===3?'active':''}" on:click={()=>{step=2; setTimeout(()=>window.print(), 100);}}>3 Drucken</div>
  </div>

  {#if step===1}
  <div class="cards">
    <div class="card">
      <h3>Allgemein</h3>
      <div class="row">
        <div><label>Projekt</label><input bind:value={proj}></div>
        <div><label>Workstation</label><input bind:value={ws}></div>
        <div><label>ATL</label><input bind:value={atl}></div>
        <div><label>Monat</label><input type="month" bind:value={month}></div>
        <div><label>Rasterhöhe (mm)</label><input type="number" step="1" bind:value={gridH}></div>
        <div><label>Rasterbreite/Tag (mm)</label><input type="number" step="1" bind:value={gridW}></div>
        <div><label>Rand (mm)</label><input type="number" step="1" bind:value={margin}></div>
        <div><label>Delivery Modus</label>
          <select bind:value={dMode}><option>NUMERISCH</option><option>BINÄR</option></select>
        </div>
      </div>
    </div>
    <div class="card">
      <h3>KPI Parameter</h3>
      <div class="row">
        <div><label>Q Y-Max</label><input type="number" step="0.1" bind:value={yQ}></div>
        <div><label>Q Ziel</label><input type="number" step="0.1" bind:value={tQ}></div>
        <div><label>D Y-Max</label><input type="number" step="0.1" bind:value={yD}></div>
        <div><label>D Ziel</label><input type="number" step="0.1" bind:value={tD}></div>
        <div><label>C Y-Max</label><input type="number" step="0.1" bind:value={yC}></div>
        <div><label>C Ziel</label><input type="number" step="0.1" bind:value={tC}></div>
        <div><label>Welche Boards?</label>
          <select multiple size="4" on:change={(e)=> {
            const vals=[...e.target.selectedOptions].map(o=>o.value);
            show = {S:vals.includes('Safety'),Q:vals.includes('Quality'),D:vals.includes('Delivery'),C:vals.includes('Cost')};
          }}>
            <option selected>Safety</option><option selected>Quality</option>
            <option selected>Delivery</option><option selected>Cost</option>
          </select>
        </div>
      </div>
      <div class="btns">
        <button class="primary" on:click={()=>step=2}>Vorschau</button>
        <button on:click={saveCfg}>Konfig speichern</button>
        <button on:click={loadCfg}>Konfig laden</button>
      </div>
    </div>
  </div>
  {/if}

  {#if step===2}
  <div class="pages">
    {#if show.S}<div class="page"><h2>Safety</h2><div id="p-S"></div></div>{/if}
    {#if show.Q}<div class="page"><h2>Quality</h2><div id="p-Quality"></div></div>{/if}
    {#if show.D}<div class="page"><h2>Delivery</h2><div id="p-Delivery"></div></div>{/if}
    {#if show.C}<div class="page"><h2>Cost</h2><div id="p-Cost"></div></div>{/if}
  </div>
  <div class="btns">
    <button on:click={()=>step=1}>Zurück</button>
    <button class="primary" on:click={()=>{previewAll(); setTimeout(()=>window.print(),100)}}>Drucken / PDF</button>
  </div>
  {/if}
</div>
