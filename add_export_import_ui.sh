#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="${HOME}/apsys-sqdc-ui"
BRANCH_NAME="feat/export-import-ui"

log(){ printf "\n[%s] %s\n" "$(date +%H:%M:%S)" "$*"; }

ensure_repo(){
  if [ ! -d "$REPO_DIR/.git" ]; then
    printf "Repo nicht gefunden: %s\nBitte vorher klonen/aufsetzen.\n" "$REPO_DIR"
    exit 1
  fi
  cd "$REPO_DIR"
  git checkout -B "$BRANCH_NAME"
}

write_download_util(){
  mkdir -p src/lib
  cat > src/lib/download.ts << 'TS'
/** Warum: Download ohne externe Lib, kompatibel im Browser */
export function downloadText(filename: string, text: string): void {
  const blob = new Blob([text], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
TS
}

write_bar_component(){
  mkdir -p src/components
  cat > src/components/ExportImportBar.svelte << 'SVELTE'
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
SVELTE
}

patch_app_svelte(){
  if [ ! -f src/App.svelte ]; then
    log "WARN: src/App.svelte nicht gefunden; Patch übersprungen."
    return
  fi
  if grep -q 'ExportImportBar' src/App.svelte; then
    log "App.svelte bereits gepatcht."
    return
  fi

  # Import einfügen in bestehenden <script>-Block, sonst Script-Block davor setzen
  if grep -q "<script" src/App.svelte; then
    awk '
      BEGIN{done=0}
      /<script[^>]*>/ && done==0 { print; print "  import ExportImportBar from \"./components/ExportImportBar.svelte\";"; done=1; next }
      { print }
    ' src/App.svelte > src/App.svelte.__tmp && mv src/App.svelte.__tmp src/App.svelte
  else
    ( printf "<script>\n  import ExportImportBar from \"./components/ExportImportBar.svelte\";\n</script>\n"; cat src/App.svelte ) > src/App.svelte.__tmp && mv src/App.svelte.__tmp src/App.svelte
  fi

  # Komponente nach erstem <main> einfügen, sonst direkt nach </script>
  if grep -q "<main" src/App.svelte; then
    awk '
      BEGIN{done=0}
      /<main[^>]*>/ && done==0 { print; print "  <ExportImportBar />"; done=1; next }
      { print }
    ' src/App.svelte > src/App.svelte.__tmp && mv src/App.svelte.__tmp src/App.svelte
  else
    awk '
      BEGIN{ins=0}
      { if(!ins && /<\/script>/){ print; print "<ExportImportBar />"; ins=1; next } print }
      END{ if(!ins) print "<ExportImportBar />" }
    ' src/App.svelte > src/App.svelte.__tmp && mv src/App.svelte.__tmp src/App.svelte
  fi
}

a11y_fix_workstations(){
  local f="src/pages/Workstations.svelte"
  [ -f "$f" ] || return 0

  # Wenn bereits role/tabindex vorhanden → überspringen
  if rg -n 'role="button"|tabindex="0"|on:keydown' "$f" >/dev/null 2>&1; then
    log "A11y: Workstations.svelte scheint bereits ok."
    return 0
  fi

  log "A11y: füge role, tabindex und keydown-Handler hinzu."
  # Attribute nach on:click einfügen
  # 1) role + tabindex
  sed -i 's/on:click=\(\([^>]*\)\)>/on:click=\1 role="button" tabindex="0">/g' "$f"

  # 2) keydown-Handler hinzufügen (Enter/Space → open(w))
  # Füge nach on:click denselben Handler für keydown ein, falls noch nicht vorhanden
  # Einfacher: direkt hinter on:click einfügen, wenn on:keydown nicht existiert.
  if ! grep -q 'on:keydown' "$f"; then
    sed -i 's/on:click=\([^ ]*\)/on:click=\1 on:keydown={(e)=>{if(e.key==="Enter"||e.key===" "){\1;}}}/' "$f"
  fi
}

ensure_print_css_link(){
  if [ -f index.html ] && ! rg -q 'src/print\.css' index.html 2>/dev/null; then
    log "Verlinke print.css in index.html (media=print)."
    awk '
      /<\/head>/ && !done { print "  <link rel=\"stylesheet\" href=\"/src/print.css\" media=\"print\">"; done=1 }
      { print }
    ' index.html > index.html.__tmp && mv index.html.__tmp index.html
  fi
}

build_and_hint(){
  if [ -f package-lock.json ]; then npm ci; else npm i; fi
  npm run build
  printf "\nNÄCHSTE SCHRITTE:\n"
  printf "  npm run dev  # UI testen; Export/Import oben als Leiste\n"
  printf "  git add -A && git commit -m 'feat: Export/Import UI + a11y fix'\n"
  printf "  git push -u origin %s\n" "$BRANCH_NAME"
}

main(){
  ensure_repo
  write_download_util
  write_bar_component
  patch_app_svelte
  a11y_fix_workstations
  ensure_print_css_link
  build_and_hint
}
main "$@"
