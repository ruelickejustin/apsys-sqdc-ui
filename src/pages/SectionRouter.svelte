<script>
  import { route } from "../lib/router";
  import { ws, pickWs, meta } from "../lib/state";
  import { sections } from "../lib/sections";
  import Section from "./Section_Generic.svelte";

  let r; route.subscribe(v=>r=v);
  $: seg = r.split("/").filter(Boolean); // ["section", ":ws", ":slug"]
  $: wsId = seg[1], slug = seg[2];
  $: ($ws.id!==wsId) && pickWs($meta.epu, wsId);

  const cfg = sections[slug] ?? { title: slug, type:"canvas" };
</script>

<Section {...cfg}/>
