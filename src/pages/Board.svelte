<script>
  import { route } from "../lib/router";
  import { meta, ws, pickWs } from "../lib/state";
  import TileSlot from "../components/TileSlot.svelte";

  let r; route.subscribe(v=>r=v);
  $: seg = r.split("/").filter(Boolean); // ["board", ":ws"]
  $: wsId = seg[1] || $ws.id || "WS??";
  $: ($ws.id!==wsId) && pickWs($meta.epu, wsId);

  const k = (letter)=> `#/kpi/${wsId}/${letter}`;
  const s = (slug)=>   `#/section/${wsId}/${slug}`;
</script>

<main class="max-w-[1400px] mx-auto p-4 space-y-3">
  <h1 class="text-2xl font-semibold">autonomes Teamboard — {$ws.name}
    <span class="text-sm opacity-60"> • Team: {$meta.epu} • ATL: {$ws.teamlead}</span>
  </h1>

  <div class="grid grid-cols-[360px_1fr_460px] gap-3">
    <div class="rounded-lg px-3 py-2 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900 text-lg font-semibold">Organisation</div>
    <div class="rounded-lg px-3 py-2 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900 text-lg font-semibold">Leistung</div>
    <div class="rounded-lg px-3 py-2 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-900 text-lg font-semibold">Qualität</div>
  </div>

  <div class="grid grid-cols-[360px_1fr_460px] gap-3">
    <!-- Organisation -->
    <div class="space-y-3">
      <TileSlot title="Agenda"               picto="agenda.svg"       href={s("agenda")} />
      <TileSlot title="Team"                 picto="team.svg"         href={s("team")} />
      <TileSlot title="wechselnde Aufgaben"  picto="tasks.svg"        href={s("tasks")} />
      <TileSlot title="5S-Bereiche"          picto="5s.svg"           href={s("5s-areas")} />
    </div>

    <!-- Leistung -->
    <div class="grid grid-cols-3 gap-3">
      <TileSlot title="EHS (S)"                 picto="ehs.svg"         href={k("s")} />
      <TileSlot title="5S-Grid"                 picto="5s-grid.svg"     href={s("5s-grid")} />
      <TileSlot title="Information"             picto="info.svg"        href={s("info")} />
      <TileSlot title="Workstation Auswertung"  picto="chart.svg"       href={s("ws-eval")} />
      <TileSlot title="Task Sequence"           picto="task-seq.svg"    href={s("task-seq")} />
      <TileSlot title="Fehlteileauswertung"     picto="shortage.svg"    href={s("missing-parts")} />
      <TileSlot title="Qualität (Q)"            picto="kpi.svg"         href={k("q")} />
      <TileSlot title="Agenda (D)"              picto="kpi.svg"         href={k("d")} />
      <TileSlot title="Agenda (C)"              picto="kpi.svg"         href={k("c")} />
      <TileSlot title="Fehlteile"               picto="box.svg"         href={s("shortage")} />
    </div>

    <!-- Qualität -->
    <div class="grid grid-cols-2 gap-3">
      <TileSlot title="Q-Alarm"                   picto="q-alarm.svg"    href={s("q-alarm")} />
      <TileSlot title="Abnahmeergebnisse"         picto="accept.svg"     href={s("acceptance")} />
      <TileSlot title="WSI KPI"                   picto="kpi.svg"        href={s("wsi-kpi")} />
      <TileSlot title="Gesamtfehler Workstation"  picto="defects.svg"    href={s("total-defects")} />
      <TileSlot title="TOP 3 Fehler"              picto="top3.svg"       href={s("top3")} />
      <TileSlot title="Mini QRQC"                 picto="qrqc.svg"       href={s("mini-qrqc")} />
      <TileSlot title="Workstation Audit"         picto="audit.svg"      href={s("audit")} />
      <TileSlot title="Fahrzeugordner"            picto="folder.svg"     href={s("vehicle-folder")} />
    </div>
  </div>
</main>
