<script>
  export let name = "safety";   // "safety" | "quality" | "delivery" | "cost"
  export let emoji = "🦺";
  export let size = 40;

  // Kandidaten in Priorität
  const candidates = [
    `/pictos/${name}.svg`,
    `/pictos/${name}.png`,
    `/pictos/${name}.jpg`
  ];
  let src = null;

  async function resolve(){
    for (const url of candidates){
      try {
        const res = await fetch(url, { method:"HEAD" });
        if (res.ok) { src = url; return; }
      } catch {}
    }
    src = null;
  }
  resolve();
</script>

{#if src}
  <img alt={name} src={src} style="width:{size}px;height:{size}px" class="object-contain select-none"/>
{:else}
  <span class="select-none" style="font-size:{size*0.8}px;line-height:1">{emoji}</span>
{/if}
