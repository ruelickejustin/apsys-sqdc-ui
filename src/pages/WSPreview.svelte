<script>
  import { meta } from "../lib/state";
  import PreviewCard from "../components/PreviewCard.svelte";
</script>

<main class="max-w-6xl mx-auto p-6 space-y-4">
  <header class="flex flex-wrap items-end gap-3">
    <h1 class="text-2xl font-semibold">Workstation – Vorschau</h1>
    <div class="text-sm opacity-70">
      {$meta.project || "Projekt …"} · {$meta.workstation || "WS …"} · ATL: {$meta.atl || "…"} · {$meta.month || "Monat …"}
    </div>
  </header>

  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
    <PreviewCard title="Safety"   icon="🦺" href="#/kpi/s" gradient="from-green-400 to-emerald-600"/>
    <PreviewCard title="Quality"  icon="✅" href="#/kpi/q" gradient="from-sky-400 to-blue-600"/>
    <PreviewCard title="Delivery" icon="🚚" href="#/kpi/d" gradient="from-indigo-400 to-violet-600"/>
    <PreviewCard title="Cost"     icon="💶" href="#/kpi/c" gradient="from-amber-400 to-orange-600"/>
  </section>
</main>
