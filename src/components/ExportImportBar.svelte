<script lang="ts">
  import { exportJson, importJson } from "../lib/storage";
  import { downloadText } from "../lib/download";

  let fileInput: HTMLInputElement | null = null;
  let busy = false;
  let message: string | null = null;

  async function onExport() {
    try {
      busy = true;
      const json = exportJson();
      const name = `sqdc-config-${new Date().toISOString().slice(0,10)}.json`;
      downloadText(name, json);
      message = "Export abgeschlossen.";
    } catch (e) {
      message = "Export fehlgeschlagen.";
      console.error(e);
    } finally {
      busy = false;
      setTimeout(() => (message = null), 2000);
    }
  }

  function onPickFile() {
    fileInput?.click();
  }

  async function onImportChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      busy = true;
      const text = await file.text();
      importJson(text);
      message = "Import erfolgreich. Daten geladen.";
      // Falls State nicht reaktiv aktualisiert: harter Reload
      location.reload();
    } catch (err) {
      console.error(err);
      message = "Import fehlgeschlagen. Ungültiges JSON?";
    } finally {
      busy = false;
      if (input) input.value = "";
      setTimeout(() => (message = null), 2500);
    }
  }
</script>

<!-- no-print, damit Buttons nicht mitgedruckt werden -->
<div class="no-print fixed left-0 right-0 top-0 z-50">
  <div class="mx-auto max-w-screen-xl px-3 pt-2">
    <div class="rounded-2xl border shadow p-2 bg-white/90 backdrop-blur">
      <div class="flex flex-wrap items-center gap-2">
        <button
          class="rounded-xl px-3 py-2 border shadow-sm hover:shadow disabled:opacity-50"
          on:click={onExport}
          disabled={busy}
        >Export JSON</button>

        <button
          class="rounded-xl px-3 py-2 border shadow-sm hover:shadow disabled:opacity-50"
          on:click={onPickFile}
          disabled={busy}
        >Import JSON</button>

        <input
          bind:this={fileInput}
          class="hidden"
          type="file"
          accept="application/json"
          on:change={onImportChange}
        />

        {#if message}
          <div class="ml-auto text-sm opacity-80">{message}</div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  /* Platz für die fixe Leiste */
  :global(body) { padding-top: 68px; }
</style>
