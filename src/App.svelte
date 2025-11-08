<script>
  import Topbar from "./components/Topbar.svelte";
  import { route } from "./lib/router";
  import Login from "./pages/Login.svelte";
  import Workstations from "./pages/Workstations.svelte";
  import Board from "./pages/Board.svelte";
  import SectionRouter from "./pages/SectionRouter.svelte";
  import KPI_S from "./pages/KPI_S.svelte";
  import KPI_Q from "./pages/KPI_Q.svelte";
  import KPI_D from "./pages/KPI_D.svelte";
  import KPI_C from "./pages/KPI_C.svelte";

  $: r = $route; $: seg = r.split("/").filter(Boolean);
  function view(){
    if(seg[0]==="workstations") return Workstations;
    if(seg[0]==="board")        return Board;
    if(seg[0]==="section")      return SectionRouter;
    if(seg[0]==="kpi"){ const L=(seg[2]||"").toLowerCase(); if(L==="s")return KPI_S; if(L==="q")return KPI_Q; if(L==="d")return KPI_D; if(L==="c")return KPI_C; }
    return Login;
  }
</script>

<Topbar/>
<svelte:component this={view()} />
