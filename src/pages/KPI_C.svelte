<script>
  import PrintBase from "./PrintBase.svelte";
  import MonthSheet from "../components/MonthSheet.svelte";
  export let ws="WS??";
</script>
<PrintBase title={"Cost – "+ws} gradient="from-amber-400 to-orange-600" subtitle="Plan vs. Ist-Aufwand / Zeitbudget">
  <MonthSheet label="C: Plan vs. Ist" help="Zielbudget als Linie. Abweichungen per Hand markieren." />
</PrintBase>
