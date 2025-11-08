<script>
  import PrintBase from "./PrintBase.svelte";
  import MonthSheet from "../components/MonthSheet.svelte";
  export let ws="WS??";
</script>
<PrintBase title={"Quality – "+ws} gradient="from-sky-400 to-blue-600" subtitle="FPY / Qualitäts-Alarm / Abnahme-Ergebnisse">
  <MonthSheet label="Q: Right First Time / Abnahmen" help="Ziel-FPY als fette Linie, Tages-/Wochenwerte per Hand" />
</PrintBase>
