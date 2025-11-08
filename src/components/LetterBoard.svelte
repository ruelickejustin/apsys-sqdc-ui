<script>
  import { onMount } from "svelte";
  import { goto } from "../lib/router";

  export let title = "Safety";
  export let icon  = "🦺";
  export let grad  = "from-green-400 to-emerald-600";
  export let link  = "/kpi/s";
  export let note  = "Vorlage zum Ausfüllen & Drucken";

  let stats = { open: 0, risk: 0, done: 0 };
  onMount(() => { stats = { open: 1, risk: 0, done: 0 }; });

  const satisfy = v => v ?? 0;
  const openKPI = () => goto(link);
</script>

<article class="rounded-2xl overflow-hidden shadow ring-1 ring-black/5 dark:ring-white/10 hover:-translate-y-0.5 transition">
  <div class={"p-5 text-white bg-gradient-to-br "+grad}>
    <div class="text-3xl">{icon}</div>
    <div class="mt-3 text-2xl font-semibold">{title}</div>
  </div>

  <div class="p-4 bg-white dark:bg-neutral-900">
    <p class="text-sm text-black/60 dark:text-white/60">{note}</p>

    <div class="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
      <div class="rounded-lg border border-black/10 dark:border-white/10 p-2">Open<br><b>{satisfy(stats.open)}</b></div>
      <div class="rounded-lg border border-black/10 dark:border-white/10 p-2">Risk<br><b>{satisfy(stats.risk)}</b></div>
      <div class="rounded-lg border border-black/10 dark:border-white/10 p-2">Done<br><b>{satisfy(stats.done)}</b></div>
    </div>

    <div class="mt-3 flex gap-2">
      <button type="button"
        class="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-sm"
        on:click={openKPI}>
        Öffnen
      </button>
      <a class="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-sm" href="#/print">
        Drucken
      </a>
    </div>
  </div>
</article>
