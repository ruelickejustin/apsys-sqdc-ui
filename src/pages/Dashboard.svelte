<script> import Tile from "../components/Tile.svelte"; </script>
<main class="max-w-6xl mx-auto p-6">
  <h1 class="text-2xl font-semibold mb-4">Kacheln</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <Tile title="Safety"   icon="🦺" href="#/kpi/s" gradient="from-green-400 to-emerald-600" hint="A4-Vorlage (Handeintrag)"/>
    <Tile title="Quality"  icon="✅" href="#/kpi/q" gradient="from-sky-400 to-blue-600"     hint="A4-Vorlage (Handeintrag)"/>
    <Tile title="Delivery" icon="🚚" href="#/kpi/d" gradient="from-indigo-400 to-violet-600" hint="A4-Vorlage (Handeintrag)"/>
    <Tile title="Cost"     icon="💶" href="#/kpi/c" gradient="from-amber-400 to-orange-600"  hint="A4-Vorlage (Handeintrag)"/>
  </div>
</main>
