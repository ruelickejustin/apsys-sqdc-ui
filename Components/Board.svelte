<script>
  export let title, project, ws, atl, month, days, type;
  export let yMax = 0, target = 0;
  export let numeric = false;
  export let deliveryMode = "binary";

  function pct(val, max) {
    if (!max || max <= 0) return 0;
    return Math.max(0, Math.min(100, (val / max) * 100));
  }

  const monthLabel = (m) =>
    new Date(m + "-01").toLocaleDateString("de-DE", { month: "long", year: "numeric" });

  $: isNumeric =
      numeric ||
      type === "Q" || type === "C" ||
      (type === "D" && deliveryMode === "numeric");

  $: targetPos = isNumeric ? pct(target, yMax) : 0;
</script>

<div class="board">
  <div class="head">
    <div class="left">
      <h2>{title}</h2>
      <div class="sub">{project || "Projekt"} · {ws || "WS"} · {atl || "ATL"}</div>
    </div>
    <div class="right">{monthLabel(month)}</div>
  </div>

  <div class="canvas">
    {#if isNumeric}
      <div class="target-line" style="bottom:{targetPos}%"></div>
      <div class="ymax">Y-Max: {yMax}</div>
      <div class="target-label">Ziel: {target}</div>
    {/if}

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
