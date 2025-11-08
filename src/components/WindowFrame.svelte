<script> export let title = "SQDC UI"; </script>
<div class="min-h-screen">
  <div class="sticky top-0 z-20 h-10 flex items-center gap-2 px-3 border-b
              bg-white/90 dark:bg-neutral-900/90 backdrop-blur
              border-black/10 dark:border-white/10 select-none">
    <div class="flex gap-2 mr-2">
      <span class="inline-block w-3 h-3 rounded-full bg-red-500"></span>
      <span class="inline-block w-3 h-3 rounded-full bg-amber-400"></span>
      <span class="inline-block w-3 h-3 rounded-full bg-emerald-500"></span>
    </div>
    <div class="font-medium text-sm">{title}</div>
    <div class="ml-auto text-xs opacity-60">Vorschau der späteren EXE</div>
  </div>
  <slot/>
</div>
