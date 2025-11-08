<script>
  import PrintBase from "./PrintBase.svelte";
  import MonthSheet from "../components/MonthSheet.svelte";
  export let ws="WS??";
</script>
<PrintBase title={"Safety – "+ws} gradient="from-emerald-400 to-green-700" subtitle="Unfälle / Abweichungen – Zielkurve als Referenz">
  <MonthSheet label="S: Unfälle / Sicherheitsabweichungen (täglich/weekly)" help="Wöchentlich: No. of Accidents / Täglich: Abweichungen markieren" />
</PrintBase>
