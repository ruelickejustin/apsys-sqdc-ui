<script>
  import K_S from "./KPI_S.svelte";
  import K_Q from "./KPI_Q.svelte";
  import K_D from "./KPI_D.svelte";
  import K_C from "./KPI_C.svelte";
  export let ws = "WS??";
  export let type = "s"; // s,q,d,c
  const map = { s: K_S, q: K_Q, d: K_D, c: K_C };
  const Comp = map[type] || K_S;
</script>

<svelte:component this={Comp} ws={ws}/>
